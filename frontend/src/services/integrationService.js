/**
 * Integration service for managing third-party integrations and platform connectivity
 */

import api from './apiClient';

/**
 * Get available integrations
 * @returns {Promise<Array>} Available integrations
 */
export const getAvailableIntegrations = async () => {
  try {
    const response = await api.get('/integrations');
    return response.integrations || [];
  } catch (error) {
    console.error('Error fetching available integrations:', error);
    throw error;
  }
};

/**
 * Get user integrations
 * @param {string} userId - User ID
 * @returns {Promise<Array>} User integrations
 */
export const getUserIntegrations = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/integrations`);
    return response.integrations || [];
  } catch (error) {
    console.error('Error fetching user integrations:', error);
    throw error;
  }
};

/**
 * Connect integration
 * @param {string} userId - User ID
 * @param {string} integrationId - Integration ID
 * @param {object} credentials - Integration credentials
 * @returns {Promise<object>} Connection response
 */
export const connectIntegration = async (userId, integrationId, credentials) => {
  try {
    const response = await api.post(`/users/${userId}/integrations/${integrationId}/connect`, {
      credentials
    });
    return response;
  } catch (error) {
    console.error('Error connecting integration:', error);
    throw error;
  }
};

/**
 * Disconnect integration
 * @param {string} userId - User ID
 * @param {string} integrationId - Integration ID
 * @returns {Promise<object>} Disconnection response
 */
export const disconnectIntegration = async (userId, integrationId) => {
  try {
    const response = await api.post(`/users/${userId}/integrations/${integrationId}/disconnect`);
    return response;
  } catch (error) {
    console.error('Error disconnecting integration:', error);
    throw error;
  }
};

/**
 * Get integration status
 * @param {string} userId - User ID
 * @param {string} integrationId - Integration ID
 * @returns {Promise<object>} Integration status
 */
export const getIntegrationStatus = async (userId, integrationId) => {
  try {
    const response = await api.get(`/users/${userId}/integrations/${integrationId}/status`);
    return response;
  } catch (error) {
    console.error('Error fetching integration status:', error);
    throw error;
  }
};

/**
 * Sync integration data
 * @param {string} userId - User ID
 * @param {string} integrationId - Integration ID
 * @param {object} options - Sync options
 * @returns {Promise<object>} Sync response
 */
export const syncIntegrationData = async (userId, integrationId, options = {}) => {
  try {
    const response = await api.post(`/users/${userId}/integrations/${integrationId}/sync`, options);
    return response;
  } catch (error) {
    console.error('Error syncing integration data:', error);
    throw error;
  }
};

/**
 * Get integration data
 * @param {string} userId - User ID
 * @param {string} integrationId - Integration ID
 * @param {object} options - Query options
 * @returns {Promise<object>} Integration data
 */
export const getIntegrationData = async (userId, integrationId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/integrations/${integrationId}/data`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching integration data:', error);
    throw error;
  }
};

/**
 * Update integration settings
 * @param {string} userId - User ID
 * @param {string} integrationId - Integration ID
 * @param {object} settings - Integration settings
 * @returns {Promise<object>} Updated settings
 */
export const updateIntegrationSettings = async (userId, integrationId, settings) => {
  try {
    const response = await api.put(`/users/${userId}/integrations/${integrationId}/settings`, settings);
    return response;
  } catch (error) {
    console.error('Error updating integration settings:', error);
    throw error;
  }
};

/**
 * Get integration logs
 * @param {string} userId - User ID
 * @param {string} integrationId - Integration ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} Integration logs
 */
export const getIntegrationLogs = async (userId, integrationId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/integrations/${integrationId}/logs`, {
      params: options
    });
    return response.logs || [];
  } catch (error) {
    console.error('Error fetching integration logs:', error);
    throw error;
  }
};

/**
 * Get integration metrics
 * @param {string} userId - User ID
 * @param {string} integrationId - Integration ID
 * @param {object} options - Query options
 * @returns {Promise<object>} Integration metrics
 */
export const getIntegrationMetrics = async (userId, integrationId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/integrations/${integrationId}/metrics`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching integration metrics:', error);
    throw error;
  }
};

