from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models import Campaign
from database import get_db
from schemas import Campaign as CampaignSchema, showcampaigns, updatecampaigns, CampaignResponse

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
    return {"id" : new_camp_id}
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
    return campaign


@router.delete("/campaigns/{campaign_id}")
def delete_campaign(campaign_id: int, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.camp_id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    db.delete(campaign)
    db.commit()
    return {"detail": "Campaign deleted successfully"}
