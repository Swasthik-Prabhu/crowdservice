from pydantic import BaseModel
from datetime import date

# Campaign Schema
class Campaign(BaseModel):
    camp_id : int 
    title : str
    cause : str
    target_amount : float
    raised_amount : float
    start_date : date
    end_date : date
    creator_id : int  # foreign key

# Beneficiaries Schema
class Beneficiaries(BaseModel):
    beneficiary_id : int
    name : str
    contact : int
    address : str
    campaign_id : int  # foreign key

# Donations Schema
class Donations(BaseModel):
    donation_id : int
    amount : float
    donation_date : date
    transaction_id : int
    campaign_id : int   # foreign key
    user_id: int   # foreign key added

# Users Schema
class Users(BaseModel):
    user_id : int
    name : str
    email : str
    password : str
    contact : int
    role : str

class ShowUser(BaseModel):
    user_id : int
    name : str
    email : str
    contact : int
    role : str

class LoginUser(BaseModel):
    email: str
    password: str


# Report Schema
class Report(BaseModel):
    report_id : int
    campaign_id : int
    report_date : date
    description : str
    user_id : int  # foreign key

# MileStone Schema
class MileStone(BaseModel):
    milestone_id : int
    campaign_id : int     # foreign key
    milestone_date : date
    description : str
    status : str
