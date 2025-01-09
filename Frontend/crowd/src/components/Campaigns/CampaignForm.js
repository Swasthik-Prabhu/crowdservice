import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCampaign } from '../../services/api';
import './CampaignForm.css'; // Optional CSS file for styling
import Navbar from '../../pages/navbar';

const CampaignForm = () => {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    title: '',
    cause: '',
    target_amount: 0,
    start_date: '',
    end_date: '',
    creator_id: '', // This will be populated with user_id from localStorage
    raised_amount: 0, // Default value
    campaign_id: null,
  });

  const [campaignId] = useState(null);

  useEffect(() => {
    // Retrieve user details from localStorage
    const storedUser = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUser && storedUser.user_id) {
      setForm((prevForm) => ({
        ...prevForm,
        creator_id: storedUser.user_id, // Set the creator_id
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { raised_amount, ...campaignData } = form; // Raised amount included by default
      const response = await createCampaign({ ...campaignData, raised_amount });

      const camp_id = response.data.id; // Capture campaign ID from backend
      alert('Campaign created successfully!');

      // Navigate to BeneficiaryPage with camp_id
      navigate(`/beneficiaries/${camp_id}`); // Assuming you use dynamic routes

      // Reset form
      setForm({
        title: '',
        cause: '',
        target_amount: 0,
        start_date: '',
        end_date: '',
        creator_id: '', // Reset creator_id to empty string
        raised_amount: 0,
      });
    } catch (err) {
      alert('Error creating campaign: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="campaign-form-container">
        <h2>Create a New Campaign</h2>
        <form onSubmit={handleSubmit} className="campaign-form">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
          <label htmlFor="cause">Cause:</label>
  <select
    id="cause"
    name="cause"
    value={form.cause}
    onChange={handleChange}
    required
  >
    <option value="" disabled>
      Select a cause
    </option>
    <option value="Health">Health</option>
    <option value="Natural Disaster">Natural Disaster</option>
    <option value="Wildlife">Wildlife</option>
    <option value="Welfare">Welfare</option>
  </select>
          </div>

          <div className="form-group">
            <label htmlFor="target_amount">Target Amount:</label>
            <input
              type="number"
              id="target_amount"
              name="target_amount"
              value={form.target_amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="start_date">Start Date:</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="end_date">End Date:</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="creator_id">Creator ID:</label>
            <input
              type="text"
              id="creator_id"
              name="creator_id"
              value={form.creator_id}
              readOnly // Make the field read-only since it's auto-filled
            />
          </div>

          <button type="submit" className="submit-button">
            Create Campaign
          </button>

          {campaignId && (
            <p className="success-message">
              Campaign created successfully! ID: {campaignId}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CampaignForm;
