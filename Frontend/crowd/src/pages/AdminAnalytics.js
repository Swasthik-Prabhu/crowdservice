import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "./AdminAnalytics.css";

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [campaignDonations, setCampaignDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/admin/analytics");
        setAnalytics(response.data);
        setCampaignDonations(response.data.campaign_donations || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div className="loading">Loading analytics...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const {
    total_donations,
    total_campaigns,
    total_beneficiaries,
    total_users,
    most_popular_campaign,
    average_donation,
    max_donation_amount,
    top_campaign,
    top_campaign_donations,
  } = analytics;

  return (
    <div className="analytics-container">
      <h1>Admin Analytics Dashboard</h1>

      <div className="analytics-cards">
        <div className="card-row">
          <div className="card" style={{ margin: "10px" }}>
            <h2>Total Donations</h2>
            <p>₹{total_donations}</p>
          </div>
          <div className="card" style={{ margin: "10px" }}>
            <h2>Total Campaigns</h2>
            <p>{total_campaigns}</p>
          </div>
          <div className="card" style={{ margin: "10px" }}>
            <h2>Total Beneficiaries</h2>
            <p>{total_beneficiaries}</p>
          </div>
        </div>
        <div className="card-row">
          <div className="card" style={{ margin: "10px" }}>
            <h2>Total Users</h2>
            <p>{total_users}</p>
          </div>
          <div className="card" style={{ margin: "10px" }}>
            <h2>Most Popular Campaign</h2>
            <p>{most_popular_campaign}</p>
          </div>
          <div className="card" style={{ margin: "10px" }}>
            <h2>Average Donation</h2>
            <p>₹{average_donation}</p>
          </div>
        </div>
        <div className="card-row">
          <div className="card" style={{ margin: "10px" }}>
            <h2>Max Donation Amount</h2>
            <p>₹{max_donation_amount}</p>
          </div>
          <div className="card" style={{ margin: "10px" }}>
            <h2>Top Campaign</h2>
            <p>{top_campaign}</p>
            <h3>Total Donations: ₹{top_campaign_donations}</h3>
          </div>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="chart-container">
        <h2>Donations by Campaign</h2>
        <ResponsiveContainer width="100%" height={400}>
        <BarChart data={campaignDonations} margin={{ top: 10, right: 30, left: 20, bottom: 100 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" angle={-45} textAnchor="end" tick={{ fill: '#ffff', fontSize: 14 }}/>
            <YAxis tick={{ fill: '#ffff', fontSize: 14 }}/>
            <Tooltip />
            <Bar dataKey="total_donations" fill="#8884d8" name="Total Donations" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminAnalytics;
