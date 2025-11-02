/**
 * Endorsements service for managing user skill endorsements
 */

import api from './apiClient';

/**
 * Get user endorsements
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<object>} User endorsements
 */
export const getUserEndorsements = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/endorsements`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching user endorsements:', error);
    throw error;
  }
};

/**
 * Add endorsement
 * @param {string} userId - User ID
 * @param {object} endorsementData - Endorsement data
 * @returns {Promise<object>} Added endorsement
 */
export const addEndorsement = async (userId, endorsementData) => {
  try {
    const response = await api.post(`/users/${userId}/endorsements`, endorsementData);
    return response;
  } catch (error) {
    console.error('Error adding endorsement:', error);
    throw error;
  }
};

/**
 * Remove endorsement
 * @param {string} userId - User ID
 * @param {string} endorsementId - Endorsement ID
 * @returns {Promise<object>} Remove response
 */
export const removeEndorsement = async (userId, endorsementId) => {
  try {
    const response = await api.delete(`/users/${userId}/endorsements/${endorsementId}`);
    return response;
  } catch (error) {
    console.error('Error removing endorsement:', error);
    throw error;
  }
};

/**
 * Get endorsement details
 * @param {string} userId - User ID
 * @param {string} endorsementId - Endorsement ID
 * @returns {Promise<object>} Endorsement details
 */
export const getEndorsement = async (userId, endorsementId) => {
  try {
    const response = await api.get(`/users/${userId}/endorsements/${endorsementId}`);
    return response;
  } catch (error) {
    console.error('Error fetching endorsement:', error);
    throw error;
  }
};

/**
 * Get endorsements by skill
 * @param {string} userId - User ID
 * @param {string} skillId - Skill ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} Endorsements for skill
 */
export const getEndorsementsBySkill = async (userId, skillId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/skills/${skillId}/endorsements`, {
      params: options
    });
    return response.endorsements || [];
  } catch (error) {
    console.error('Error fetching endorsements by skill:', error);
    throw error;
  }
};

/**
 * Search endorsements
 * @param {string} query - Search query
 * @param {object} options - Search options
 * @returns {Promise<Array>} Search results
 */
export const searchEndorsements = async (query, options = {}) => {
  try {
    const response = await api.get('/endorsements/search', {
      params: {
        q: query,
        ...options
      }
    });
    return response.endorsements || [];
  } catch (error) {
    console.error('Error searching endorsements:', error);
    throw error;
  }
};

/**
 * Get recent endorsements
 * @param {object} options - Query options
 * @returns {Promise<Array>} Recent endorsements
 */
export const getRecentEndorsements = async (options = {}) => {
  try {
    const response = await api.get('/endorsements/recent', {
      params: options
    });
    return response.endorsements || [];
  } catch (error) {
    console.error('Error fetching recent endorsements:', error);
    throw error;
  }
};

/**
 * Get endorsement statistics
 * @param {string} userId - User ID
 * @returns {Promise<object>} Endorsement statistics
 */
export const getEndorsementStats = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/endorsements/stats`);
    return response;
  } catch (error) {
    console.error('Error fetching endorsement stats:', error);
    throw error;
  }
};

/**
 * Get top endorsers
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} Top endorsers
 */
export const getTopEndorsers = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/endorsements/top-endorsers`, {
      params: options
    });
    return response.endorsers || [];
  } catch (error) {
    console.error('Error fetching top endorsers:', error);
    throw error;
  }
};

/**
 * Get endorsed skills
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} Endorsed skills
 */
export const getEndorsedSkills = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/endorsements/skills`, {
      params: options
    });
    return response.skills || [];
  } catch (error) {
    console.error('Error fetching endorsed skills:', error);
    throw error;
  }
};

/**
 * Get mutual endorsements
 * @param {string} userId - User ID
 * @param {string} targetUserId - Target user ID
 * @returns {Promise<object>} Mutual endorsements
 */
export const getMutualEndorsements = async (userId, targetUserId) => {
  try {
    const response = await api.get(`/users/${userId}/endorsements/mutual/${targetUserId}`);
    return response;
  } catch (error) {
    console.error('Error fetching mutual endorsements:', error);
    throw error;
  }
};

/**
 * Endorse multiple skills
 * @param {string} userId - User ID
 * @param {object} endorsementData - Endorsement data with multiple skills
 * @returns {Promise<object>} Endorsement response
 */
export const endorseMultipleSkills = async (userId, endorsementData) => {
  try {
    const response = await api.post(`/users/${userId}/endorsements/batch`, endorsementData);
    return response;
  } catch (error) {
    console.error('Error endorsing multiple skills:', error);
    throw error;
  }
};

/**
 * Get endorsement notifications
 * @param {object} options - Query options
 * @returns {Promise<Array>} Endorsement notifications
 */
export const getEndorsementNotifications = async (options = {}) => {
  try {
    const response = await api.get('/endorsements/notifications', {
      params: options
    });
    return response.notifications || [];
  } catch (error) {
    console.error('Error fetching endorsement notifications:', error);
    throw error;
  }
};

/**
 * Mark endorsement notification as read
 * @param {string} notificationId - Notification ID
 * @returns {Promise<object>} Read status
 */
export const markEndorsementNotificationAsRead = async (notificationId) => {
  try {
    const response = await api.post(`/endorsements/notifications/${notificationId}/read`);
    return response;
  } catch (error) {
    console.error('Error marking endorsement notification as read:', error);
    throw error;
  }
};

/**
 * Get endorsement trends
 * @param {object} options - Query options
 * @returns {Promise<object>} Endorsement trends
 */
export const getEndorsementTrends = async (options = {}) => {
  try {
    const response = await api.get('/endorsements/trends', {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching endorsement trends:', error);
    throw error;
  }
};

// Default export
export default {
  getUserEndorsements,
  addEndorsement,
  removeEndorsement,
  getEndorsement,
  getEndorsementsBySkill,
  searchEndorsements,
  getRecentEndorsements,
  getEndorsementStats,
  getTopEndorsers,
  getEndorsedSkills,
  getMutualEndorsements,
  endorseMultipleSkills,
  getEndorsementNotifications,
  markEndorsementNotificationAsRead,
  getEndorsementTrends
};