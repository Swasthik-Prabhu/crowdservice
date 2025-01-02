// import React, { useState } from 'react';
// import axios from 'axios';
// import './ContactUs.css';
// import Navbar from './navbar';

// const ReportPage = () => {
//   const [formData, setFormData] = useState({
//     campaign_id: '',
//     report_date: new Date().toISOString().split('T')[0], // Default to today's date
//     description: '',
//     user_id: ''
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);

//   // Retrieve user_id from local storage on component load
//   React.useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('userDetails'));
//     if (storedUser?.user_id) {
//       setFormData((prevData) => ({
//         ...prevData,
//         user_id: storedUser.user_id,
//       }));
//     } else {
//       setError('User not logged in. Please log in to report.');
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccessMessage(null);

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/reports/', formData);
//       setSuccessMessage('Report submitted successfully!');
//       setFormData({
//         campaign_id: '',
//         report_date: new Date().toISOString().split('T')[0],
//         description: '',
//         user_id: formData.user_id, // Keep the user_id
//       });
//     } catch (err) {
//       console.error('Error submitting report:', err);
//       setError('Failed to submit the report. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="report-page-container">
//         <div className="report-header">
//           <h1>Report an Issue</h1>
//           <p>If you notice an issue with a campaign, please report it here.</p>
//         </div>

//         {error && <div className="error-message">{error}</div>}
//         {successMessage && <div className="success-message">{successMessage}</div>}

//         <form onSubmit={handleSubmit} className="report-form">
//           <div className="form-group">
//             <label htmlFor="campaign_id">Campaign ID:</label>
//             <input
//               type="number"
//               id="campaign_id"
//               name="campaign_id"
//               value={formData.campaign_id}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="report_date">Report Date:</label>
//             <input
//               type="date"
//               id="report_date"
//               name="report_date"
//               value={formData.report_date}
//               onChange={handleInputChange}
//               required
//               disabled
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="description">Description:</label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               placeholder="Enter the details of the issue"
//               required
//             ></textarea>
//           </div>

//           <button type="submit" className="submit-btn" disabled={loading}>
//             {loading ? 'Submitting...' : 'Submit Report'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ReportPage;



import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './ContactUs.css';
import Navbar from './navbar';

const ReportPage = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    campaign_id: '',
    report_date: new Date().toISOString().split('T')[0], // Default to today's date
    description: '',
    user_id: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const campaignId = location.state?.campaign_id;
    const storedUser = JSON.parse(localStorage.getItem('userDetails'));

    if (campaignId) {
      setFormData((prevData) => ({
        ...prevData,
        campaign_id: campaignId,
        user_id: storedUser?.user_id || '',
      }));
    } else {
      setError('Campaign ID not provided. Please try again.');
    }
  }, [location.state]);

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
    setSuccessMessage(null);

    try {
      await axios.post('http://127.0.0.1:8000/reports/', formData);
      setSuccessMessage('Report submitted successfully!');
      setFormData({
        campaign_id: '',
        report_date: new Date().toISOString().split('T')[0],
        description: '',
        user_id: formData.user_id, // Keep the user_id
      });
    } catch (err) {
      console.error('Error submitting report:', err);
      setError('Failed to submit the report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="report-page-container">
        <div className="report-header">
          <h1>Report an Issue</h1>
          <p>If you notice an issue with a campaign, please report it here.</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label htmlFor="campaign_id">Campaign ID:</label>
            <input
              type="number"
              id="campaign_id"
              name="campaign_id"
              value={formData.campaign_id}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="report_date">Report Date:</label>
            <input
              type="date"
              id="report_date"
              name="report_date"
              value={formData.report_date}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter the details of the issue"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;
