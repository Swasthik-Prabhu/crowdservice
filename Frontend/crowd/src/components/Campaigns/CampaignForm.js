import React, { useState } from 'react';
import { createCampaign } from '../../services/api';
import './CampaignForm.css'; // Optional CSS file for styling

const CampaignForm = () => {
  const [form, setForm] = useState({
    title: '',
    cause: '',
    target_amount: 0,
    raised_amount: 0,
    received_amount: 0,
    start_date: '',
    end_date: '',
    creator_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCampaign(form);
      alert('Campaign created successfully!');
      setForm({
        title: '',
        cause: '',
        target_amount: 0,
        raised_amount: 0,
        received_amount: 0,
        start_date: '',
        end_date: '',
        creator_id: '',
      });
    } catch (err) {
      alert('Error creating campaign: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
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
          <label htmlFor="raised_amount">Raised Amount:</label>
          <input
            type="number"
            id="raised_amount"
            name="raised_amount"
            value={form.raised_amount}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="received_amount">Received Amount:</label>
          <input
            type="number"
            id="received_amount"
            name="received_amount"
            value={form.received_amount}
            onChange={handleChange}
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
            type="number"
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
      </form>
    </div>
  );
};

export default CampaignForm;
