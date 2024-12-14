from fastapi import APIRouter, Depends, status, Response, HTTPException

import models
from database import engine, get_db
from sqlalchemy.orm import Session
from typing import List
import schemas
from schemas import Users as UsersSchema
from models import Base, Users
from sqlalchemy import func


from hashing import Hash 

models.Base.metadata.create_all(bind=engine)


router = APIRouter(
    # prefix="",
    tags=['Users']
)





# Users Endpoints
@router.post("/users/", response_model=UsersSchema)
def create_user(user: UsersSchema, db: Session = Depends(get_db)):
    # Check if email or contact already exists
    db_user_email = db.query(Users).filter(Users.email == user.email).first()
    db_user_contact = db.query(Users).filter(Users.contact == user.contact).first()
    if db_user_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    if db_user_contact:
        raise HTTPException(status_code=400, detail="Contact already registered")
    
    hashedPassword = Hash.bcrypt(password = user.password)
    db_user = Users(
        name=user.name,
        email=user.email,
        password=hashedPassword,
        contact=user.contact,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user



@router.post("/auth/login/")
async def login_user(user: schemas.LoginUser, db: Session = Depends(get_db)):
    # Fetch the user from the database
    db_user = db.query(Users).filter(Users.email == user.email).first()

    # Verify if user exists and the password matches using Hash.verify
    if db_user is None or not Hash.verify(db_user.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Return success response
    return {"message": "Login successful", "user_id": db_user.user_id, "role": db_user.role}

@router.get("/users/max-id/")
def get_max_user_id(db: Session = Depends(get_db)):
    max_id = db.query(func.max(models.Users.user_id)).scalar()
    return {"max_id": max_id if max_id else 0}


@router.get("/users/{user_id}/", response_model=schemas.ShowUser)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/users/{user_id}", response_model=UsersSchema)
def update_user(user_id: int, updated_user: UsersSchema, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    for key, value in updated_user.dict(exclude_unset=True).items():
        setattr(user, key, value)
    
    db.commit()
    db.refresh(user)
    return user



@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"detail": "User deleted successfully"}