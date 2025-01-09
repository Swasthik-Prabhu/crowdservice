from pydantic import BaseModel, EmailStr 
from datetime import date, datetime

# Campaign Schema
class Campaign(BaseModel):
    #camp_id : int 
    title : str
    cause : str
    target_amount : float
    raised_amount : float
    start_date : date
    end_date : date
    creator_id : int  # foreign key

    class Config:
        orm_mode = True
        from_attributes = True

class showcampaigns(BaseModel):
    camp_id : int 
    title : str
    cause : str
    target_amount : float
    raised_amount : float
    start_date : date
    end_date : date
    creator_id : int

    class Config:
        orm_mode = True
        from_attributes = True

class CampaignResponse(BaseModel):
    id: int


class CampaignDetail(BaseModel):
    camp_id: int
    title: str

class DonationResponse(BaseModel):
    donation_id: int
    amount: float
    donation_date: date
    # transaction_id: str
    campaign: CampaignDetail  # Include campaign details


class Campaignuser(BaseModel):
    camp_id : int 
    title : str
    cause : str
    target_amount : float
    raised_amount : float
    start_date : date
    end_date : date




class updatecampaigns(BaseModel):
    
    title : str
    cause : str
    target_amount : float
    start_date : date
    end_date : date
    


# Beneficiaries Schema
class Beneficiaries(BaseModel):
    # beneficiary_id : int
    name : str
    contact : int
    address : str
    campaign_id : int  # foreign key

    class Config:
        orm_mode = True

# Donations Schema
class Donations(BaseModel):
    # donation_id : int
    amount : float
    donation_date : date
    transaction_id : int
    campaign_id : int   # foreign key
    user_id: int   # foreign key added


class donationuser(BaseModel):
    donation_id : int
    amount : float
    donation_date : date
    transaction_id : int
    campaign_id : int   # foreign key
    user_id: int   # foreign key added

# Users Schema
class Users(BaseModel):
    #user_id : int
    name : str
    email : str
    password : str
    contact : int
    role : str

class ShowUser(BaseModel):
    user_id : int
    name : str
    email : str
    contact : float

class LoginUser(BaseModel):
    email: str
    password: str


class userdonated(BaseModel):
    user_id : int
    name : str
    email : str
    contact : float
    donation_amount: float





# Report Schema
class Report(BaseModel):
    # report_id : int
    campaign_id : int
    report_date : date
    description : str
    user_id : int  # foreign key

class show_report(BaseModel):
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
# notification 

class NotificationBase(BaseModel):
    user_id: int
    type: str
    message: str

class NotificationCreate(NotificationBase):
    pass  # Used when creating a new notification

class NotificationRead(NotificationBase):
    id: int
    is_read: bool
    timestamp: datetime

    class Config:
        orm_mode = True  # Enables automatic conversion from ORM models to Pydantic


class Recommendation(BaseModel):
    id: int
    title: str
    description: str
    user_id: int # foreign key

    class Config:
        from_attributes = True
