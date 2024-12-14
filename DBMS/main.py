from fastapi import FastAPI, Depends, HTTPException
# from sqlalchemy.orm import Session
# import schemas
# from database import engine, Sessionlocal
# from models import Base, Campaign, Beneficiaries, Donations, Users, Report, MileStone
# from schemas import Campaign as CampaignSchema, Beneficiaries as BeneficiariesSchema, Donations as DonationsSchema, Users as UsersSchema, Report as ReportSchema, MileStone as MileStoneSchema
# # from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
# from typing import List

from routes import campaign_routes, beneficiary_routes, donations_route, milestone_routes, user_routes, reports_route



# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust to your frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(campaign_routes.router)
app.include_router(beneficiary_routes.router)
app.include_router(donations_route.router)
app.include_router(user_routes.router)
app.include_router(milestone_routes.router)
app.include_router(reports_route.router)






