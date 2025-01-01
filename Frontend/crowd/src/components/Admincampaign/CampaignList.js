import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CampaignList.css';

const AdminCampaignList = () => {
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

  const handleUpdateClick = (campaign) => {
    navigate('/update-campaign', { state: { campaign } }); // Pass entire campaign object via state
  };

  // const handleDeleteClick = async (campaign_id) => {
  //   try {
  //     await axios.delete(`http://127.0.0.1:8000/campaigns/${campaign_id}`);
  //     alert('Campaign deleted successfully!');
  //     setCampaigns(campaigns.filter(campaign => campaign.camp_id !== campaign_id));
  //   } catch (error) {
  //     alert('Error deleting campaign: ' + (error.response?.data?.detail || error.message));
  //   }
  // };

  return (
    <div>
      <h1>Campaigns</h1>
      {error && <div className="error">{error}</div>}
      <div className="campaigns-list">
        {campaigns.map((campaign) => (
          <div key={campaign.camp_id} className="campaign-card">
            <h3>{campaign.title}</h3>
            <p>{campaign.cause}</p>
            <p>Raised: ₹{campaign.raised_amount} / Target: ₹{campaign.target_amount}</p>
            <p>Start Date: {campaign.start_date}</p>
            <p>End Date: {campaign.end_date}</p>
            <button onClick={() => handleUpdateClick(campaign)}>Update</button>
            {/* <button onClick={() => handleDeleteClick(campaign.camp_id)}>Delete</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCampaignList;
