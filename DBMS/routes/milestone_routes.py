from fastapi import APIRouter, Depends, status, Response, HTTPException

import models
from database import engine, get_db
from sqlalchemy.orm import Session, sessionmaker
from typing import List
from schemas import MileStone as MileStoneSchema
from models import Base, MileStone


models.Base.metadata.create_all(bind=engine)


router = APIRouter(
    # prefix="",
    tags=['Milestone']
)



# Milestone Endpoints
@router.post("/milestones/", response_model=MileStoneSchema)
def create_milestone(milestone: MileStoneSchema, db: Session = Depends(get_db)):
    db_milestone = MileStone(**milestone.dict())
    db.add(db_milestone)
    db.commit()
    db.refresh(db_milestone)
    return db_milestone

@router.get("/milestones/{milestone_id}/", response_model=MileStoneSchema)
def get_milestone(milestone_id: int, db: Session = Depends(get_db)):
    milestone = db.query(MileStone).filter(MileStone.milestone_id == milestone_id).first()
    if not milestone:
        raise HTTPException(status_code=404, detail="Milestone not found")
    return milestone

@router.put("/milestones/{milestone_id}", response_model=MileStoneSchema)
def update_milestone(milestone_id: int, updated_milestone: MileStoneSchema, db: Session = Depends(get_db)):
    milestone = db.query(MileStone).filter(MileStone.milestone_id == milestone_id).first()
    if not milestone:
        raise HTTPException(status_code=404, detail="Milestone not found")

    for key, value in updated_milestone.dict(exclude_unset=True).items():
        setattr(milestone, key, value)
    
    db.commit()
    db.refresh(milestone)
    return milestone



@router.delete("/milestones/{milestone_id}")
def delete_milestone(milestone_id: int, db: Session = Depends(get_db)):
    milestone = db.query(MileStone).filter(MileStone.milestone_id == milestone_id).first()
    if not milestone:
        raise HTTPException(status_code=404, detail="Milestone not found")
    db.delete(milestone)
    db.commit()
    return {"detail": "Milestone deleted successfully"}