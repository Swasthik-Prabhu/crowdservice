from fastapi import APIRouter, Depends, status, Response, HTTPException

import models
from database import engine, get_db
from sqlalchemy.orm import Session, sessionmaker
from typing import List
from schemas import Campaign as CampaignSchema
from models import Base, Campaign


models.Base.metadata.create_all(bind=engine)


router = APIRouter(
    # prefix="",
    tags=['Campaigns']
)



# Campaign Endpoints
@router.post("/campaigns/", response_model=CampaignSchema)
def create_campaign(campaign: CampaignSchema, db: Session = Depends(get_db)):
    db_campaign = Campaign(
        title=campaign.title,
        cause=campaign.cause,
        target_amount=campaign.target_amount,
        raised_amount=campaign.raised_amount,
        start_date=campaign.start_date,
        end_date=campaign.end_date,
        creator_id=campaign.creator_id  # This links to the Users table
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
