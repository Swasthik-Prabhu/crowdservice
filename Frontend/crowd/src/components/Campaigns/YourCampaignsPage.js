import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../pages/navbar";
import "./YourCampaignsPage.css";

const YourCampaignsPage = () => {
  const { userId } = useParams(); // Fetch user ID from route params
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch campaigns created by the user
    axios
      .get(`http://127.0.0.1:8000/campaigns/creator/${userId}`)
      .then((response) => {
        setUserCampaigns(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user campaigns:", error);
        setLoading(false);
      });
  }, [userId]);

  const handleCampaignClick = (campaignId) => {
    // Navigate to the campaign details page
    navigate(`/campaign/${campaignId}`);
  };

  return (
    <div>
      <Navbar />
      <div className="your-campaigns-page">
        <h1>Your Campaigns</h1>

        {loading ? (
          <p>Loading your campaigns...</p>
        ) : userCampaigns.length === 0 ? (
          <p>You have not created any campaigns yet.</p>
        ) : (
          <div className="campaigns-list">
            {userCampaigns.map((campaign) => (
              <div
                key={campaign.camp_id}
                className="campaign-card"
                onClick={() => handleCampaignClick(campaign.camp_id)}
              >
                <h3>{campaign.title}</h3>
                <p>Cause: {campaign.cause}</p>
                <p>
                  Raised: ₹{campaign.raised_amount} / Target: ₹
                  {campaign.target_amount}
                </p>
                <p>
                  Start Date: {new Date(campaign.start_date).toLocaleDateString()}
                </p>
                <p>
                  End Date: {new Date(campaign.end_date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default YourCampaignsPage;
