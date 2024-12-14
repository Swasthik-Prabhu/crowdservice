from fastapi import APIRouter, Depends, status, Response, HTTPException

import models
from database import engine, get_db
from sqlalchemy.orm import Session, sessionmaker
from typing import List
from schemas import Donations as DonationsSchema, Users
from models import Base, Donations, Users


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



