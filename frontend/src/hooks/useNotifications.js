import { useState, useEffect } from 'react';

/**
 * Custom hook for managing user notifications
 * @param {Array} initialNotifications - Initial notifications array
 * @returns {object} Notification management functions and state
 */
export const useNotifications = (initialNotifications = []) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(
    initialNotifications.filter(n => !n.read).length
  );

  // Update unread count when notifications change
  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  /**
   * Add a new notification
   * @param {object} notification - Notification object
   */
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  /**
   * Mark a notification as read
   * @param {number} id - Notification ID
   */
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  /**
   * Remove a notification
   * @param {number} id - Notification ID
   */
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  /**
   * Clear all notifications
   */
  const clearAll = () => {
    setNotifications([]);
  };

  /**
   * Get unread notifications
   * @returns {Array} Unread notifications
   */
  const getUnreadNotifications = () => {
    return notifications.filter(n => !n.read);
  };

  /**
   * Get read notifications
   * @returns {Array} Read notifications
   */
  const getReadNotifications = () => {
    return notifications.filter(n => n.read);
  };

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    getUnreadNotifications,
    getReadNotifications
  };
};

/**
 * Custom hook for handling notification permissions
 * @returns {object} Permission status and request function
 */
export const useNotificationPermission = () => {
  const [permission, setPermission] = useState('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
      return 'denied';
    }

    if (permission === 'granted') {
      return 'granted';
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  };

  return {
    permission,
    requestPermission,
    isSupported: 'Notification' in window
  };
};

/**
 * Custom hook for showing browser notifications
 * @param {boolean} enabled - Whether notifications are enabled
 * @returns {object} Show notification function
 */
export const useBrowserNotifications = (enabled = true) => {
  const { permission, requestPermission } = useNotificationPermission();

  const showNotification = async (title, options = {}) => {
    if (!enabled) return;
    
    if (permission !== 'granted') {
      const result = await requestPermission();
      if (result !== 'granted') return;
    }

    // Show browser notification
    if ('Notification' in window && permission === 'granted') {
      new Notification(title, {
        body: options.body || '',
        icon: options.icon || '',
        ...options
      });
    }

    // Also add to in-app notifications if callback provided
    if (options.onAddToApp) {
      options.onAddToApp({
        title,
        ...options
      });
    }
  };

  return {
    showNotification,
    permission,
    requestPermission
  };
};