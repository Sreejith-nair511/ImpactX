import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const NotificationContext = createContext();

/**
 * Notification Provider Component
 * Manages application notifications and provides context to children
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Add a new notification
  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info', // info, success, warning, error
      title: '',
      message: '',
      duration: 5000, // milliseconds
      ...notification
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
  }, []);

  // Remove a notification
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  // Clear all notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  );
};

/**
 * Hook to access notification context
 * @returns {Object} Notification context values and functions
 */
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

/**
 * Notification Container Component
 * Displays all active notifications
 */
const NotificationContainer = ({ notifications, onRemove }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-full max-w-sm">
      {notifications.map(notification => (
        <NotificationItem 
          key={notification.id} 
          notification={notification} 
          onRemove={onRemove} 
        />
      ))}
    </div>
  );
};

/**
 * Notification Item Component
 * Displays a single notification
 */
const NotificationItem = ({ notification, onRemove }) => {
  const { type, title, message } = notification;
  
  // Get icon and styling based on type
  const getIconAndStyle = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          bgClass: 'bg-green-50 dark:bg-green-900/30',
          borderClass: 'border-green-200 dark:border-green-800',
          textClass: 'text-green-800 dark:text-green-200'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
          bgClass: 'bg-yellow-50 dark:bg-yellow-900/30',
          borderClass: 'border-yellow-200 dark:border-yellow-800',
          textClass: 'text-yellow-800 dark:text-yellow-200'
        };
      case 'error':
        return {
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          bgClass: 'bg-red-50 dark:bg-red-900/30',
          borderClass: 'border-red-200 dark:border-red-800',
          textClass: 'text-red-800 dark:text-red-200'
        };
      default: // info
        return {
          icon: <Info className="h-5 w-5 text-blue-500" />,
          bgClass: 'bg-blue-50 dark:bg-blue-900/30',
          borderClass: 'border-blue-200 dark:border-blue-800',
          textClass: 'text-blue-800 dark:text-blue-200'
        };
    }
  };

  const { icon, bgClass, borderClass, textClass } = getIconAndStyle();

  return (
    <div className={`${bgClass} ${borderClass} ${textClass} border rounded-lg shadow-lg p-4 relative`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          {icon}
        </div>
        <div className="ml-3 w-0 flex-1">
          {title && (
            <h4 className="text-sm font-medium">{title}</h4>
          )}
          {message && (
            <p className="mt-1 text-sm opacity-90">{message}</p>
          )}
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={() => onRemove(notification.id)}
            className="rounded-md inline-flex text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationProvider;