import apiClient from './apiClient';

/**
 * Notification Service
 * Handles all notification-related operations
 */

// Get user notifications
export const getUserNotifications = async (userId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 20,
      offset: options.offset || 0,
      unreadOnly: options.unreadOnly || false,
      ...options
    };
    
    const response = await apiClient.get(`/users/${userId}/notifications`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await apiClient.patch(`/notifications/${notificationId}`, {
      read: true
    });
    return response.data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (userId) => {
  try {
    const response = await apiClient.post(`/users/${userId}/notifications/mark-all-read`);
    return response.data;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

// Delete notification
export const deleteNotification = async (notificationId) => {
  try {
    const response = await apiClient.delete(`/notifications/${notificationId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};

// Create notification
export const createNotification = async (notificationData) => {
  try {
    const response = await apiClient.post('/notifications', notificationData);
    return response.data;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

// Get notification preferences
export const getNotificationPreferences = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/notification-preferences`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notification preferences:', error);
    throw error;
  }
};

// Update notification preferences
export const updateNotificationPreferences = async (userId, preferences) => {
  try {
    const response = await apiClient.patch(`/users/${userId}/notification-preferences`, preferences);
    return response.data;
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    throw error;
  }
};

// Get unread notification count
export const getUnreadNotificationCount = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/notifications/unread-count`);
    return response.data.count;
  } catch (error) {
    console.error('Error fetching unread notification count:', error);
    throw error;
  }
};

// Subscribe to real-time notifications
export const subscribeToNotifications = (userId, callback) => {
  // This would typically connect to a WebSocket or similar real-time service
  // For now, we'll simulate with periodic polling
  const interval = setInterval(async () => {
    try {
      const notifications = await getUserNotifications(userId, { unreadOnly: true });
      if (notifications.length > 0) {
        callback(notifications);
      }
    } catch (error) {
      console.error('Error in notification subscription:', error);
    }
  }, 30000); // Check every 30 seconds
  
  // Return cleanup function
  return () => clearInterval(interval);
};

export default {
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  createNotification,
  getNotificationPreferences,
  updateNotificationPreferences,
  getUnreadNotificationCount,
  subscribeToNotifications
};