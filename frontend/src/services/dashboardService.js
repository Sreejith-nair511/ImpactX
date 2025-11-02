/**
 * Dashboard service for managing user dashboard data and analytics
 */

import api from './apiClient';

/**
 * Get user dashboard data
 * @param {string} userId - User ID
 * @returns {Promise<object>} Dashboard data
 */
export const getUserDashboardData = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/dashboard`);
    return response;
  } catch (error) {
    console.error('Error fetching user dashboard data:', error);
    throw error;
  }
};

/**
 * Get dashboard statistics
 * @param {string} userId - User ID
 * @returns {Promise<object>} Dashboard statistics
 */
export const getDashboardStats = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/dashboard/stats`);
    return response;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

/**
 * Get user activity feed
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} Activity feed
 */
export const getUserActivityFeed = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/dashboard/activity`, {
      params: options
    });
    return response.activities || [];
  } catch (error) {
    console.error('Error fetching user activity feed:', error);
    throw error;
  }
};

/**
 * Get recent user activity
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} Recent activity
 */
export const getRecentActivity = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/dashboard/recent-activity`, {
      params: options
    });
    return response.activities || [];
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    throw error;
  }
};

/**
 * Get dashboard notifications
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} Dashboard notifications
 */
export const getDashboardNotifications = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/dashboard/notifications`, {
      params: options
    });
    return response.notifications || [];
  } catch (error) {
    console.error('Error fetching dashboard notifications:', error);
    throw error;
  }
};

/**
 * Mark dashboard notification as read
 * @param {string} userId - User ID
 * @param {string} notificationId - Notification ID
 * @returns {Promise<object>} Read status
 */
export const markNotificationAsRead = async (userId, notificationId) => {
  try {
    const response = await api.post(`/users/${userId}/dashboard/notifications/${notificationId}/read`);
    return response;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

/**
 * Get user recommendations
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} User recommendations
 */
export const getUserRecommendations = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/dashboard/recommendations`, {
      params: options
    });
    return response.recommendations || [];
  } catch (error) {
    console.error('Error fetching user recommendations:', error);
    throw error;
  }
};

/**
 * Get trending projects
 * @param {object} options - Query options
 * @returns {Promise<Array>} Trending projects
 */
export const getTrendingProjects = async (options = {}) => {
  try {
    const response = await api.get('/dashboard/trending-projects', {
      params: options
    });
    return response.projects || [];
  } catch (error) {
    console.error('Error fetching trending projects:', error);
    throw error;
  }
};

/**
 * Get trending users
 * @param {object} options - Query options
 * @returns {Promise<Array>} Trending users
 */
export const getTrendingUsers = async (options = {}) => {
  try {
    const response = await api.get('/dashboard/trending-users', {
      params: options
    });
    return response.users || [];
  } catch (error) {
    console.error('Error fetching trending users:', error);
    throw error;
  }
};

/**
 * Get platform announcements
 * @param {object} options - Query options
 * @returns {Promise<Array>} Platform announcements
 */
export const getPlatformAnnouncements = async (options = {}) => {
  try {
    const response = await api.get('/dashboard/announcements', {
      params: options
    });
    return response.announcements || [];
  } catch (error) {
    console.error('Error fetching platform announcements:', error);
    throw error;
  }
};

/**
 * Dismiss platform announcement
 * @param {string} announcementId - Announcement ID
 * @returns {Promise<object>} Dismiss response
 */
export const dismissAnnouncement = async (announcementId) => {
  try {
    const response = await api.post(`/dashboard/announcements/${announcementId}/dismiss`);
    return response;
  } catch (error) {
    console.error('Error dismissing announcement:', error);
    throw error;
  }
};

/**
 * Get user insights
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<object>} User insights
 */
export const getUserInsights = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/dashboard/insights`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching user insights:', error);
    throw error;
  }
};

/**
 * Get impact metrics
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<object>} Impact metrics
 */
export const getImpactMetrics = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/dashboard/impact-metrics`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching impact metrics:', error);
    throw error;
  }
};

/**
 * Get engagement metrics
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<object>} Engagement metrics
 */
export const getEngagementMetrics = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/dashboard/engagement-metrics`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching engagement metrics:', error);
    throw error;
  }
};

/**
 * Get productivity metrics
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<object>} Productivity metrics
 */
export const getProductivityMetrics = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/dashboard/productivity-metrics`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching productivity metrics:', error);
    throw error;
  }
};

/**
 * Get dashboard widgets
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Dashboard widgets
 */
export const getDashboardWidgets = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/dashboard/widgets`);
    return response.widgets || [];
  } catch (error) {
    console.error('Error fetching dashboard widgets:', error);
    throw error;
  }
};

/**
 * Update dashboard widget
 * @param {string} userId - User ID
 * @param {string} widgetId - Widget ID
 * @param {object} widgetData - Widget data
 * @returns {Promise<object>} Updated widget
 */
export const updateDashboardWidget = async (userId, widgetId, widgetData) => {
  try {
    const response = await api.put(`/users/${userId}/dashboard/widgets/${widgetId}`, widgetData);
    return response;
  } catch (error) {
    console.error('Error updating dashboard widget:', error);
    throw error;
  }
};

/**
 * Get dashboard layout
 * @param {string} userId - User ID
 * @returns {Promise<object} Dashboard layout
 */
export const getDashboardLayout = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/dashboard/layout`);
    return response;
  } catch (error) {
    console.error('Error fetching dashboard layout:', error);
    throw error;
  }
};

/**
 * Update dashboard layout
 * @param {string} userId - User ID
 * @param {object} layoutData - Layout data
 * @returns {Promise<object>} Updated layout
 */
export const updateDashboardLayout = async (userId, layoutData) => {
  try {
    const response = await api.put(`/users/${userId}/dashboard/layout`, layoutData);
    return response;
  } catch (error) {
    console.error('Error updating dashboard layout:', error);
    throw error;
  }
};

// Default export
export default {
  getUserDashboardData,
  getDashboardStats,
  getUserActivityFeed,
  getRecentActivity,
  getDashboardNotifications,
  markNotificationAsRead,
  getUserRecommendations,
  getTrendingProjects,
  getTrendingUsers,
  getPlatformAnnouncements,
  dismissAnnouncement,
  getUserInsights,
  getImpactMetrics,
  getEngagementMetrics,
  getProductivityMetrics,
  getDashboardWidgets,
  updateDashboardWidget,
  getDashboardLayout,
  updateDashboardLayout
};