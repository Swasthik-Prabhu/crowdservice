from fastapi import APIRouter, Depends, status, Response, HTTPException

import models
from database import engine, get_db
from sqlalchemy.orm import Session, sessionmaker
from typing import List
from schemas import Donations as DonationsSchema, Users, donationuser,Campaign
from models import Base, Donations, Users, Notification, Campaign


models.Base.metadata.create_all(bind=engine)


router = APIRouter(
    # prefix="",
    tags=['Donations']
)


# Donations Endpoints
@router.post("/donations/", response_model=DonationsSchema)
def create_donation(donation: DonationsSchema, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = db.query(Users).filter(Users.user_id == donation.user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db_donation = Donations(
        amount=donation.amount,
        donation_date=donation.donation_date,
        transaction_id=donation.transaction_id,
        campaign_id=donation.campaign_id,
        user_id=donation.user_id
    )
    db.add(db_donation)
    db.commit()
    db.refresh(db_donation)

    # Notify the campaign creator about the donation
    campaign = db.query(Campaign).filter(Campaign.camp_id == donation.campaign_id).first()
    if campaign:
        db_notification = Notification(
            user_id=campaign.creator_id,
            type="New Donation",
            message=f"Your campaign '{campaign.title}' received a donation of {donation.amount}.",
            is_read=False
        )
        db.add(db_notification)
        db.commit()

    return db_donation


@router.get("/donations/{donation_id}/", response_model=DonationsSchema)
def get_donation(donation_id: int, db: Session = Depends(get_db)):
    donation = db.query(Donations).filter(Donations.donation_id == donation_id).first()
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    return donation

@router.get('/donations',response_model=List[DonationsSchema])
def get_all_donations(db: Session = Depends(get_db)):
    return db.query(Donations).all()

@router.put("/donations/{donation_id}", response_model=DonationsSchema)
def update_donation(donation_id: int, updated_donation: DonationsSchema, db: Session = Depends(get_db)):
    donation = db.query(Donations).filter(Donations.donation_id == donation_id).first()
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")

    for key, value in updated_donation.dict(exclude_unset=True).items():
        setattr(donation, key, value)
    
    db.commit()
    db.refresh(donation)
    return donation




@router.delete("/donations/{donation_id}")
def delete_donation(donation_id: int, db: Session = Depends(get_db)):
    donation = db.query(Donations).filter(Donations.donation_id == donation_id).first()
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    db.delete(donation)
    db.commit()
    return {"detail": "Donation deleted successfully"}


@router.get("/donations/creator/{creator_id}", response_model=List[donationuser])
def get_donations_by_creator(creator_id: int, db: Session = Depends(get_db)):
    donations = db.query(Donations).filter(Donations.user_id == creator_id).all()
    if not donations:
        raise HTTPException(status_code=404, detail="No donations found for the specified creator")
    return donations