/**
 * Test integration connection
 * @param {string} userId - User ID
 * @param {string} integrationId - Integration ID
 * @param {object} credentials - Test credentials
 * @returns {Promise<object>} Test response
 */
export const testIntegrationConnection = async (userId, integrationId, credentials) => {
  try {
    const response = await api.post(`/users/${userId}/integrations/${integrationId}/test`, {
      credentials
    });
    return response;
  } catch (error) {
    console.error('Error testing integration connection:', error);
    throw error;
  }
};

/**
 * Get integration categories
 * @returns {Promise<Array>} Integration categories
 */
export const getIntegrationCategories = async () => {
  try {
    const response = await api.get('/integrations/categories');
    return response.categories || [];
  } catch (error) {
    console.error('Error fetching integration categories:', error);
    throw error;
  }
};

/**
 * Search integrations
 * @param {string} query - Search query
 * @param {object} options - Search options
 * @returns {Promise<Array>} Search results
 */
export const searchIntegrations = async (query, options = {}) => {
  try {
    const response = await api.get('/integrations/search', {
      params: {
        q: query,
        ...options
      }
    });
    return response.integrations || [];
  } catch (error) {
    console.error('Error searching integrations:', error);
    throw error;
  }
};

/**
 * Get popular integrations
 * @param {object} options - Query options
 * @returns {Promise<Array>} Popular integrations
 */
export const getPopularIntegrations = async (options = {}) => {
  try {
    const response = await api.get('/integrations/popular', {
      params: options
    });
    return response.integrations || [];
  } catch (error) {
    console.error('Error fetching popular integrations:', error);
    throw error;
  }
};

/**
 * Get integration documentation
 * @param {string} integrationId - Integration ID
 * @returns {Promise<object>} Integration documentation
 */
export const getIntegrationDocumentation = async (integrationId) => {
  try {
    const response = await api.get(`/integrations/${integrationId}/documentation`);
    return response;
  } catch (error) {
    console.error('Error fetching integration documentation:', error);
    throw error;
  }
};

/**
 * Get integration notifications
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} Integration notifications
 */
export const getIntegrationNotifications = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/integrations/notifications`, {
      params: options
    });
    return response.notifications || [];
  } catch (error) {
    console.error('Error fetching integration notifications:', error);
    throw error;
  }
};

/**
 * Mark integration notification as read
 * @param {string} userId - User ID
 * @param {string} notificationId - Notification ID
 * @returns {Promise<object>} Read status
 */
export const markIntegrationNotificationAsRead = async (userId, notificationId) => {
  try {
    const response = await api.post(`/users/${userId}/integrations/notifications/${notificationId}/read`);
    return response;
  } catch (error) {
    console.error('Error marking integration notification as read:', error);
    throw error;
  }
};

/**
 * Get integration webhook URL
 * @param {string} userId - User ID
 * @param {string} integrationId - Integration ID
 * @returns {Promise<object>} Webhook URL
 */
export const getIntegrationWebhookUrl = async (userId, integrationId) => {
  try {
    const response = await api.get(`/users/${userId}/integrations/${integrationId}/webhook`);
    return response;
  } catch (error) {
    console.error('Error fetching integration webhook URL:', error);
    throw error;
  }
};

/**
 * Regenerate integration webhook URL
 * @param {string} userId - User ID
 * @param {string} integrationId - Integration ID
 * @returns {Promise<object>} New webhook URL
 */
export const regenerateIntegrationWebhookUrl = async (userId, integrationId) => {
  try {
    const response = await api.post(`/users/${userId}/integrations/${integrationId}/webhook/regenerate`);
    return response;
  } catch (error) {
    console.error('Error regenerating integration webhook URL:', error);
    throw error;
  }
};

// Default export
export default {
  getAvailableIntegrations,
  getUserIntegrations,
  connectIntegration,
  disconnectIntegration,
  getIntegrationStatus,
  syncIntegrationData,
  getIntegrationData,
  updateIntegrationSettings,
  getIntegrationLogs,
  getIntegrationMetrics,
  testIntegrationConnection,
  getIntegrationCategories,
  searchIntegrations,
  getPopularIntegrations,
  getIntegrationDocumentation,
  getIntegrationNotifications,
  markIntegrationNotificationAsRead,
  getIntegrationWebhookUrl,
  regenerateIntegrationWebhookUrl
};