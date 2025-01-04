import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './AdminCampaignDetails.css'; // Import the CSS file
import AdminNavbar from '../../pages/Adminnavbar';

const AdminCampaignDetails = () => {
  const { state } = useLocation();
  const { campaign_id } = state; // Extract campaign ID from state

  const [campaign, setCampaign] = useState(null);
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState(null);

  // Fetch campaign details
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/campaigns/${campaign_id}`)
      .then((response) => setCampaign(response.data))
      .catch((error) => {
        console.error('Error fetching campaign details:', error);
        setError('Failed to fetch campaign details.');
      });
  }, [campaign_id]);

  // Fetch donors
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/campaigns/${campaign_id}/donors`)
      .then((response) => setDonors(response.data))
      .catch((error) => {
        console.error('Error fetching donors:', error);
        setError('Failed to fetch donors.');
      });
  }, [campaign_id]);

  if (error) return <div className="error">{error}</div>;
  if (!campaign) return <div>Loading...</div>;

  return (
    <div>
      <AdminNavbar />
    <div className="campaign-details-container">
      <h1>Campaign Details</h1>
      <h2>{campaign.title}</h2>
      <p>{campaign.description}</p>
      <p>Cause: {campaign.cause}</p>
      <p>Raised: ₹{campaign.raised_amount} / Target: ₹{campaign.target_amount}</p>
      <p>Start Date: {campaign.start_date}</p>
      <p>End Date: {campaign.end_date}</p>

      <h2>Donors</h2>
      {donors.length === 0 ? (
        <p>No donors for this campaign yet.</p>
      ) : (
        <div className="donor-cards-container">
          {donors.map((donor) => (
            <div key={donor.user_id} className="donor-card">
              <h3>{donor.name}</h3>
              <p><strong>Email:</strong> {donor.email}</p>
              <p><strong>Contact:</strong> {donor.contact}</p>
              <p><strong>Donation Amount:</strong> ₹{donor.donation_amount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default AdminCampaignDetails;
