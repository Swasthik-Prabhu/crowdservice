from fastapi import APIRouter, Depends, status, Response, HTTPException

import models
from database import engine, get_db
from sqlalchemy.orm import Session, sessionmaker
from typing import List
from schemas import  Beneficiaries as BeneficiariesSchema
from models import Base, Beneficiaries





models.Base.metadata.create_all(bind=engine)


router = APIRouter(
    # prefix="",
    tags=['Beneficiaries']
)


# Beneficiary Endpoints
@router.post("/createbeneficiaries/", response_model=BeneficiariesSchema)
def create_beneficiary(beneficiary: BeneficiariesSchema, db: Session = Depends(get_db)):
    # Fetch the latest beneficiary ID to determine the new one
    latest_beneficiary = db.query(models.Beneficiaries).order_by(models.Beneficiaries.beneficiary_id.desc()).first()

    # Determine the new beneficiary ID
    new_beneficiary_id = (latest_beneficiary.beneficiary_id + 1) if latest_beneficiary else 1

    # Create a new beneficiary object to be added to the database
    db_beneficiary = models.Beneficiaries( 
        beneficiary_id=new_beneficiary_id,
        name=beneficiary.name,
        contact=beneficiary.contact,
        address=beneficiary.address,
        campaign_id=beneficiary.campaign_id
    )
    
    # Add the new beneficiary to the session
    db.add(db_beneficiary)
    db.commit()
    db.refresh(db_beneficiary)

    # Return the newly created beneficiary using the Pydantic schema
    return db_beneficiary

@router.get("/beneficiaries/{beneficiary_id}/", response_model=BeneficiariesSchema)
def get_beneficiary(beneficiary_id: int, db: Session = Depends(get_db)):
    beneficiary = db.query(Beneficiaries).filter(Beneficiaries.beneficiary_id == beneficiary_id).first()
    if not beneficiary:
        raise HTTPException(status_code=404, detail="Beneficiary not found")
    return beneficiary

@router.put("/beneficiaries/{beneficiary_id}", response_model=BeneficiariesSchema)
def update_beneficiary(beneficiary_id: int, updated_beneficiary: BeneficiariesSchema, db: Session = Depends(get_db)):
    beneficiary = db.query(Beneficiaries).filter(Beneficiaries.beneficiary_id == beneficiary_id).first()
    if not beneficiary:
        raise HTTPException(status_code=404, detail="Beneficiary not found")

    for key, value in updated_beneficiary.dict(exclude_unset=True).items():
        setattr(beneficiary, key, value)
    
    db.commit()
    db.refresh(beneficiary)
    return beneficiary



@router.delete("/beneficiaries/{beneficiary_id}")
def delete_beneficiary(beneficiary_id: int, db: Session = Depends(get_db)):
    beneficiary = db.query(Beneficiaries).filter(Beneficiaries.beneficiary_id == beneficiary_id).first()
    if not beneficiary:
        raise HTTPException(status_code=404, detail="Beneficiary not found")
    db.delete(beneficiary)
    db.commit()
    return {"detail": "Beneficiary deleted successfully"}


@router.get("/beneficiaries")
async def get_all(db: Session = Depends(get_db)):
    beneficiaries = db.query(Beneficiaries).all()  # SQLAlchemy ORM objects
    return beneficiaries  # ORM objects are not directly serializable
