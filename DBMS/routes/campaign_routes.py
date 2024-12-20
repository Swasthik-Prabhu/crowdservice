from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models import Campaign
from database import get_db
from schemas import Campaign as CampaignSchema

router = APIRouter(
    tags=['Campaigns']
)


# Campaign Endpoints
@router.post("/campaigns/", response_model=CampaignSchema)
def create_campaign(campaign: CampaignSchema, db: Session = Depends(get_db)):
    # Fetch the latest campaign by ID
    latest_campaign = db.query(Campaign).order_by(Campaign.camp_id.desc()).first()

    # Determine the new campaign ID
    new_camp_id = (latest_campaign.camp_id + 1) if latest_campaign else 1

    # Create a new campaign
    db_campaign = Campaign(
        camp_id=new_camp_id,  # Automatically assign the new ID
        title=campaign.title,
        cause=campaign.cause,
        target_amount=campaign.target_amount,
        raised_amount=0,  # Default to 0 for newly created campaigns
        start_date=campaign.start_date,
        end_date=campaign.end_date,
        creator_id=campaign.creator_id  # Link to the Users table
    )
    db.add(db_campaign)
    db.commit()
    db.refresh(db_campaign)
    return db_campaign


@router.get("/campaigns/{campaign_id}", response_model=CampaignSchema)
def get_campaign(campaign_id: int, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.camp_id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign


@router.get("/campaigns/", response_model=List[CampaignSchema])
def get_all_campaigns(db: Session = Depends(get_db)):
    return db.query(Campaign).all()


@router.put("/campaigns/{campaign_id}", response_model=CampaignSchema)
def update_campaign(campaign_id: int, updated_campaign: CampaignSchema, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.camp_id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    for key, value in updated_campaign.dict(exclude_unset=True).items():
        setattr(campaign, key, value)
    
    db.commit()
    db.refresh(campaign)
    return campaign


@router.delete("/campaigns/{campaign_id}")
def delete_campaign(campaign_id: int, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.camp_id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    db.delete(campaign)
    db.commit()
    return {"detail": "Campaign deleted successfully"}
