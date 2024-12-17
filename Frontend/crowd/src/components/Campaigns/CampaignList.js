import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CampaignList.css';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/campaigns/')
      .then((response) => setCampaigns(response.data))
      .catch((error) => {
        console.error('Error fetching campaigns:', error);
        setError('Failed to fetch campaigns.');
      });
  }, []);

  const handleDonateClick = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    if (!donationAmount || donationAmount <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    alert(`Donated successfully! You donated $${donationAmount} to ${selectedCampaign.title}.`);
    setDonationAmount(0);
    setSelectedCampaign(null);
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
            <p>Raised: ${campaign.raised_amount} / Target: ${campaign.target_amount}</p>
            <button onClick={() => handleDonateClick(campaign)}>Donate</button>
          </div>
        ))}
      </div>

      {selectedCampaign && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Donate to {selectedCampaign.title}</h2>
            <form onSubmit={handleDonationSubmit}>
              <label htmlFor="donationAmount">Amount:</label>
              <input
                type="number"
                id="donationAmount"
                value={donationAmount}
                onChange={(e) => setDonationAmount(Number(e.target.value))}
                min="1"
                required
              />
              <div className="modal-buttons">
                <button type="submit">Confirm Donation</button>
                <button type="button" onClick={() => setSelectedCampaign(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignList;
