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
@router.post("/beneficiaries/", response_model=BeneficiariesSchema)
def create_beneficiary(beneficiary: BeneficiariesSchema, db: Session = Depends(get_db)):

    Latest_beneficiary = db.query(Beneficiaries).order_by(Beneficiaries.beneficiary_id.desc()).first()

    # Determine the new campaign ID
    new_camp_id = (Latest_beneficiary.beneficiary_id + 1) if Latest_beneficiary else 1
    db_beneficiary = Beneficiaries( 
        beneficiary_id=new_camp_id,  # Automatically assign the new ID
        name=beneficiary.name,
        contact=beneficiary.contact,
        address=beneficiary.address,
        campaign_id=beneficiary.campaign_id
    )
    db.add(db_beneficiary)
    db.commit()
    db.refresh(db_beneficiary)
    return db_beneficiary, Beneficiaries.beneficiary_id

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
