from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List
from models import Campaign, Donations, Users, Notification
from database import get_db
from schemas import Campaign as CampaignSchema, showcampaigns, updatecampaigns, CampaignResponse, DonationResponse, userdonated, Campaignuser


router = APIRouter(
    tags=['Campaigns']
)


# Campaign Endpoints
@router.post("/campaigns/", response_model=CampaignResponse)
def create_campaign(campaign: CampaignSchema, db: Session = Depends(get_db)):
    latest_campaign = db.query(Campaign).order_by(Campaign.camp_id.desc()).first()
    new_camp_id = (latest_campaign.camp_id + 1) if latest_campaign else 1

    db_campaign = Campaign(
        camp_id=new_camp_id,
        title=campaign.title,
        cause=campaign.cause,
        target_amount=campaign.target_amount,
        raised_amount=0,
        start_date=campaign.start_date,
        end_date=campaign.end_date,
        creator_id=campaign.creator_id
    )
    db.add(db_campaign)
    db.commit()
    db.refresh(db_campaign)

    # Notify all users about the new campaign
    users = db.query(Users).all()
    for user in users:
        db_notification = Notification(
            user_id=user.user_id,
            type="New Campaign",
            message=f"A new campaign '{db_campaign.title}' has been created.",
            is_read=False
        )
        db.add(db_notification)
    db.commit()

    return {"id": new_camp_id}
 # Return the created campaign object


@router.get("/campaigns/{campaign_id}", response_model=CampaignSchema)
def get_campaign(campaign_id: int, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.camp_id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign


@router.get("/campaigns/", response_model=List[showcampaigns])
def get_all_campaigns(db: Session = Depends(get_db)):
    return db.query(Campaign).all()


@router.put("/campaigns/{campaign_id}", response_model=updatecampaigns)
def update_campaign(campaign_id: int, updated_campaign: updatecampaigns, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.camp_id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    for key, value in updated_campaign.dict(exclude_unset=True).items():
        setattr(campaign, key, value)
    
    db.commit()
    db.refresh(campaign)

    # Notify all users about the updated campaign
    users = db.query(Users).all()
    for user in users:
        db_notification = Notification(
            user_id=user.user_id,
            type="Updated Campaign",
            message=f"The campaign '{campaign.title}' has been updated.",
            is_read=False
        )
        db.add(db_notification)
    db.commit()

    return campaign


@router.delete("/campaigns/{campaign_id}")
def delete_campaign(campaign_id: int, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.camp_id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    db.delete(campaign)
    db.commit()
    return {"detail": "Campaign deleted successfully"}




@router.get("/campaigns/creator/{creator_id}", response_model=List[Campaignuser])
def get_campaigns_by_creator(creator_id: int, db: Session = Depends(get_db)):
    campaigns = db.query(Campaign).filter(Campaign.creator_id == creator_id).all()
    if not campaigns:
        raise HTTPException(status_code=404, detail="No campaigns found for the specified creator")
    return campaigns

@router.get("/donations/creator/{user_id}", response_model=List[DonationResponse])
def get_user_donations(user_id: int, db: Session = Depends(get_db)):
    donations = (
        db.query(Donations)
        .filter(Donations.user_id == user_id)
        .options(joinedload(Donations.campaign))  # Eager load campaign details
        .all()
    )
    if not donations:
        raise HTTPException(status_code=404, detail="No donations found for the specified user")
    return donations

@router.get("/campaigns/{campaign_id}/donors", response_model=List[userdonated])
def get_donors_by_campaign(campaign_id: int, db: Session = Depends(get_db)):
    donations = (
        db.query(Donations)
        .options(joinedload(Donations.user))  # Ensure related user info is loaded
        .filter(Donations.campaign_id == campaign_id)
        .all()
    )
    if not donations:
        raise HTTPException(status_code=404, detail="No donations found for the specified campaign")

    donor_data = []
    for donation in donations:
        user = db.query(Users).filter(Users.user_id == donation.user_id).first()
        
        if user:
            donor_data.append({
                "user_id": user.user_id,
                "name": user.name,
                "email": user.email,
                "contact": user.contact,
                "donation_amount": donation.amount,
            })
    
    return donor_data