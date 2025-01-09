from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models, schemas
from database import get_db

router = APIRouter(prefix="/notifications", tags=["Notifications"])

# Create Notification
@router.post("/", response_model=schemas.NotificationRead)
def create_notification(notification: schemas.NotificationCreate, db: Session = Depends(get_db)):
    db_notification = models.Notification(**notification.dict())
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    return db_notification


# Fetch Unread Notifications for a User
@router.get("/user/{user_id}", response_model=List[schemas.NotificationRead])
def get_unread_notifications(user_id: int, db: Session = Depends(get_db)):
    notifications = db.query(models.Notification).filter(
        models.Notification.user_id == user_id,
        models.Notification.is_read == False
    ).all()
    return notifications


# Mark Notification as Read
@router.put("/{notification_id}/read")
def mark_notification_as_read(notification_id: int, db: Session = Depends(get_db)):
    notification = db.query(models.Notification).filter(
        models.Notification.id == notification_id
    ).first()

    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")

    notification.is_read = True
    db.commit()
    db.refresh(notification)
    return {"message": "Notification marked as read"}


# @router.get("/notifications/", response_model=List[schemas.NotificationBase])
# def get_notifications(user_id: int, unread_only: bool = False, db: Session = Depends(get_db)):
#     query = db.query(models.Notification).filter(models.Notification.user_id == user_id)
#     if unread_only:
#         query = query.filter(models.Notification.is_read == False)
    
#     notifications = query.order_by(models.Notification.created_at.desc()).all()
#     return notifications


@router.delete("/notifications/{notification_id}", response_model=dict)
def delete_notification(notification_id: int, db: Session = Depends(get_db)):
    notification = db.query(models.Notification).filter(models.Notification.id == notification_id).first()
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    db.delete(notification)
    db.commit()
    return {"message": "Notification deleted successfully"}

@router.get("/notifications/{user_id}", response_model=List[schemas.NotificationRead])
def get_notifications_by_user_id(user_id: int, db: Session = Depends(get_db)):
    notifications = db.query(models.Notification).filter(models.Notification.user_id == user_id).order_by(models.Notification.timestamp.desc()).all()
    if not notifications:
        raise HTTPException(status_code=404, detail="No notifications found for this user")
    return notifications
