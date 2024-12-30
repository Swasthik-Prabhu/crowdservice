import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { createCampaign } from '../../services/api';
import './CampaignForm.css'; // Optional CSS file for styling
// import BeneficiaryPage from '../beneficiaries/BeneficiaryPage'
import Navbar from '../../pages/navbar';

const CampaignForm = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const [form, setForm] = useState({
    title: '',
    cause: '',
    target_amount: 0,
    start_date: '',
    end_date: '',
    creator_id: '',
    raised_amount: 0, // Default value set here
    campaign_id: null,
  });

  const [campaignId, setCampaignId] = useState(null);

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
            creator_id: '',
            raised_amount: 0,
        });
    } catch (err) {
        alert('Error creating campaign: ' + (err.response?.data?.detail || err.message));
    }
};

  
  return (
    <div>
      <Navbar/>
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
          <input
            type="text"
            id="cause"
            name="cause"
            value={form.cause}
            onChange={handleChange}
            required
          />
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
            onChange={handleChange}
            required
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
