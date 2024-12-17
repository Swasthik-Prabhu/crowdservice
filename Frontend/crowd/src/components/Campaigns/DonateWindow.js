import React, { useState } from 'react';
import axios from 'axios';

const DonateWindow = () => {
  const [donationAmount, setDonationAmount] = useState(0);
  const [userId] = useState(1); // Assuming user ID 1 for simplicity
  const [campaignId, setCampaignId] = useState(0); // Campaign ID passed from parent window

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    if (donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    const donationData = {
      amount: donationAmount,
      donation_date: new Date().toISOString(),
      transaction_id: `TX-${Math.random().toString(36).substr(2, 9)}`, // Random transaction ID
      campaign_id: campaignId,
      user_id: userId
    };

    axios.post('http://127.0.0.1:8000/donations/', donationData)
      .then((response) => {
        alert('Donation successful!');
      })
      .catch((error) => {
        alert('Donation failed: ' + error.message);
      });
  };

  return (
    <div>
      <h2>Donate to Campaign</h2>
      <form onSubmit={handleDonationSubmit}>
        <label>Donation Amount:</label>
        <input
          type="number"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          required
        />
        <button type="submit">Donate</button>
      </form>
    </div>
  );
};

export default DonateWindow;
