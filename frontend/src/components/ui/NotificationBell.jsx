import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, Check, Settings } from 'lucide-react';
import useNotifications from '../../hooks/useNotifications';
import './NotificationBell.css';

/**
 * Notification Bell Component
 * Displays a notification bell with unread count and dropdown menu
 */
const NotificationBell = ({ userId, className = '', onNotificationClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const bellRef = useRef(null);
  
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    loading,
    error
  } = useNotifications(userId, { limit: 5 });
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && 
          !dropdownRef.current.contains(event.target) &&
          bellRef.current && 
          !bellRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);
  
  // Format notification time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Handle notification click
  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    setIsOpen(false);
  };
  
  if (!userId) {
    return null;
  }
  
  return (
    <div className={`notification-bell ${className}`} ref={bellRef}>
      <button
        className={`notification-bell__trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Notifications (${unreadCount} unread)`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="notification-bell__badge">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div 
          className="notification-bell__dropdown"
          ref={dropdownRef}
          role="menu"
          aria-label="Notifications"
        >
          <div className="notification-bell__header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button 
                className="notification-bell__mark-all"
                onClick={markAllAsRead}
                aria-label="Mark all as read"
              >
                <Check size={16} />
                Mark all as read
              </button>
            )}
          </div>
          
          {loading && (
            <div className="notification-bell__loading">
              Loading notifications...
            </div>
          )}
          
          {error && (
            <div className="notification-bell__error">
              Error loading notifications: {error}
            </div>
          )}
          
          {!loading && !error && notifications.length === 0 && (
            <div className="notification-bell__empty">
              No notifications
            </div>
          )}
          
          {!loading && !error && notifications.length > 0 && (
            <ul className="notification-bell__list" role="menu">
              {notifications.map((notification) => (
                <li 
                  key={notification.id} 
                  className={`notification-bell__item ${notification.read ? 'read' : 'unread'}`}
                >
                  <button
                    className="notification-bell__item-content"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="notification-bell__item-header">
                      <strong>{notification.title}</strong>
                      {!notification.read && (
                        <span className="notification-bell__unread-indicator" />
                      )}
                    </div>
                    <p className="notification-bell__item-message">
                      {notification.message}
                    </p>
                    <div className="notification-bell__item-footer">
                      <span className="notification-bell__item-time">
                        {formatTime(notification.createdAt)}
                      </span>
                      <button
                        className="notification-bell__item-delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        aria-label={`Delete notification: ${notification.title}`}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
          
          <div className="notification-bell__footer">
            <button className="notification-bell__settings">
              <Settings size={16} />
              Notification Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;