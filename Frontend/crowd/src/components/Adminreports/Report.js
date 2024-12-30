import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './report.css'; // You can style this just like the CampaignList
import AdminNavbar from '../../pages/Adminnavbar';

const AdminReportList = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching reports data
    axios.get('http://127.0.0.1:8000/reportsall/')
      .then((response) => setReports(response.data))
      .catch((error) => {
        console.error('Error fetching reports:', error);
        setError('Failed to fetch reports.');
      });
  }, []);

  const handleUpdateClick = (report) => {
    navigate('/update-report', { state: { report } }); // Navigate with the report data
  };

  const handleDeleteClick = async (report_id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/reports/${report_id}`);
      alert('Report deleted successfully!');
      setReports(reports.filter(report => report.report_id !== report_id));
    } catch (error) {
      alert('Error deleting report: ' + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div>
    <AdminNavbar/>
    <div>
      <h1>Reports</h1>
      {error && <div className="error">{error}</div>}
      <div className="reports-list">
        {reports.map((report) => (
          <div key={report.report_id} className="report-card">
            <h3>Report #{report.report_id}</h3>
            <p>Campaign ID: {report.campaign_id}</p>
            <p>Date: {new Date(report.report_date).toLocaleDateString()}</p>
            <p>Description: {report.description}</p>
            {/* <button onClick={() => handleUpdateClick(report)}>Update</button>
            <button onClick={() => handleDeleteClick(report.report_id)}>Delete</button> */}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AdminReportList;
