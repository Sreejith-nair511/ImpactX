import apiClient from './apiClient';

/**
 * Resource Management Service
 * Handles all resource allocation and management operations
 */

// Get project resources
export const getProjectResources = async (projectId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 50,
      offset: options.offset || 0,
      status: options.status || 'all',
      category: options.category || 'all',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/resources`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching project resources:', error);
    throw error;
  }
};

// Get resource by ID
export const getResourceById = async (resourceId) => {
  try {
    const response = await apiClient.get(`/resources/${resourceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resource:', error);
    throw error;
  }
};

// Create resource
export const createResource = async (projectId, resourceData) => {
  try {
    const response = await apiClient.post(`/projects/${projectId}/resources`, resourceData);
    return response.data;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error;
  }
};

// Update resource
export const updateResource = async (resourceId, resourceData) => {
  try {
    const response = await apiClient.patch(`/resources/${resourceId}`, resourceData);
    return response.data;
  } catch (error) {
    console.error('Error updating resource:', error);
    throw error;
  }
};

// Delete resource
export const deleteResource = async (resourceId) => {
  try {
    const response = await apiClient.delete(`/resources/${resourceId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting resource:', error);
    throw error;
  }
};

// Allocate resource
export const allocateResource = async (resourceId, allocationData) => {
  try {
    const response = await apiClient.post(`/resources/${resourceId}/allocate`, allocationData);
    return response.data;
  } catch (error) {
    console.error('Error allocating resource:', error);
    throw error;
  }
};

// Deallocate resource
export const deallocateResource = async (allocationId) => {
  try {
    const response = await apiClient.post(`/resource-allocations/${allocationId}/deallocate`);
    return response.data;
  } catch (error) {
    console.error('Error deallocating resource:', error);
    throw error;
  }
};

// Get resource allocations
export const getResourceAllocations = async (resourceId) => {
  try {
    const response = await apiClient.get(`/resources/${resourceId}/allocations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resource allocations:', error);
    throw error;
  }
};

// Get resource categories
export const getResourceCategories = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}/resource-categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resource categories:', error);
    throw error;
  }
};

// Create resource category
export const createResourceCategory = async (projectId, categoryData) => {
  try {
    const response = await apiClient.post(`/projects/${projectId}/resource-categories`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating resource category:', error);
    throw error;
  }
};

// Update resource category
export const updateResourceCategory = async (categoryId, categoryData) => {
  try {
    const response = await apiClient.patch(`/resource-categories/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error updating resource category:', error);
    throw error;
  }
};

// Delete resource category
export const deleteResourceCategory = async (categoryId) => {
  try {
    const response = await apiClient.delete(`/resource-categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting resource category:', error);
    throw error;
  }
};

// Get resource inventory
export const getResourceInventory = async (projectId, options = {}) => {
  try {
    const params = {
      category: options.category || 'all',
      status: options.status || 'all',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/resource-inventory`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching resource inventory:', error);
    throw error;
  }
};

// Get resource utilization
export const getResourceUtilization = async (projectId, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || '30d',
      interval: options.interval || '1d',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/resource-utilization`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching resource utilization:', error);
    throw error;
  }
};

// Get resource requests
export const getResourceRequests = async (projectId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 50,
      offset: options.offset || 0,
      status: options.status || 'pending',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/resource-requests`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching resource requests:', error);
    throw error;
  }
};

// Create resource request
export const createResourceRequest = async (projectId, requestData) => {
  try {
    const response = await apiClient.post(`/projects/${projectId}/resource-requests`, requestData);
    return response.data;
  } catch (error) {
    console.error('Error creating resource request:', error);
    throw error;
  }
};

// Update resource request
export const updateResourceRequest = async (requestId, requestData) => {
  try {
    const response = await apiClient.patch(`/resource-requests/${requestId}`, requestData);
    return response.data;
  } catch (error) {
    console.error('Error updating resource request:', error);
    throw error;
  }
};

// Approve resource request
export const approveResourceRequest = async (requestId) => {
  try {
    const response = await apiClient.post(`/resource-requests/${requestId}/approve`);
    return response.data;
  } catch (error) {
    console.error('Error approving resource request:', error);
    throw error;
  }
};

// Reject resource request
export const rejectResourceRequest = async (requestId, reason) => {
  try {
    const response = await apiClient.post(`/resource-requests/${requestId}/reject`, { reason });
    return response.data;
  } catch (error) {
    console.error('Error rejecting resource request:', error);
    throw error;
  }
};

// Get resource statistics
export const getResourceStats = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}/resource-stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resource statistics:', error);
    throw error;
  }
};

export default {
  getProjectResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
  allocateResource,
  deallocateResource,
  getResourceAllocations,
  getResourceCategories,
  createResourceCategory,
  updateResourceCategory,
  deleteResourceCategory,
  getResourceInventory,
  getResourceUtilization,
  getResourceRequests,
  createResourceRequest,
  updateResourceRequest,
  approveResourceRequest,
  rejectResourceRequest,
  getResourceStats
};