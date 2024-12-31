import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import axios from 'axios';
import './BeneficiaryPage.css';
import Navbar from '../../pages/navbar';

const BeneficiaryPage = () => {
  const navigate = useNavigate(); // Correctly call useNavigate inside the component
  const { campaignId } = useParams(); // Get the campaign_id from the route parameter

  const [form, setForm] = useState({
    name: '',
    contact: '',
    address: '',
    campaign_id: campaignId || '', // Prepopulate with campaign_id from the URL
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form submission (create new beneficiary)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/createbeneficiaries', form);
      alert('Beneficiary created successfully!');

      // Reset form after successful submission, but keep campaign_id
      setForm({
        name: '',
        contact: '',
        address: '',
        campaign_id: campaignId || '',
      });

      // Navigate to donor-dashboard
      navigate('/donor-dashboard');
    } catch (err) {
      console.error('Error submitting form:', err.message);
      alert('Error creating beneficiary: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="beneficiary-page-container">
        <h2>Create Beneficiary</h2>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="beneficiary-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact:</label>
            <input
              type="number"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Campaign ID:</label>
            <input
              type="number"
              name="campaign_id"
              value={form.campaign_id}
              readOnly // Make the field non-editable
            />
          </div>
          <button type="submit" className="submit-button">
            Add Beneficiary
          </button>
        </form>
      </div>
    </div>
  );
};

export default BeneficiaryPage;
