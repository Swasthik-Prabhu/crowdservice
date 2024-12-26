import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BeneficiaryPage.css'; // Optional CSS file for styling

const BeneficiaryPage = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [form, setForm] = useState({
    name: '',
    contact: '',
    address: '',
    campaign_id: '',
  });

  const [editingBeneficiary, setEditingBeneficiary] = useState(null);

  // Fetch beneficiaries from backend
  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await axios.get('/beneficiaries/');
        setBeneficiaries(response.data);
      } catch (err) {
        console.error('Error fetching beneficiaries:', err.message);
      }
    };

    fetchBeneficiaries();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBeneficiary) {
        // Update beneficiary
        const response = await axios.put(
          `/beneficiaries/${editingBeneficiary.beneficiary_id}`,
          form
        );
        alert('Beneficiary updated successfully!');
      } else {
        // Create beneficiary
        const response = await axios.post('/beneficiaries/', form);
        setBeneficiaries([...beneficiaries, response.data]);
        alert('Beneficiary created successfully!');
      }

      // Reset form and editing state
      setForm({
        name: '',
        contact: '',
        address: '',
        campaign_id: '',
      });
      setEditingBeneficiary(null);
    } catch (err) {
      console.error('Error submitting form:', err.message);
    }
  };

  // Handle edit
  const handleEdit = (beneficiary) => {
    setEditingBeneficiary(beneficiary);
    setForm({
      name: beneficiary.name,
      contact: beneficiary.contact,
      address: beneficiary.address,
      campaign_id: beneficiary.campaign_id,
    });
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/beneficiaries/${id}`);
      setBeneficiaries(beneficiaries.filter((b) => b.beneficiary_id !== id));
      alert('Beneficiary deleted successfully!');
    } catch (err) {
      console.error('Error deleting beneficiary:', err.message);
    }
  };

  return (
    <div className="beneficiary-page-container">
      <h2>Manage Beneficiaries</h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="beneficiary-form">
        <h3>{editingBeneficiary ? 'Edit Beneficiary' : 'Add Beneficiary'}</h3>
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
          {editingBeneficiary ? 'Update' : 'Add'}
        </button>
      </form>

      {/* Beneficiary List */}
      <h3>Existing Beneficiaries</h3>
      <ul className="beneficiary-list">
        {beneficiaries.map((beneficiary) => (
          <li key={beneficiary.beneficiary_id} className="beneficiary-item">
            <p>
              <strong>Name:</strong> {beneficiary.name}
            </p>
            <p>
              <strong>Contact:</strong> {beneficiary.contact}
            </p>
            <p>
              <strong>Address:</strong> {beneficiary.address}
            </p>
            <p>
              <strong>Campaign ID:</strong> {beneficiary.campaign_id}
            </p>
            <button onClick={() => handleEdit(beneficiary)} className="edit-button">
              Edit
            </button>
            <button
              onClick={() => handleDelete(beneficiary.beneficiary_id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BeneficiaryPage;
