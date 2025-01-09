import React, { useState, useEffect } from 'react';
import { Badge, Dropdown, Menu, Button } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import axios from 'axios';

const NotificationBadge = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const userDetails = JSON.parse(localStorage.getItem('userDetails')); // Retrieve user details
  const userId = userDetails ? userDetails.user_id : null;

  useEffect(() => {
    if (!userId) {
      console.error('No user ID found in local storage.');
      return;
    }
    
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`/api/notifications/${userId}`);
        setNotifications(response.data);
        const unread = response.data.filter(notification => !notification.is_read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error('Failed to fetch notifications', error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [userId]);

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`/api/notifications/${notificationId}/mark-read`);
      setNotifications((prev) =>
        prev.map(notification =>
          notification.id === notificationId ? { ...notification, is_read: true } : notification
        )
      );
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  };

  const renderNotificationMessage = (notification) => {
    switch (notification.type) {
      case 'new_campaign':
        return `New Campaign Created: ${notification.message}`;
      case 'campaign_update':
        return `Campaign Updated: ${notification.message}`;
      case 'new_donation':
        return `New Donation Received: ${notification.message}`;
      default:
        return notification.message;
    }
  };

  const menu = (
    <Menu>
      {notifications.length === 0 ? (
        <Menu.Item>No notifications</Menu.Item>
      ) : (
        notifications.map(notification => (
          <Menu.Item
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            style={{ backgroundColor: notification.is_read ? 'white' : '#f5f5f5' }}
          >
            {renderNotificationMessage(notification)}
          </Menu.Item>
        ))
      )}
    </Menu>
  );

  if (!userId) {
    return null; // Don't render if no user ID is found
  }

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Badge count={unreadCount}>
        <Button shape="circle" icon={<BellOutlined />} />
      </Badge>
    </Dropdown>
  );
};

export default NotificationBadge;
