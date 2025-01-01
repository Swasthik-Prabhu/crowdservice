import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DonationPage.css';
import Navbar from '../../pages/navbar';

const DonationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    donation_date: new Date().toISOString().split('T')[0], // Default to today's date
    transaction_id: '',
    campaign_id: '',
    user_id: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const campaignId = location.state?.campaign_id;
    const storedUser = JSON.parse(localStorage.getItem('userDetails'));

    if (!campaignId) {
      setError('Campaign ID not provided. Please try again.');
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      campaign_id: campaignId,
      user_id: storedUser?.user_id || '',
    }));
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/donations/', formData);
      alert(`Donation Successful! Transaction ID: ${response.data.transaction_id}`);
      navigate('/donor-dashboard');
    } catch (err) {
      console.error('Error submitting donation:', err);
      setError('Failed to process the donation. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page (CampaignDetailsPage)
  };

  return (
    <div>
      <Navbar />
    <div className="donation-page">
      <h2>Donate to Campaign</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="campaign_id">Campaign ID:</label>
        <input
          type="text"
          id="campaign_id"
          name="campaign_id"
          value={formData.campaign_id}
          readOnly
        />

        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="transaction_id">Transaction ID:</label>
        <input
          type="text"
          id="transaction_id"
          name="transaction_id"
          value={formData.transaction_id}
          onChange={handleInputChange}
          required
        />

        <div className="button-group">
          <button type="submit">Donate</button>
          <button type="button" onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default DonationPage;
