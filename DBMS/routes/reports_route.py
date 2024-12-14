from fastapi import APIRouter, Depends, status, Response, HTTPException

import models
from database import engine, get_db
from sqlalchemy.orm import Session, sessionmaker
from typing import List
from schemas import Report as ReportSchema
from models import Base, Report


models.Base.metadata.create_all(bind=engine)


router = APIRouter(
    # prefix="",
    tags=['Reports']
)


# Reports Endpoints
@router.post("/reports/", response_model=ReportSchema)
def create_report(report: ReportSchema, db: Session = Depends(get_db)):
    db_report = Report(**report.dict())
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report

@router.get("/reports/{report_id}/", response_model=ReportSchema)
def get_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.report_id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report

@router.put("/reports/{report_id}", response_model=ReportSchema)
def update_report(report_id: int, updated_report: ReportSchema, db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.report_id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    for key, value in updated_report.dict(exclude_unset=True).items():
        setattr(report, key, value)
    
    db.commit()
    db.refresh(report)
    return report




@router.delete("/reports/{report_id}")
def delete_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.report_id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    db.delete(report)
    db.commit()
    return {"detail": "Report deleted successfully"}

