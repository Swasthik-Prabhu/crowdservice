from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from database import get_db
from typing import Optional

router = APIRouter(tags=["Admin Analytics"])

@router.get("/admin/analytics")
def admin_analytics(db: Session = Depends(get_db)):
    try:
        query = text("""
        SELECT
            -- Existing analytics
            (SELECT COALESCE(SUM(amount), 0) FROM donations) AS total_donations,
            (SELECT COUNT(*) FROM campaigns) AS total_campaigns,
            (SELECT COUNT(*) FROM beneficiaries) AS total_beneficiaries,
            (SELECT COUNT(*) FROM users) AS total_users,
            (SELECT title
             FROM campaigns c
             JOIN donations d ON c.camp_id = d.campaign_id
             GROUP BY c.camp_id
             ORDER BY SUM(d.amount) DESC
             LIMIT 1) AS top_campaign,
            (SELECT COALESCE(SUM(d.amount), 0)
             FROM donations d
             JOIN campaigns c ON c.camp_id = d.campaign_id
             GROUP BY c.camp_id
             ORDER BY SUM(d.amount) DESC
             LIMIT 1) AS top_campaign_donations,

            -- New analytics
            (SELECT COALESCE(SUM(raised_amount), 0) FROM campaigns) AS total_raised_amount,
            (SELECT title
             FROM campaigns c
             JOIN donations d ON c.camp_id = d.campaign_id
             GROUP BY c.camp_id
             ORDER BY COUNT(d.donation_id) DESC
             LIMIT 1) AS most_popular_campaign,
            (SELECT COALESCE(AVG(amount), 0) FROM donations) AS average_donation,
            (SELECT COUNT(*) FROM campaigns WHERE end_date >= DATE('now')) AS active_campaigns,
            (SELECT COUNT(*) FROM campaigns WHERE raised_amount >= target_amount) AS completed_campaigns,
            (SELECT COUNT(*) FROM milestones WHERE status = 'Pending') AS pending_milestones,
            (SELECT COUNT(*) FROM reports) AS total_reports,

            -- Additional analytics
            (SELECT name
             FROM users u
             JOIN donations d ON u.user_id = d.user_id
             ORDER BY d.amount DESC
             LIMIT 1) AS max_donor,
            (SELECT COALESCE(MAX(amount), 0) FROM donations) AS max_donation_amount
        """)

        # Execute the query
        result = db.execute(query)
        row = result.fetchone()

        if not row:
            raise HTTPException(status_code=404, detail="No analytics data found")

        # Query for campaign-wise donations for the chart
        campaign_query = text("""
        SELECT c.title, COALESCE(SUM(d.amount), 0) AS total_donations
        FROM campaigns c
        LEFT JOIN donations d ON c.camp_id = d.campaign_id
        GROUP BY c.camp_id
        ORDER BY c.title
        """)
        campaign_result = db.execute(campaign_query)
        campaign_data = [
            {"title": row[0], "total_donations": row[1]} for row in campaign_result
        ]

        # Return analytics in a structured format
        return {
            "total_donations": row[0],
            "total_campaigns": row[1],
            "total_beneficiaries": row[2],
            "total_users": row[3],
            "top_campaign": row[4] if row[4] else "No campaigns yet",
            "top_campaign_donations": row[5] if row[5] else 0,
            "total_raised_amount": row[6],
            "most_popular_campaign": row[7] if row[7] else "No campaigns yet",
            "average_donation": round(row[8], 2) if row[8] else 0,
            "active_campaigns": row[9],
            "completed_campaigns": row[10],
            "pending_milestones": row[11],
            "total_reports": row[12],
            "max_donor": row[13] if row[13] else "No donors yet",
            "max_donation_amount": row[14],
            "campaign_donations": campaign_data,  # Campaign-wise donations for chart
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching analytics: {str(e)}")
