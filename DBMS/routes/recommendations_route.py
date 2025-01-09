# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from typing import List
# import schemas
# import models
# from database import get_db
# from utils import calculate_similarity

# router = APIRouter(
#     tags=['Recommendation']
# )

# @router.get("/recommendations/{user_id}", response_model=List[schemas.showcampaigns])
# async def get_recommendations(user_id: int, db: Session = Depends(get_db)):
#     # Fetch all campaigns
#     campaigns = db.query(models.Campaign).all()
    
#     # Calculate similarity between campaigns
#     cosine_sim = calculate_similarity(campaigns)
    
#     # Fetch user's past donations
#     user_donations = db.query(models.Donations).filter(models.Donations.user_id == user_id).all()
    
#     if not user_donations:
#         raise HTTPException(status_code=404, detail="No donations found for the given user ID")
    
#     # Get campaign IDs from user's past donations
#     donated_campaign_ids = [donation.campaign_id for donation in user_donations]
    
#     # Get indices of donated campaigns
#     donated_indices = [i for i, campaign in enumerate(campaigns) if campaign.camp_id in donated_campaign_ids]
    
#     # Calculate average similarity scores for all campaigns
#     sim_scores = cosine_sim[donated_indices].mean(axis=0)
    
#     # Get indices of top recommended campaigns
#     recommended_indices = sim_scores.argsort()[-5:][::-1]  # Top 5 recommendations
    
#     # Fetch recommended campaigns
#     recommended_campaigns = [campaigns[i] for i in recommended_indices if campaigns[i].camp_id not in donated_campaign_ids]
    
#     # Convert to Pydantic schema
#     return [schemas.showcampaigns.from_orm(campaign) for campaign in recommended_campaigns]


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import schemas
import models
from database import get_db
from utils import calculate_similarity

router = APIRouter(
    tags=['Recommendation']
)

@router.get("/recommendations/{user_id}", response_model=List[schemas.showcampaigns])
async def get_recommendations(user_id: int, db: Session = Depends(get_db)):
    # Fetch all campaigns
    campaigns = db.query(models.Campaign).all()
    
    # Calculate similarity between campaigns
    cosine_sim = calculate_similarity(campaigns)
    
    # Fetch user's past donations
    user_donations = db.query(models.Donations).filter(models.Donations.user_id == user_id).all()
    
    if not user_donations:
        raise HTTPException(status_code=404, detail="No donations found for the given user ID")
    
    # Get campaign IDs from user's past donations
    donated_campaign_ids = [donation.campaign_id for donation in user_donations]
    
    # Get indices of donated campaigns
    donated_indices = [i for i, campaign in enumerate(campaigns) if campaign.camp_id in donated_campaign_ids]
    
    # Calculate average similarity scores for all campaigns
    sim_scores = cosine_sim[donated_indices].mean(axis=0)
    
    # Get indices of top recommended campaigns
    recommended_indices = sim_scores.argsort()[-5:][::-1]  # Top 5 recommendations
    
    # Fetch recommended campaigns
    recommended_campaigns = [campaigns[i] for i in recommended_indices if campaigns[i].camp_id not in donated_campaign_ids]
    
    # Sort recommended campaigns by raised_amount in ascending order
    recommended_campaigns.sort(key=lambda x: x.raised_amount)
    
    # Convert to Pydantic schema
    return [schemas.showcampaigns.from_orm(campaign) for campaign in recommended_campaigns]