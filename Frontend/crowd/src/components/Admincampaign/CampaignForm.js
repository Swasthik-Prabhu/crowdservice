import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateCampaign } from '../../services/api';
import './CampaignForm.css';
import AdminNavbar from '../../pages/Adminnavbar';

const AdminCampaignForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { campaign } = location.state || {}; // Retrieve the campaign data from state

  const [form, setForm] = useState({
    title: '',
    cause: '',
    target_amount: 0,
    start_date: '',
    end_date: '',
    creator_id: '',
    raised_amount: 0,
    campaign_id: null,
  });

  useEffect(() => {
    if (campaign) {
      setForm({
        title: campaign.title,
        cause: campaign.cause,
        target_amount: campaign.target_amount,
        start_date: campaign.start_date,
        end_date: campaign.end_date,
        creator_id: campaign.creator_id,
        raised_amount: campaign.raised_amount,
        campaign_id: campaign.camp_id,
      });
    }
  }, [campaign]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { campaign_id, creator_id, raised_amount, ...campaignData } = form; // Exclude non-editable fields
      await updateCampaign(campaign_id, { ...campaignData, raised_amount });
      alert('Campaign updated successfully!');

      // Navigate back to campaign list
      navigate('/admin-panel');
    } catch (err) {
      alert('Error updating campaign: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div>
      <AdminNavbar/>
    <div>
      
    <div className="campaign-form-container">
    <h2>Update Campaign</h2>
      <form onSubmit={handleSubmit} className="campaign-form">
        <div className="form-group">
          <label htmlFor="campaign_id">Campaign ID:</label>
          <input
            type="text"
            id="campaign_id"
            name="campaign_id"
            value={form.campaign_id}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="creator_id">Creator ID:</label>
          <input
            type="text"
            id="creator_id"
            name="creator_id"
            value={form.creator_id}
            readOnly
          />
        </div>

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

        <button type="submit" className="submit-button">
          Update Campaign
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default AdminCampaignForm;
