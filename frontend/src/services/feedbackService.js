/**
 * Feedback service for managing user feedback and reviews
 */

import api from './apiClient';

/**
 * Submit feedback
 * @param {object} feedbackData - Feedback data
 * @returns {Promise<object>} Submitted feedback
 */
export const submitFeedback = async (feedbackData) => {
  try {
    const response = await api.post('/feedback', feedbackData);
    return response;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

/**
 * Get user feedback
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} User feedback
 */
export const getUserFeedback = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/feedback`, {
      params: options
    });
    return response.feedback || [];
  } catch (error) {
    console.error('Error fetching user feedback:', error);
    throw error;
  }
};

/**
 * Get feedback by type
 * @param {string} type - Feedback type
 * @param {object} options - Query options
 * @returns {Promise<Array>} Feedback by type
 */
export const getFeedbackByType = async (type, options = {}) => {
  try {
    const response = await api.get('/feedback/type', {
      params: {
        type,
        ...options
      }
    });
    return response.feedback || [];
  } catch (error) {
    console.error('Error fetching feedback by type:', error);
    throw error;
  }
};

/**
 * Get feedback statistics
 * @param {object} options - Query options
 * @returns {Promise<object>} Feedback statistics
 */
export const getFeedbackStats = async (options = {}) => {
  try {
    const response = await api.get('/feedback/stats', {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching feedback stats:', error);
    throw error;
  }
};

/**
 * Get recent feedback
 * @param {object} options - Query options
 * @returns {Promise<Array>} Recent feedback
 */
export const getRecentFeedback = async (options = {}) => {
  try {
    const response = await api.get('/feedback/recent', {
      params: options
    });
    return response.feedback || [];
  } catch (error) {
    console.error('Error fetching recent feedback:', error);
    throw error;
  }
};

/**
 * Get feedback categories
 * @returns {Promise<Array>} Feedback categories
 */
export const getFeedbackCategories = async () => {
  try {
    const response = await api.get('/feedback/categories');
    return response.categories || [];
  } catch (error) {
    console.error('Error fetching feedback categories:', error);
    throw error;
  }
};

/**
 * Get feedback by category
 * @param {string} category - Feedback category
 * @param {object} options - Query options
 * @returns {Promise<Array>} Feedback by category
 */
export const getFeedbackByCategory = async (category, options = {}) => {
  try {
    const response = await api.get('/feedback/category', {
      params: {
        category,
        ...options
      }
    });
    return response.feedback || [];
  } catch (error) {
    console.error('Error fetching feedback by category:', error);
    throw error;
  }
};

/**
 * Search feedback
 * @param {string} query - Search query
 * @param {object} options - Search options
 * @returns {Promise<Array>} Search results
 */
export const searchFeedback = async (query, options = {}) => {
  try {
    const response = await api.get('/feedback/search', {
      params: {
        q: query,
        ...options
      }
    });
    return response.feedback || [];
  } catch (error) {
    console.error('Error searching feedback:', error);
    throw error;
  }
};

/**
 * Get feedback responses
 * @param {string} feedbackId - Feedback ID
 * @returns {Promise<Array>} Feedback responses
 */
export const getFeedbackResponses = async (feedbackId) => {
  try {
    const response = await api.get(`/feedback/${feedbackId}/responses`);
    return response.responses || [];
  } catch (error) {
    console.error('Error fetching feedback responses:', error);
    throw error;
  }
};

/**
 * Add feedback response
 * @param {string} feedbackId - Feedback ID
 * @param {object} responseData - Response data
 * @returns {Promise<object>} Added response
 */
export const addFeedbackResponse = async (feedbackId, responseData) => {
  try {
    const response = await api.post(`/feedback/${feedbackId}/responses`, responseData);
    return response;
  } catch (error) {
    console.error('Error adding feedback response:', error);
    throw error;
  }
};

/**
 * Get user feedback responses
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} User feedback responses
 */
export const getUserFeedbackResponses = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/feedback/responses`, {
      params: options
    });
    return response.responses || [];
  } catch (error) {
    console.error('Error fetching user feedback responses:', error);
    throw error;
  }
};

/**
 * Get feedback trends
 * @param {object} options - Query options
 * @returns {Promise<object>} Feedback trends
 */
export const getFeedbackTrends = async (options = {}) => {
  try {
    const response = await api.get('/feedback/trends', {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching feedback trends:', error);
    throw error;
  }
};

/**
 * Get feedback sentiment
 * @param {object} options - Query options
 * @returns {Promise<object>} Feedback sentiment analysis
 */
export const getFeedbackSentiment = async (options = {}) => {
  try {
    const response = await api.get('/feedback/sentiment', {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching feedback sentiment:', error);
    throw error;
  }
};

/**
 * Export feedback
 * @param {object} options - Export options
 * @returns {Promise<object>} Exported feedback
 */
export const exportFeedback = async (options = {}) => {
  try {
    const response = await api.get('/feedback/export', {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error exporting feedback:', error);
    throw error;
  }
};

/**
 * Import feedback
 * @param {object} importData - Import data
 * @returns {Promise<object>} Import response
 */
export const importFeedback = async (importData) => {
  try {
    const response = await api.post('/feedback/import', importData);
    return response;
  } catch (error) {
    console.error('Error importing feedback:', error);
    throw error;
  }
};

/**
 * Delete feedback
 * @param {string} feedbackId - Feedback ID
 * @returns {Promise<object>} Delete response
 */
export const deleteFeedback = async (feedbackId) => {
  try {
    const response = await api.delete(`/feedback/${feedbackId}`);
    return response;
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw error;
  }
};

/**
 * Update feedback
 * @param {string} feedbackId - Feedback ID
 * @param {object} updateData - Update data
 * @returns {Promise<object>} Updated feedback
 */
export const updateFeedback = async (feedbackId, updateData) => {
  try {
    const response = await api.put(`/feedback/${feedbackId}`, updateData);
    return response;
  } catch (error) {
    console.error('Error updating feedback:', error);
    throw error;
  }
};

/**
 * Get feedback notifications
 * @param {object} options - Query options
 * @returns {Promise<Array>} Feedback notifications
 */
export const getFeedbackNotifications = async (options = {}) => {
  try {
    const response = await api.get('/feedback/notifications', {
      params: options
    });
    return response.notifications || [];
  } catch (error) {
    console.error('Error fetching feedback notifications:', error);
    throw error;
  }
};

/**
 * Mark feedback notification as read
 * @param {string} notificationId - Notification ID
 * @returns {Promise<object>} Read status
 */
export const markFeedbackNotificationAsRead = async (notificationId) => {
  try {
    const response = await api.post(`/feedback/notifications/${notificationId}/read`);
    return response;
  } catch (error) {
    console.error('Error marking feedback notification as read:', error);
    throw error;
  }
};

// Default export
export default {
  submitFeedback,
  getUserFeedback,
  getFeedbackByType,
  getFeedbackStats,
  getRecentFeedback,
  getFeedbackCategories,
  getFeedbackByCategory,
  searchFeedback,
  getFeedbackResponses,
  addFeedbackResponse,
  getUserFeedbackResponses,
  getFeedbackTrends,
  getFeedbackSentiment,
  exportFeedback,
  importFeedback,
  deleteFeedback,
  updateFeedback,
  getFeedbackNotifications,
  markFeedbackNotificationAsRead
};