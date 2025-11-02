import { useState, useEffect, useCallback } from 'react';
import * as notificationService from '../services/notificationService';

/**
 * Custom hook for managing user notifications
 * @param {string} userId - The ID of the user
 * @param {Object} options - Configuration options
 * @returns {Object} Notification state and actions
 */
export const useNotifications = (userId, options = {}) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preferences, setPreferences] = useState({});
  
  // Fetch notifications
  const fetchNotifications = useCallback(async (fetchOptions = {}) => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await notificationService.getUserNotifications(userId, fetchOptions);
      setNotifications(data.notifications || data);
    } catch (err) {
      setError(err.message || 'Failed to fetch notifications');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);
  
  // Fetch unread count
  const fetchUnreadCount = useCallback(async () => {
    if (!userId) return;
    
    try {
      const count = await notificationService.getUnreadNotificationCount(userId);
      setUnreadCount(count);
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  }, [userId]);
  
  // Mark notification as read
  const markAsRead = useCallback(async (notificationId) => {
    try {
      await notificationService.markNotificationAsRead(notificationId);
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true } 
            : notification
        )
      );
      
      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  }, []);
  
  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    try {
      await notificationService.markAllNotificationsAsRead(userId);
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  }, [userId]);
  
  // Delete notification
  const deleteNotification = useCallback(async (notificationId) => {
    try {
      await notificationService.deleteNotification(notificationId);
      
      // Update local state
      setNotifications(prev => 
        prev.filter(notification => notification.id !== notificationId)
      );
      
      // Update unread count if the deleted notification was unread
      const notification = notifications.find(n => n.id === notificationId);
      if (notification && !notification.read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  }, [notifications]);
  
  // Fetch notification preferences
  const fetchPreferences = useCallback(async () => {
    if (!userId) return;
    
    try {
      const prefs = await notificationService.getNotificationPreferences(userId);
      setPreferences(prefs);
    } catch (err) {
      console.error('Error fetching notification preferences:', err);
    }
  }, [userId]);
  
  // Update notification preferences
  const updatePreferences = useCallback(async (newPreferences) => {
    try {
      const updatedPrefs = await notificationService.updateNotificationPreferences(userId, newPreferences);
      setPreferences(updatedPrefs);
    } catch (err) {
      console.error('Error updating notification preferences:', err);
      throw err;
    }
  }, [userId]);
  
  // Create a new notification
  const createNotification = useCallback(async (notificationData) => {
    try {
      const newNotification = await notificationService.createNotification(notificationData);
      setNotifications(prev => [newNotification, ...prev]);
      return newNotification;
    } catch (err) {
      console.error('Error creating notification:', err);
      throw err;
    }
  }, []);
  
  // Subscribe to real-time notifications
  useEffect(() => {
    if (!userId) return;
    
    // Fetch initial data
    fetchNotifications(options);
    fetchUnreadCount();
    fetchPreferences();
    
    // Set up real-time subscription
    const unsubscribe = notificationService.subscribeToNotifications(userId, (newNotifications) => {
      setNotifications(prev => [...newNotifications, ...prev]);
      setUnreadCount(prev => prev + newNotifications.length);
    });
    
    // Cleanup subscription
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userId, fetchNotifications, fetchUnreadCount, fetchPreferences]);
  
  return {
    // State
    notifications,
    unreadCount,
    loading,
    error,
    preferences,
    
    // Actions
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    fetchPreferences,
    updatePreferences,
    createNotification
  };
};

export default useNotifications;