import apiClient from './apiClient';

/**
 * Resource Management Service
 * Handles all resource allocation and management operations
 */

// Get project resources
export const getResources = async (projectId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 50,
      offset: options.offset || 0,
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/resources`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
};

// Create a new resource
export const createResource = async (projectId, resourceData) => {
  try {
    const response = await apiClient.post(`/projects/${projectId}/resources`, resourceData);
    return response.data;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error;
  }
};

// Update a resource
export const updateResource = async (projectId, resourceId, resourceData) => {
  try {
    const response = await apiClient.put(`/projects/${projectId}/resources/${resourceId}`, resourceData);
    return response.data;
  } catch (error) {
    console.error('Error updating resource:', error);
    throw error;
  }
};

// Delete a resource
export const deleteResource = async (projectId, resourceId) => {
  try {
    const response = await apiClient.delete(`/projects/${projectId}/resources/${resourceId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting resource:', error);
    throw error;
  }
};

// Allocate resources to tasks
export const allocateResources = async (projectId, allocationData) => {
  try {
    const response = await apiClient.post(`/projects/${projectId}/resource-allocations`, allocationData);
    return response.data;
  } catch (error) {
    console.error('Error allocating resources:', error);
    throw error;
  }
};

// Get resource utilization report
export const getResourceUtilization = async (projectId, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || '30d',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/resource-utilization`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching resource utilization:', error);
    throw error;
  }
};

// Get resource forecasting
export const getResourceForecast = async (projectId, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || '90d',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/resource-forecast`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching resource forecast:', error);
    throw error;
  }
};

export default {
  getResources,
  createResource,
  updateResource,
  deleteResource,
  allocateResources,
  getResourceUtilization,
  getResourceForecast
};