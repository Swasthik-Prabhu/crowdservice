import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DonationPage.css';

const DonationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: "",
    donation_date: "",
    transaction_id: "",
    campaign_id: "",
    user_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/donations/", formData);
      alert(`Donation Successful! Transaction ID: ${response.data.transaction_id}`);
      navigate("/donor-dashboard"); // Redirect back to the campaign list
    } catch (err) {
      console.error("Error submitting donation:", err);
      setError("Failed to process the donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donation-page">
      <h2>Donate to a Campaign</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="donation_date">Donation Date:</label>
        <input
          type="date"
          id="donation_date"
          name="donation_date"
          value={formData.donation_date}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="transaction_id">Transaction ID:</label>
        <input
          type="number"
          id="transaction_id"
          name="transaction_id"
          value={formData.transaction_id}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="campaign_id">Campaign ID:</label>
        <input
          type="number"
          id="campaign_id"
          name="campaign_id"
          value={formData.campaign_id}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="user_id">User ID:</label>
        <input
          type="number"
          id="user_id"
          name="user_id"
          value={formData.user_id}
          onChange={handleInputChange}
          required
        />

        <div className="form-buttons">
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Confirm Donation"}
          </button>
          <button type="button" onClick={() => navigate("/donor-dashboard")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonationPage;
