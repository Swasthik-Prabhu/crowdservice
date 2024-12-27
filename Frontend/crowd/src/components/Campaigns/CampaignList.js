import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CampaignList.css';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/campaigns/')
      .then((response) => setCampaigns(response.data))
      .catch((error) => {
        console.error('Error fetching campaigns:', error);
        setError('Failed to fetch campaigns.');
      });
  }, []);

  const handleDonateClick = (campaign) => {
    navigate('/donate', { state: { campaign_id: campaign.camp_id } }); // Pass campaign_id via state
  };

  return (
    <div>
      <h1>Campaigns</h1>
      {error && <div className="error">{error}</div>}
      <div className="campaigns-list">
        {campaigns.map((campaign) => (
          <div key={campaign.camp_id} className="campaign-card">
            <h3>{campaign.title}</h3>
            <p>{campaign.cause}</p>
            {/* <p>ID : {campaign.camp_id}</p> */}
            <p>Raised: ₹{campaign.raised_amount} / Target: ₹{campaign.target_amount}</p>
            <button onClick={() => handleDonateClick(campaign)}>Donate</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignList;

