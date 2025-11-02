/**
 * Reports service for managing impact reports and analytics
 */

import api from './apiClient';

/**
 * Get impact report data
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<object>} Impact report data
 */
export const getImpactReport = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/reports/impact`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching impact report:', error);
    throw error;
  }
};

/**
 * Get project report data
 * @param {string} projectId - Project ID
 * @param {object} options - Query options
 * @returns {Promise<object>} Project report data
 */
export const getProjectReport = async (projectId, options = {}) => {
  try {
    const response = await api.get(`/projects/${projectId}/reports`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching project report:', error);
    throw error;
  }
};

/**
 * Get donor report data
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<object>} Donor report data
 */
export const getDonorReport = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/reports/donors`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching donor report:', error);
    throw error;
  }
};

/**
 * Get financial report data
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<object>} Financial report data
 */
export const getFinancialReport = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/reports/financial`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching financial report:', error);
    throw error;
  }
};

/**
 * Get performance report data
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<object>} Performance report data
 */
export const getPerformanceReport = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/reports/performance`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching performance report:', error);
    throw error;
  }
};

/**
 * Get partnership report data
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<object>} Partnership report data
 */
export const getPartnershipReport = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/reports/partnerships`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching partnership report:', error);
    throw error;
  }
};

/**
 * Generate custom report
 * @param {string} userId - User ID
 * @param {object} reportConfig - Report configuration
 * @returns {Promise<object>} Generated report
 */
export const generateCustomReport = async (userId, reportConfig) => {
  try {
    const response = await api.post(`/users/${userId}/reports/custom`, reportConfig);
    return response;
  } catch (error) {
    console.error('Error generating custom report:', error);
    throw error;
  }
};

/**
 * Export report
 * @param {string} reportId - Report ID
 * @param {string} format - Export format (pdf, csv, excel)
 * @returns {Promise<object>} Exported report
 */
export const exportReport = async (reportId, format = 'pdf') => {
  try {
    const response = await api.get(`/reports/${reportId}/export`, {
      params: { format },
      responseType: 'blob'
    });
    return response;
  } catch (error) {
    console.error('Error exporting report:', error);
    throw error;
  }
};

/**
 * Get report templates
 * @returns {Promise<Array>} Report templates
 */
export const getReportTemplates = async () => {
  try {
    const response = await api.get('/reports/templates');
    return response.templates || [];
  } catch (error) {
    console.error('Error fetching report templates:', error);
    throw error;
  }
};

/**
 * Create report template
 * @param {object} templateData - Template data
 * @returns {Promise<object>} Created template
 */
export const createReportTemplate = async (templateData) => {
  try {
    const response = await api.post('/reports/templates', templateData);
    return response;
  } catch (error) {
    console.error('Error creating report template:', error);
    throw error;
  }
};

/**
 * Update report template
 * @param {string} templateId - Template ID
 * @param {object} templateData - Updated template data
 * @returns {Promise<object>} Updated template
 */
export const updateReportTemplate = async (templateId, templateData) => {
  try {
    const response = await api.put(`/reports/templates/${templateId}`, templateData);
    return response;
  } catch (error) {
    console.error('Error updating report template:', error);
    throw error;
  }
};

/**
 * Delete report template
 * @param {string} templateId - Template ID
 * @returns {Promise<object>} Delete response
 */
export const deleteReportTemplate = async (templateId) => {
  try {
    const response = await api.delete(`/reports/templates/${templateId}`);
    return response;
  } catch (error) {
    console.error('Error deleting report template:', error);
    throw error;
  }
};

/**
 * Get report history
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} Report history
 */
export const getReportHistory = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/reports/history`, {
      params: options
    });
    return response.reports || [];
  } catch (error) {
    console.error('Error fetching report history:', error);
    throw error;
  }
};

/**
 * Get report analytics
 * @param {string} reportId - Report ID
 * @param {object} options - Query options
 * @returns {Promise<object>} Report analytics
 */
export const getReportAnalytics = async (reportId, options = {}) => {
  try {
    const response = await api.get(`/reports/${reportId}/analytics`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching report analytics:', error);
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
    const response = await api.get(`/users/${userId}/reports/impact-metrics`, {
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
    const response = await api.get(`/users/${userId}/reports/engagement-metrics`, {
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
    const response = await api.get(`/users/${userId}/reports/productivity-metrics`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching productivity metrics:', error);
    throw error;
  }
};

/**
 * Get trend analysis
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<object>} Trend analysis
 */
export const getTrendAnalysis = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/reports/trend-analysis`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching trend analysis:', error);
    throw error;
  }
};

/**
 * Get comparative analysis
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<object>} Comparative analysis
 */
export const getComparativeAnalysis = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/reports/comparative-analysis`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching comparative analysis:', error);
    throw error;
  }
};

/**
 * Get predictive analytics
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<object>} Predictive analytics
 */
export const getPredictiveAnalytics = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/reports/predictive-analytics`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching predictive analytics:', error);
    throw error;
  }
};

/**
 * Get report notifications
 * @param {object} options - Query options
 * @returns {Promise<Array>} Report notifications
 */
export const getReportNotifications = async (options = {}) => {
  try {
    const response = await api.get('/reports/notifications', {
      params: options
    });
    return response.notifications || [];
  } catch (error) {
    console.error('Error fetching report notifications:', error);
    throw error;
  }
};

/**
 * Mark report notification as read
 * @param {string} notificationId - Notification ID
 * @returns {Promise<object>} Read status
 */
export const markReportNotificationAsRead = async (notificationId) => {
  try {
    const response = await api.post(`/reports/notifications/${notificationId}/read`);
    return response;
  } catch (error) {
    console.error('Error marking report notification as read:', error);
    throw error;
  }
};

// Default export
export default {
  getImpactReport,
  getProjectReport,
  getDonorReport,
  getFinancialReport,
  getPerformanceReport,
  getPartnershipReport,
  generateCustomReport,
  exportReport,
  getReportTemplates,
  createReportTemplate,
  updateReportTemplate,
  deleteReportTemplate,
  getReportHistory,
  getReportAnalytics,
  getImpactMetrics,
  getEngagementMetrics,
  getProductivityMetrics,
  getTrendAnalysis,
  getComparativeAnalysis,
  getPredictiveAnalytics,
  getReportNotifications,
  markReportNotificationAsRead
};