/**
 * Preferences service for managing user preferences and settings
 */

import api from './apiClient';

/**
 * Get user preferences
 * @param {string} userId - User ID
 * @returns {Promise<object>} User preferences
 */
export const getUserPreferences = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/preferences`);
    return response;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    throw error;
  }
};

/**
 * Update user preferences
 * @param {string} userId - User ID
 * @param {object} preferences - Updated preferences
 * @returns {Promise<object>} Updated preferences
 */
export const updateUserPreferences = async (userId, preferences) => {
  try {
    const response = await api.put(`/users/${userId}/preferences`, preferences);
    return response;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw error;
  }
};

/**
 * Get notification preferences
 * @param {string} userId - User ID
 * @returns {Promise<object>} Notification preferences
 */
export const getNotificationPreferences = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/preferences/notifications`);
    return response;
  } catch (error) {
    console.error('Error fetching notification preferences:', error);
    throw error;
  }
};

/**
 * Update notification preferences
 * @param {string} userId - User ID
 * @param {object} preferences - Notification preferences
 * @returns {Promise<object>} Updated preferences
 */
export const updateNotificationPreferences = async (userId, preferences) => {
  try {
    const response = await api.put(`/users/${userId}/preferences/notifications`, preferences);
    return response;
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    throw error;
  }
};

/**
 * Get privacy preferences
 * @param {string} userId - User ID
 * @returns {Promise<object>} Privacy preferences
 */
export const getPrivacyPreferences = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/preferences/privacy`);
    return response;
  } catch (error) {
    console.error('Error fetching privacy preferences:', error);
    throw error;
  }
};

/**
 * Update privacy preferences
 * @param {string} userId - User ID
 * @param {object} preferences - Privacy preferences
 * @returns {Promise<object>} Updated preferences
 */
export const updatePrivacyPreferences = async (userId, preferences) => {
  try {
    const response = await api.put(`/users/${userId}/preferences/privacy`, preferences);
    return response;
  } catch (error) {
    console.error('Error updating privacy preferences:', error);
    throw error;
  }
};

/**
 * Get display preferences
 * @param {string} userId - User ID
 * @returns {Promise<object>} Display preferences
 */
export const getDisplayPreferences = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/preferences/display`);
    return response;
  } catch (error) {
    console.error('Error fetching display preferences:', error);
    throw error;
  }
};

/**
 * Update display preferences
 * @param {string} userId - User ID
 * @param {object} preferences - Display preferences
 * @returns {Promise<object>} Updated preferences
 */
export const updateDisplayPreferences = async (userId, preferences) => {
  try {
    const response = await api.put(`/users/${userId}/preferences/display`, preferences);
    return response;
  } catch (error) {
    console.error('Error updating display preferences:', error);
    throw error;
  }
};

/**
 * Get communication preferences
 * @param {string} userId - User ID
 * @returns {Promise<object>} Communication preferences
 */
export const getCommunicationPreferences = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/preferences/communication`);
    return response;
  } catch (error) {
    console.error('Error fetching communication preferences:', error);
    throw error;
  }
};

/**
 * Update communication preferences
 * @param {string} userId - User ID
 * @param {object} preferences - Communication preferences
 * @returns {Promise<object>} Updated preferences
 */
export const updateCommunicationPreferences = async (userId, preferences) => {
  try {
    const response = await api.put(`/users/${userId}/preferences/communication`, preferences);
    return response;
  } catch (error) {
    console.error('Error updating communication preferences:', error);
    throw error;
  }
};

/**
 * Get default preferences
 * @returns {Promise<object>} Default preferences
 */
export const getDefaultPreferences = async () => {
  try {
    const response = await api.get('/preferences/defaults');
    return response;
  } catch (error) {
    console.error('Error fetching default preferences:', error);
    throw error;
  }
};

/**
 * Reset preferences to defaults
 * @param {string} userId - User ID
 * @returns {Promise<object>} Reset response
 */
export const resetPreferences = async (userId) => {
  try {
    const response = await api.post(`/users/${userId}/preferences/reset`);
    return response;
  } catch (error) {
    console.error('Error resetting preferences:', error);
    throw error;
  }
};

/**
 * Get preference categories
 * @returns {Promise<Array>} Preference categories
 */
export const getPreferenceCategories = async () => {
  try {
    const response = await api.get('/preferences/categories');
    return response.categories || [];
  } catch (error) {
    console.error('Error fetching preference categories:', error);
    throw error;
  }
};

/**
 * Get preference options
 * @param {string} category - Preference category
 * @returns {Promise<Array>} Preference options
 */
export const getPreferenceOptions = async (category) => {
  try {
    const response = await api.get(`/preferences/options/${category}`);
    return response.options || [];
  } catch (error) {
    console.error('Error fetching preference options:', error);
    throw error;
  }
};

/**
 * Export preferences
 * @param {string} userId - User ID
 * @returns {Promise<object>} Exported preferences
 */
export const exportPreferences = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/preferences/export`);
    return response;
  } catch (error) {
    console.error('Error exporting preferences:', error);
    throw error;
  }
};

/**
 * Import preferences
 * @param {string} userId - User ID
 * @param {object} preferences - Preferences to import
 * @returns {Promise<object} Import response
 */
export const importPreferences = async (userId, preferences) => {
  try {
    const response = await api.post(`/users/${userId}/preferences/import`, preferences);
    return response;
  } catch (error) {
    console.error('Error importing preferences:', error);
    throw error;
  }
};

/**
 * Get preference history
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} Preference history
 */
export const getPreferenceHistory = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/preferences/history`, {
      params: options
    });
    return response.history || [];
  } catch (error) {
    console.error('Error fetching preference history:', error);
    throw error;
  }
};

// Default export
export default {
  getUserPreferences,
  updateUserPreferences,
  getNotificationPreferences,
  updateNotificationPreferences,
  getPrivacyPreferences,
  updatePrivacyPreferences,
  getDisplayPreferences,
  updateDisplayPreferences,
  getCommunicationPreferences,
  updateCommunicationPreferences,
  getDefaultPreferences,
  resetPreferences,
  getPreferenceCategories,
  getPreferenceOptions,
  exportPreferences,
  importPreferences,
  getPreferenceHistory
};