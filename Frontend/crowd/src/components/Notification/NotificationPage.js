import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NotificationPage.css';  // Create this file for custom styles if needed.

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user details from local storage
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (userDetails && userDetails.user_id) {
      fetchNotifications(userDetails.user_id);
    } else {
      setError("User ID not found. Please sign in again.");
    }
  }, []);

  const fetchNotifications = async (userId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/notifications/notifications/${userId}`);
      setNotifications(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Failed to fetch notifications.';
      setError(errorMessage);
    }
  };

  return (
    <div className="notifications-container">
      <h2>Your Notifications</h2>
      {error && <p className="error">{error}</p>}
      <ul className="notification-list">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li key={notification.id} className={`notification-item ${notification.is_read ? 'read' : 'unread'}`}>
              <p><strong></strong> {notification.type}</p>
              <p><strong></strong> {notification.message}</p>
              {/* <p><strong>Timestamp:</strong> {new Date(notification.timestamp).toLocaleString()}</p> */}
            </li>
          ))
        ) : (
          <p>No notifications available.</p>
        )}
      </ul>
    </div>
  );
};

export default Notifications;
