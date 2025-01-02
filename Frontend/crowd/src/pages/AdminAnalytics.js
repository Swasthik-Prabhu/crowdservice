import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement, // Import for Pie charts
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2"; // Import Pie chart
import "./AdminAnalytics.css";

// Register required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/admin/analytics");
        setAnalytics(response.data);
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
    completed_campaigns,
    active_campaigns,
    pending_milestones,
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

  const barChartData = {
    labels: ["Completed Campaigns", "Active Campaigns", "Pending Milestones"],
    datasets: [
      {
        label: "Campaign Insights",
        data: [completed_campaigns, active_campaigns, pending_milestones],
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
      },
    ],
  };

  const pieChartData = {
    labels: ["Total Donations", "Total Campaigns", "Total Beneficiaries", "Total Users"],
    datasets: [
      {
        data: [total_donations, total_campaigns, total_beneficiaries, total_users],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const additionalInsightsPieChart = {
    labels: ["Most Popular Campaign", "Average Donation", "Max Donation"],
    datasets: [
      {
        data: [most_popular_campaign ? 1 : 0, average_donation, max_donation_amount],
        backgroundColor: ["#FFD700", "#ADFF2F", "#FF4500"],
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="analytics-container">
      <h1>Admin Analytics Dashboard</h1>

      <div className="analytics-charts">
        <h2>Overview</h2>
        <Pie data={pieChartData} options={pieChartOptions} />
      </div>

      <div className="analytics-cards">
        <div className="card">
          <h2>Total Donations</h2>
          <p>${total_donations}</p>
        </div>
        <div className="card">
          <h2>Total Campaigns</h2>
          <p>{total_campaigns}</p>
        </div>
        <div className="card">
          <h2>Total Beneficiaries</h2>
          <p>{total_beneficiaries}</p>
        </div>
        <div className="card">
          <h2>Total Users</h2>
          <p>{total_users}</p>
        </div>
      </div>

      <div className="highlighted-section">
        <h2>Top Campaign</h2>
        <p>{top_campaign}</p>
        <h3>Total Donations: ${top_campaign_donations}</h3>
      </div>

      <div className="analytics-charts">
        <h2>Campaign Insights</h2>
        <Bar data={barChartData} options={barChartOptions} />
      </div>

      <div className="analytics-charts">
        <h2>Additional Insights</h2>
        <Pie data={additionalInsightsPieChart} options={pieChartOptions} />
      </div>
    </div>
  );
};

export default AdminAnalytics;
