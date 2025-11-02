/**
 * Achievements service for managing user achievements and certifications
 */

import api from './apiClient';

/**
 * Get user achievements
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} User achievements
 */
export const getUserAchievements = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/achievements`, {
      params: options
    });
    return response.achievements || [];
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    throw error;
  }
};

/**
 * Add a new achievement
 * @param {string} userId - User ID
 * @param {object} achievementData - Achievement data
 * @returns {Promise<object>} Added achievement
 */
export const addAchievement = async (userId, achievementData) => {
  try {
    const response = await api.post(`/users/${userId}/achievements`, achievementData);
    return response;
  } catch (error) {
    console.error('Error adding achievement:', error);
    throw error;
  }
};

/**
 * Update an achievement
 * @param {string} userId - User ID
 * @param {string} achievementId - Achievement ID
 * @param {object} achievementData - Updated achievement data
 * @returns {Promise<object>} Updated achievement
 */
export const updateAchievement = async (userId, achievementId, achievementData) => {
  try {
    const response = await api.put(`/users/${userId}/achievements/${achievementId}`, achievementData);
    return response;
  } catch (error) {
    console.error('Error updating achievement:', error);
    throw error;
  }
};

/**
 * Remove an achievement
 * @param {string} userId - User ID
 * @param {string} achievementId - Achievement ID
 * @returns {Promise<object>} Remove response
 */
export const removeAchievement = async (userId, achievementId) => {
  try {
    const response = await api.delete(`/users/${userId}/achievements/${achievementId}`);
    return response;
  } catch (error) {
    console.error('Error removing achievement:', error);
    throw error;
  }
};

/**
 * Get achievement details
 * @param {string} userId - User ID
 * @param {string} achievementId - Achievement ID
 * @returns {Promise<object>} Achievement details
 */
export const getAchievement = async (userId, achievementId) => {
  try {
    const response = await api.get(`/users/${userId}/achievements/${achievementId}`);
    return response;
  } catch (error) {
    console.error('Error fetching achievement:', error);
    throw error;
  }
};

/**
 * Get achievement types
 * @returns {Promise<Array>} Achievement types
 */
export const getAchievementTypes = async () => {
  try {
    const response = await api.get('/achievements/types');
    return response.types || [];
  } catch (error) {
    console.error('Error fetching achievement types:', error);
    throw error;
  }
};

/**
 * Search achievements
 * @param {string} query - Search query
 * @param {object} options - Search options
 * @returns {Promise<Array>} Search results
 */
export const searchAchievements = async (query, options = {}) => {
  try {
    const response = await api.get('/achievements/search', {
      params: {
        q: query,
        ...options
      }
    });
    return response.achievements || [];
  } catch (error) {
    console.error('Error searching achievements:', error);
    throw error;
  }
};

/**
 * Get popular achievements
 * @param {object} options - Query options
 * @returns {Promise<Array>} Popular achievements
 */
export const getPopularAchievements = async (options = {}) => {
  try {
    const response = await api.get('/achievements/popular', {
      params: options
    });
    return response.achievements || [];
  } catch (error) {
    console.error('Error fetching popular achievements:', error);
    throw error;
  }
};

/**
 * Verify achievement
 * @param {string} userId - User ID
 * @param {string} achievementId - Achievement ID
 * @param {object} verificationData - Verification data
 * @returns {Promise<object>} Verification response
 */
export const verifyAchievement = async (userId, achievementId, verificationData) => {
  try {
    const response = await api.post(`/users/${userId}/achievements/${achievementId}/verify`, verificationData);
    return response;
  } catch (error) {
    console.error('Error verifying achievement:', error);
    throw error;
  }
};

/**
 * Get achievement verification status
 * @param {string} userId - User ID
 * @param {string} achievementId - Achievement ID
 * @returns {Promise<object>} Verification status
 */
export const getVerificationStatus = async (userId, achievementId) => {
  try {
    const response = await api.get(`/users/${userId}/achievements/${achievementId}/verification`);
    return response;
  } catch (error) {
    console.error('Error fetching verification status:', error);
    throw error;
  }
};

/**
 * Get achievement badges
 * @param {string} userId - User ID
 * @returns {Promise<Array>} User badges
 */
export const getUserBadges = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/badges`);
    return response.badges || [];
  } catch (error) {
    console.error('Error fetching user badges:', error);
    throw error;
  }
};

/**
 * Award badge
 * @param {string} userId - User ID
 * @param {object} badgeData - Badge data
 * @returns {Promise<object>} Awarded badge
 */
export const awardBadge = async (userId, badgeData) => {
  try {
    const response = await api.post(`/users/${userId}/badges`, badgeData);
    return response;
  } catch (error) {
    console.error('Error awarding badge:', error);
    throw error;
  }
};

/**
 * Get badge details
 * @param {string} badgeId - Badge ID
 * @returns {Promise<object>} Badge details
 */
export const getBadge = async (badgeId) => {
  try {
    const response = await api.get(`/badges/${badgeId}`);
    return response;
  } catch (error) {
    console.error('Error fetching badge:', error);
    throw error;
  }
};

/**
 * Get badge categories
 * @returns {Promise<Array>} Badge categories
 */
export const getBadgeCategories = async () => {
  try {
    const response = await api.get('/badges/categories');
    return response.categories || [];
  } catch (error) {
    console.error('Error fetching badge categories:', error);
    throw error;
  }
};

/**
 * Get achievement statistics
 * @param {string} userId - User ID
 * @returns {Promise<object>} Achievement statistics
 */
export const getAchievementStats = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/achievements/stats`);
    return response;
  } catch (error) {
    console.error('Error fetching achievement stats:', error);
    throw error;
  }
};

/**
 * Get recent achievements
 * @param {object} options - Query options
 * @returns {Promise<Array>} Recent achievements
 */
export const getRecentAchievements = async (options = {}) => {
  try {
    const response = await api.get('/achievements/recent', {
      params: options
    });
    return response.achievements || [];
  } catch (error) {
    console.error('Error fetching recent achievements:', error);
    throw error;
  }
};

/**
 * Import achievements from external sources
 * @param {string} userId - User ID
 * @param {object} importData - Import data
 * @returns {Promise<object>} Import response
 */
export const importAchievements = async (userId, importData) => {
  try {
    const response = await api.post(`/users/${userId}/achievements/import`, importData);
    return response;
  } catch (error) {
    console.error('Error importing achievements:', error);
    throw error;
  }
};

// Default export
export default {
  getUserAchievements,
  addAchievement,
  updateAchievement,
  removeAchievement,
  getAchievement,
  getAchievementTypes,
  searchAchievements,
  getPopularAchievements,
  verifyAchievement,
  getVerificationStatus,
  getUserBadges,
  awardBadge,
  getBadge,
  getBadgeCategories,
  getAchievementStats,
  getRecentAchievements,
  importAchievements
};