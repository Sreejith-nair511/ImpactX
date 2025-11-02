import { useState, useEffect, useCallback } from 'react';
import * as feedbackService from '../services/feedbackService';

/**
 * Custom hook for managing user feedback
 * @param {string} userId - User ID
 * @returns {object} Feedback management functions and state
 */
export const useFeedback = (userId) => {
  const [feedback, setFeedback] = useState([]);
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch user feedback
   */
  const fetchFeedback = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await feedbackService.getUserFeedback(userId);
      setFeedback(data);
    } catch (err) {
      setError(err.message || 'Failed to load feedback');
      console.error('Error fetching feedback:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Fetch feedback statistics
   */
  const fetchStats = useCallback(async () => {
    try {
      const data = await feedbackService.getFeedbackStats();
      setStats(data);
    } catch (err) {
      console.error('Error fetching feedback stats:', err);
    }
  }, []);

  /**
   * Fetch feedback categories
   */
  const fetchCategories = useCallback(async () => {
    try {
      const data = await feedbackService.getFeedbackCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching feedback categories:', err);
    }
  }, []);

  /**
   * Submit feedback
   * @param {object} feedbackData - Feedback data
   */
  const submitFeedback = useCallback(async (feedbackData) => {
    try {
      const newFeedback = await feedbackService.submitFeedback(feedbackData);
      setFeedback(prev => [newFeedback, ...prev]);
      return newFeedback;
    } catch (err) {
      setError(err.message || 'Failed to submit feedback');
      console.error('Error submitting feedback:', err);
      throw err;
    }
  }, []);

  /**
   * Get feedback by type
   * @param {string} type - Feedback type
   * @param {object} options - Query options
   * @returns {Promise<Array>} Feedback by type
   */
  const getFeedbackByType = useCallback(async (type, options = {}) => {
    try {
      const data = await feedbackService.getFeedbackByType(type, options);
      return data;
    } catch (err) {
      console.error('Error fetching feedback by type:', err);
      return [];
    }
  }, []);

  /**
   * Get recent feedback
   * @param {object} options - Query options
   * @returns {Promise<Array>} Recent feedback
   */
  const getRecentFeedback = useCallback(async (options = {}) => {
    try {
      const data = await feedbackService.getRecentFeedback(options);
      return data;
    } catch (err) {
      console.error('Error fetching recent feedback:', err);
      return [];
    }
  }, []);

  /**
   * Search feedback
   * @param {string} query - Search query
   * @param {object} options - Search options
   * @returns {Promise<Array>} Search results
   */
  const searchFeedback = useCallback(async (query, options = {}) => {
    try {
      const results = await feedbackService.searchFeedback(query, options);
      return results;
    } catch (err) {
      setError(err.message || 'Failed to search feedback');
      console.error('Error searching feedback:', err);
      return [];
    }
  }, []);

  /**
   * Get feedback responses
   * @param {string} feedbackId - Feedback ID
   * @returns {Promise<Array>} Feedback responses
   */
  const getFeedbackResponses = useCallback(async (feedbackId) => {
    try {
      const responses = await feedbackService.getFeedbackResponses(feedbackId);
      return responses;
    } catch (err) {
      console.error('Error fetching feedback responses:', err);
      return [];
    }
  }, []);

  /**
   * Add feedback response
   * @param {string} feedbackId - Feedback ID
   * @param {object} responseData - Response data
   */
  const addFeedbackResponse = useCallback(async (feedbackId, responseData) => {
    try {
      const response = await feedbackService.addFeedbackResponse(feedbackId, responseData);
      
      // Update local state
      setFeedback(prev => 
        prev.map(fb => 
          fb.id === feedbackId 
            ? { 
                ...fb, 
                responses: fb.responses ? [...fb.responses, response] : [response],
                responseCount: (fb.responseCount || 0) + 1
              } 
            : fb
        )
      );
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to add feedback response');
      console.error('Error adding feedback response:', err);
      throw err;
    }
  }, []);

  /**
   * Get feedback trends
   * @param {object} options - Query options
   * @returns {Promise<object>} Feedback trends
   */
  const getFeedbackTrends = useCallback(async (options = {}) => {
    try {
      const trends = await feedbackService.getFeedbackTrends(options);
      return trends;
    } catch (err) {
      console.error('Error fetching feedback trends:', err);
      return null;
    }
  }, []);

  /**
   * Get feedback sentiment
   * @param {object} options - Query options
   * @returns {Promise<object>} Feedback sentiment analysis
   */
  const getFeedbackSentiment = useCallback(async (options = {}) => {
    try {
      const sentiment = await feedbackService.getFeedbackSentiment(options);
      return sentiment;
    } catch (err) {
      console.error('Error fetching feedback sentiment:', err);
      return null;
    }
  }, []);

  /**
   * Delete feedback
   * @param {string} feedbackId - Feedback ID
   */
  const deleteFeedback = useCallback(async (feedbackId) => {
    try {
      await feedbackService.deleteFeedback(feedbackId);
      setFeedback(prev => prev.filter(fb => fb.id !== feedbackId));
    } catch (err) {
      setError(err.message || 'Failed to delete feedback');
      console.error('Error deleting feedback:', err);
      throw err;
    }
  }, []);

  /**
   * Update feedback
   * @param {string} feedbackId - Feedback ID
   * @param {object} updateData - Update data
   */
  const updateFeedback = useCallback(async (feedbackId, updateData) => {
    try {
      const updatedFeedback = await feedbackService.updateFeedback(feedbackId, updateData);
      setFeedback(prev => 
        prev.map(fb => 
          fb.id === feedbackId ? updatedFeedback : fb
        )
      );
      return updatedFeedback;
    } catch (err) {
      setError(err.message || 'Failed to update feedback');
      console.error('Error updating feedback:', err);
      throw err;
    }
  }, []);

  /**
   * Get feedback notifications
   * @param {object} options - Query options
   * @returns {Promise<Array>} Feedback notifications
   */
  const getNotifications = useCallback(async (options = {}) => {
    try {
      const notifications = await feedbackService.getFeedbackNotifications(options);
      return notifications;
    } catch (err) {
      console.error('Error fetching feedback notifications:', err);
      return [];
    }
  }, []);

  /**
   * Mark feedback notification as read
   * @param {string} notificationId - Notification ID
   */
  const markNotificationAsRead = useCallback(async (notificationId) => {
    try {
      await feedbackService.markFeedbackNotificationAsRead(notificationId);
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  }, []);

  /**
   * Export feedback
   * @param {object} options - Export options
   * @returns {Promise<object>} Exported feedback
   */
  const exportFeedback = useCallback(async (options = {}) => {
    try {
      const exported = await feedbackService.exportFeedback(options);
      return exported;
    } catch (err) {
      setError(err.message || 'Failed to export feedback');
      console.error('Error exporting feedback:', err);
      throw err;
    }
  }, []);

  // Fetch feedback, stats, and categories on mount and when userId changes
  useEffect(() => {
    if (userId) {
      fetchFeedback();
      fetchStats();
      fetchCategories();
    }
  }, [userId, fetchFeedback, fetchStats, fetchCategories]);

  return {
    feedback,
    stats,
    categories,
    loading,
    error,
    fetchFeedback,
    submitFeedback,
    getFeedbackByType,
    getRecentFeedback,
    searchFeedback,
    getFeedbackResponses,
    addFeedbackResponse,
    getFeedbackTrends,
    getFeedbackSentiment,
    deleteFeedback,
    updateFeedback,
    getNotifications,
    markNotificationAsRead,
    exportFeedback
  };
};

export default useFeedback;