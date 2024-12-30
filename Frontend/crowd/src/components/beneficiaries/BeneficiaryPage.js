import React, { useState } from 'react';
import axios from 'axios';
import './BeneficiaryPage.css'; // Optional CSS file for styling

const BeneficiaryPage = () => {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    address: '',
    campaign_id: '',
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
      const response = await axios.post('http://127.0.0.1:8000/createbeneficiaries', form);
      alert('Beneficiary created successfully!');

      // Reset form after successful submission
      setForm({
        name: '',
        contact: '',
        address: '',
        campaign_id: '',
      });
    } catch (err) {
      console.error('Error submitting form:', err.message);
    }
  };

  return (
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
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Beneficiary
        </button>
      </form>
    </div>
  );
};

export default BeneficiaryPage;
