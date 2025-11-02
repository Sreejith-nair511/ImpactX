import { useState, useEffect, useCallback } from 'react';
import * as dashboardService from '../services/dashboardService';

/**
 * Custom hook for managing user dashboard
 * @param {string} userId - User ID
 * @returns {object} Dashboard management functions and state
 */
export const useDashboard = (userId) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [stats, setStats] = useState(null);
  const [activityFeed, setActivityFeed] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [widgets, setWidgets] = useState([]);
  const [layout, setLayout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch user dashboard data
   */
  const fetchDashboardData = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await dashboardService.getUserDashboardData(userId);
      setDashboardData(data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Fetch dashboard statistics
   */
  const fetchStats = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await dashboardService.getDashboardStats(userId);
      setStats(data);
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    }
  }, [userId]);

  /**
   * Fetch user activity feed
   */
  const fetchActivityFeed = useCallback(async (options = {}) => {
    if (!userId) return;
    
    try {
      const data = await dashboardService.getUserActivityFeed(userId, options);
      setActivityFeed(data);
    } catch (err) {
      console.error('Error fetching activity feed:', err);
    }
  }, [userId]);

  /**
   * Fetch recent activity
   */
  const fetchRecentActivity = useCallback(async (options = {}) => {
    if (!userId) return;
    
    try {
      const data = await dashboardService.getRecentActivity(userId, options);
      setActivityFeed(prev => [...data, ...prev.slice(0, 20)]); // Limit to 20 items
    } catch (err) {
      console.error('Error fetching recent activity:', err);
    }
  }, [userId]);

  /**
   * Fetch dashboard notifications
   */
  const fetchNotifications = useCallback(async (options = {}) => {
    if (!userId) return;
    
    try {
      const data = await dashboardService.getDashboardNotifications(userId, options);
      setNotifications(data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  }, [userId]);

  /**
   * Mark notification as read
   * @param {string} notificationId - Notification ID
   */
  const markNotificationAsRead = useCallback(async (notificationId) => {
    if (!userId) return;
    
    try {
      await dashboardService.markNotificationAsRead(userId, notificationId);
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, isRead: true } 
            : notification
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  }, [userId]);

  /**
   * Fetch user recommendations
   */
  const fetchRecommendations = useCallback(async (options = {}) => {
    if (!userId) return;
    
    try {
      const data = await dashboardService.getUserRecommendations(userId, options);
      setRecommendations(data);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
    }
  }, [userId]);

  /**
   * Fetch dashboard widgets
   */
  const fetchWidgets = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await dashboardService.getDashboardWidgets(userId);
      setWidgets(data);
    } catch (err) {
      console.error('Error fetching dashboard widgets:', err);
    }
  }, [userId]);

  /**
   * Update dashboard widget
   * @param {string} widgetId - Widget ID
   * @param {object} widgetData - Widget data
   */
  const updateWidget = useCallback(async (widgetId, widgetData) => {
    if (!userId) return;
    
    try {
      const response = await dashboardService.updateDashboardWidget(userId, widgetId, widgetData);
      
      // Update local state
      setWidgets(prev => 
        prev.map(widget => 
          widget.id === widgetId ? response.widget : widget
        )
      );
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to update widget');
      console.error('Error updating widget:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Fetch dashboard layout
   */
  const fetchLayout = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await dashboardService.getDashboardLayout(userId);
      setLayout(data);
    } catch (err) {
      console.error('Error fetching dashboard layout:', err);
    }
  }, [userId]);

  /**
   * Update dashboard layout
   * @param {object} layoutData - Layout data
   */
  const updateLayout = useCallback(async (layoutData) => {
    if (!userId) return;
    
    try {
      const response = await dashboardService.updateDashboardLayout(userId, layoutData);
      setLayout(response.layout);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to update layout');
      console.error('Error updating layout:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Get user insights
   * @param {object} options - Query options
   * @returns {Promise<object>} User insights
   */
  const getUserInsights = useCallback(async (options = {}) => {
    if (!userId) return null;
    
    try {
      const insights = await dashboardService.getUserInsights(userId, options);
      return insights;
    } catch (err) {
      console.error('Error fetching user insights:', err);
      return null;
    }
  }, [userId]);

  /**
   * Get impact metrics
   * @param {object} options - Query options
   * @returns {Promise<object>} Impact metrics
   */
  const getImpactMetrics = useCallback(async (options = {}) => {
    if (!userId) return null;
    
    try {
      const metrics = await dashboardService.getImpactMetrics(userId, options);
      return metrics;
    } catch (err) {
      console.error('Error fetching impact metrics:', err);
      return null;
    }
  }, [userId]);

  /**
   * Get engagement metrics
   * @param {object} options - Query options
   * @returns {Promise<object>} Engagement metrics
   */
  const getEngagementMetrics = useCallback(async (options = {}) => {
    if (!userId) return null;
    
    try {
      const metrics = await dashboardService.getEngagementMetrics(userId, options);
      return metrics;
    } catch (err) {
      console.error('Error fetching engagement metrics:', err);
      return null;
    }
  }, [userId]);

  /**
   * Get productivity metrics
   * @param {object} options - Query options
   * @returns {Promise<object>} Productivity metrics
   */
  const getProductivityMetrics = useCallback(async (options = {}) => {
    if (!userId) return null;
    
    try {
      const metrics = await dashboardService.getProductivityMetrics(userId, options);
      return metrics;
    } catch (err) {
      console.error('Error fetching productivity metrics:', err);
      return null;
    }
  }, [userId]);

  /**
   * Get trending projects
   * @param {object} options - Query options
   * @returns {Promise<Array>} Trending projects
   */
  const getTrendingProjects = useCallback(async (options = {}) => {
    try {
      const projects = await dashboardService.getTrendingProjects(options);
      return projects;
    } catch (err) {
      console.error('Error fetching trending projects:', err);
      return [];
    }
  }, []);

  /**
   * Get trending users
   * @param {object} options - Query options
   * @returns {Promise<Array>} Trending users
   */
  const getTrendingUsers = useCallback(async (options = {}) => {
    try {
      const users = await dashboardService.getTrendingUsers(options);
      return users;
    } catch (err) {
      console.error('Error fetching trending users:', err);
      return [];
    }
  }, []);

  /**
   * Get platform announcements
   * @param {object} options - Query options
   * @returns {Promise<Array>} Platform announcements
   */
  const getPlatformAnnouncements = useCallback(async (options = {}) => {
    try {
      const announcements = await dashboardService.getPlatformAnnouncements(options);
      return announcements;
    } catch (err) {
      console.error('Error fetching platform announcements:', err);
      return [];
    }
  }, []);

  /**
   * Dismiss platform announcement
   * @param {string} announcementId - Announcement ID
   */
  const dismissAnnouncement = useCallback(async (announcementId) => {
    try {
      await dashboardService.dismissAnnouncement(announcementId);
    } catch (err) {
      console.error('Error dismissing announcement:', err);
    }
  }, []);

  // Fetch dashboard data, stats, activity feed, notifications, recommendations, widgets, and layout on mount and when userId changes
  useEffect(() => {
    if (userId) {
      fetchDashboardData();
      fetchStats();
      fetchActivityFeed();
      fetchNotifications();
      fetchRecommendations();
      fetchWidgets();
      fetchLayout();
    }
  }, [
    userId,
    fetchDashboardData,
    fetchStats,
    fetchActivityFeed,
    fetchNotifications,
    fetchRecommendations,
    fetchWidgets,
    fetchLayout
  ]);

  return {
    dashboardData,
    stats,
    activityFeed,
    notifications,
    recommendations,
    widgets,
    layout,
    loading,
    error,
    fetchDashboardData,
    fetchStats,
    fetchActivityFeed,
    fetchRecentActivity,
    fetchNotifications,
    markNotificationAsRead,
    fetchRecommendations,
    fetchWidgets,
    updateWidget,
    fetchLayout,
    updateLayout,
    getUserInsights,
    getImpactMetrics,
    getEngagementMetrics,
    getProductivityMetrics,
    getTrendingProjects,
    getTrendingUsers,
    getPlatformAnnouncements,
    dismissAnnouncement
  };
};

export default useDashboard;