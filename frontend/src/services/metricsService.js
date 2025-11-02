import apiClient from './apiClient';

/**
 * Metrics Service
 * Handles all metrics-related operations
 */

// Get user metrics
export const getUserMetrics = async (userId, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || '30d',
      ...options
    };
    
    const response = await apiClient.get(`/users/${userId}/metrics`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching user metrics:', error);
    throw error;
  }
};

// Get project metrics
export const getProjectMetrics = async (projectId, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || '30d',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/metrics`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching project metrics:', error);
    throw error;
  }
};

// Get team metrics
export const getTeamMetrics = async (teamId, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || '30d',
      ...options
    };
    
    const response = await apiClient.get(`/teams/${teamId}/metrics`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching team metrics:', error);
    throw error;
  }
};

// Get organization metrics
export const getOrganizationMetrics = async (orgId, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || '30d',
      ...options
    };
    
    const response = await apiClient.get(`/organizations/${orgId}/metrics`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching organization metrics:', error);
    throw error;
  }
};

// Get dashboard metrics
export const getDashboardMetrics = async (userId, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || '30d',
      ...options
    };
    
    const response = await apiClient.get(`/users/${userId}/dashboard-metrics`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    throw error;
  }
};

// Get metrics history
export const getMetricsHistory = async (entityId, entityType, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || '30d',
      interval: options.interval || '1d',
      ...options
    };
    
    const response = await apiClient.get(`/metrics/${entityType}/${entityId}/history`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching metrics history:', error);
    throw error;
  }
};

// Get comparative metrics
export const getComparativeMetrics = async (userId, options = {}) => {
  try {
    const params = {
      compareWith: options.compareWith || 'peer-group',
      timeframe: options.timeframe || '30d',
      ...options
    };
    
    const response = await apiClient.get(`/users/${userId}/comparative-metrics`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching comparative metrics:', error);
    throw error;
  }
};

// Get metrics benchmarks
export const getMetricsBenchmarks = async (userId, options = {}) => {
  try {
    const params = {
      category: options.category || 'all',
      ...options
    };
    
    const response = await apiClient.get(`/users/${userId}/metrics-benchmarks`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching metrics benchmarks:', error);
    throw error;
  }
};

// Set metrics goals
export const setMetricsGoals = async (userId, goals) => {
  try {
    const response = await apiClient.post(`/users/${userId}/metrics-goals`, { goals });
    return response.data;
  } catch (error) {
    console.error('Error setting metrics goals:', error);
    throw error;
  }
};

// Get metrics goals
export const getMetricsGoals = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/metrics-goals`);
    return response.data;
  } catch (error) {
    console.error('Error fetching metrics goals:', error);
    throw error;
  }
};

// Export metrics
export const exportMetrics = async (userId, format = 'csv', options = {}) => {
  try {
    const params = {
      format,
      timeframe: options.timeframe || '30d',
      ...options
    };
    
    const response = await apiClient.get(`/users/${userId}/export-metrics`, { 
      params,
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('Error exporting metrics:', error);
    throw error;
  }
};

export default {
  getUserMetrics,
  getProjectMetrics,
  getTeamMetrics,
  getOrganizationMetrics,
  getDashboardMetrics,
  getMetricsHistory,
  getComparativeMetrics,
  getMetricsBenchmarks,
  setMetricsGoals,
  getMetricsGoals,
  exportMetrics
};