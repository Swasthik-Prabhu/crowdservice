from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, Text, Boolean, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

# Campaign Model
class Campaign(Base):
    __tablename__ = 'campaigns'

    camp_id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    cause = Column(String, nullable=False)
    target_amount = Column(Float, nullable=False)
    raised_amount = Column(Float, default=0.0)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)

    # Foreign key for the creator (linked to Users table)
    creator_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)

    # Relationships
    creator = relationship("Users", back_populates="campaigns")
    milestones = relationship("MileStone", back_populates="campaign")
    reports = relationship("Report", back_populates="campaign")
    donations = relationship("Donations", back_populates="campaign")  # Added donations relationship
    beneficiaries = relationship("Beneficiaries", back_populates="campaign")  # Added relationship

# Beneficiaries Model
class Beneficiaries(Base):
    __tablename__ = 'beneficiaries'

    beneficiary_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    contact = Column(Integer, nullable=False, unique=True)
    address = Column(String, nullable=False)
    

    campaign_id = Column(Integer, ForeignKey('campaigns.camp_id'), nullable=False)

    # Relationships
    campaign = relationship("Campaign", back_populates="beneficiaries")

# Donations Model
class Donations(Base):
    __tablename__ = 'donations'

    donation_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    amount = Column(Float, nullable=False)
    donation_date = Column(Date, nullable=False)
    transaction_id = Column(Integer, nullable=False, unique=True)
    campaign_id = Column(Integer, ForeignKey('campaigns.camp_id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)  # Foreign key for User

    # Relationship with Campaign
    campaign = relationship("Campaign", back_populates="donations")

    # Relationship with User
    user = relationship("Users", back_populates="donations")


# Users Model
class Users(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    contact = Column(Integer, nullable=False, unique=True)
    role = Column(String, nullable=False)
    email = Column(String ,nullable = False,unique=True)
    password = Column(String, nullable = False)

    # Relationship with Campaign and Report
    campaigns = relationship("Campaign", back_populates="creator")  # Added campaigns relationship
    reports = relationship("Report", back_populates="user")
    donations = relationship("Donations", back_populates="user")  # Added donations relationship
    notifications = relationship("Notification", back_populates="user")  # Added notifications relationship
    recommendations = relationship("Recommendation", back_populates="user")

# Report Model
class Report(Base):
    __tablename__ = 'reports'

    report_id = Column(Integer, primary_key=True, index=True,autoincrement=True)
    campaign_id = Column(Integer, ForeignKey('campaigns.camp_id'), nullable=False)
    report_date = Column(Date, nullable=False)
    description = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)

    # Relationships
    campaign = relationship("Campaign", back_populates="reports")
    user = relationship("Users", back_populates="reports")

# Milestone Model
class MileStone(Base):
    __tablename__ = 'milestones'

    milestone_id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey('campaigns.camp_id'), nullable=False)
    milestone_date = Column(Date, nullable=False)
    description = Column(String, nullable=False)
    status = Column(String, nullable=False)

    # Relationship with Campaign
    campaign = relationship("Campaign", back_populates="milestones")


# Notification Model
class Notification(Base):
    __tablename__ = 'notifications'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    type = Column(String(50), nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    timestamp = Column(DateTime, server_default=func.now())

    user = relationship('Users', back_populates='notifications')  # Assuming User model has a backref



class Recommendation(Base):
    __tablename__ = 'recommendations'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    user_id = Column(Integer, ForeignKey('users.user_id'))

    user = relationship("Users", back_populates="recommendations")

