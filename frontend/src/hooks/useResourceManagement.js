import { useState, useEffect, useCallback } from 'react';
import * as resourceManagementService from '../services/resourceManagementService';

/**
 * Custom hook for managing project resources
 * @param {string} projectId - The ID of the project
 * @param {Object} options - Configuration options
 * @returns {Object} Resource management state and actions
 */
export const useResourceManagement = (projectId, options = {}) => {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch project resources
  const fetchResources = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await resourceManagementService.getProjectResources(projectId, fetchOptions);
      setResources(data.resources || data);
    } catch (err) {
      setError(err.message || 'Failed to fetch project resources');
      console.error('Error fetching project resources:', err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Fetch resource by ID
  const fetchResourceById = useCallback(async (resourceId) => {
    try {
      const resource = await resourceManagementService.getResourceById(resourceId);
      return resource;
    } catch (err) {
      console.error('Error fetching resource:', err);
      throw err;
    }
  }, []);
  
  // Create resource
  const createResource = useCallback(async (resourceData) => {
    try {
      const newResource = await resourceManagementService.createResource(projectId, resourceData);
      setResources(prev => [newResource, ...prev]);
      return newResource;
    } catch (err) {
      console.error('Error creating resource:', err);
      throw err;
    }
  }, [projectId]);
  
  // Update resource
  const updateResource = useCallback(async (resourceId, resourceData) => {
    try {
      const updatedResource = await resourceManagementService.updateResource(resourceId, resourceData);
      setResources(prev => 
        prev.map(resource => 
          resource.id === resourceId ? { ...resource, ...updatedResource } : resource
        )
      );
      return updatedResource;
    } catch (err) {
      console.error('Error updating resource:', err);
      throw err;
    }
  }, []);
  
  // Delete resource
  const deleteResource = useCallback(async (resourceId) => {
    try {
      await resourceManagementService.deleteResource(resourceId);
      setResources(prev => prev.filter(resource => resource.id !== resourceId));
    } catch (err) {
      console.error('Error deleting resource:', err);
      throw err;
    }
  }, []);
  
  // Allocate resource
  const allocateResource = useCallback(async (resourceId, allocationData) => {
    try {
      const allocation = await resourceManagementService.allocateResource(resourceId, allocationData);
      return allocation;
    } catch (err) {
      console.error('Error allocating resource:', err);
      throw err;
    }
  }, []);
  
  // Deallocate resource
  const deallocateResource = useCallback(async (allocationId) => {
    try {
      const deallocation = await resourceManagementService.deallocateResource(allocationId);
      return deallocation;
    } catch (err) {
      console.error('Error deallocating resource:', err);
      throw err;
    }
  }, []);
  
  // Fetch resource categories
  const fetchCategories = useCallback(async () => {
    if (!projectId) return;
    
    try {
      const data = await resourceManagementService.getResourceCategories(projectId);
      setCategories(data.categories || data);
    } catch (err) {
      console.error('Error fetching resource categories:', err);
    }
  }, [projectId]);
  
  // Create resource category
  const createCategory = useCallback(async (categoryData) => {
    try {
      const newCategory = await resourceManagementService.createResourceCategory(projectId, categoryData);
      setCategories(prev => [newCategory, ...prev]);
      return newCategory;
    } catch (err) {
      console.error('Error creating resource category:', err);
      throw err;
    }
  }, [projectId]);
  
  // Update resource category
  const updateCategory = useCallback(async (categoryId, categoryData) => {
    try {
      const updatedCategory = await resourceManagementService.updateResourceCategory(categoryId, categoryData);
      setCategories(prev => 
        prev.map(category => 
          category.id === categoryId ? { ...category, ...updatedCategory } : category
        )
      );
      return updatedCategory;
    } catch (err) {
      console.error('Error updating resource category:', err);
      throw err;
    }
  }, []);
  
  // Delete resource category
  const deleteCategory = useCallback(async (categoryId) => {
    try {
      await resourceManagementService.deleteResourceCategory(categoryId);
      setCategories(prev => prev.filter(category => category.id !== categoryId));
    } catch (err) {
      console.error('Error deleting resource category:', err);
      throw err;
    }
  }, []);
  
  // Fetch resource inventory
  const fetchInventory = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    try {
      const data = await resourceManagementService.getResourceInventory(projectId, fetchOptions);
      setInventory(data.inventory || data);
    } catch (err) {
      console.error('Error fetching resource inventory:', err);
    }
  }, [projectId]);
  
  // Fetch resource requests
  const fetchRequests = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    try {
      const data = await resourceManagementService.getResourceRequests(projectId, fetchOptions);
      setRequests(data.requests || data);
    } catch (err) {
      console.error('Error fetching resource requests:', err);
    }
  }, [projectId]);
  
  // Create resource request
  const createRequest = useCallback(async (requestData) => {
    try {
      const newRequest = await resourceManagementService.createResourceRequest(projectId, requestData);
      setRequests(prev => [newRequest, ...prev]);
      return newRequest;
    } catch (err) {
      console.error('Error creating resource request:', err);
      throw err;
    }
  }, [projectId]);
  
  // Update resource request
  const updateRequest = useCallback(async (requestId, requestData) => {
    try {
      const updatedRequest = await resourceManagementService.updateResourceRequest(requestId, requestData);
      setRequests(prev => 
        prev.map(request => 
          request.id === requestId ? { ...request, ...updatedRequest } : request
        )
      );
      return updatedRequest;
    } catch (err) {
      console.error('Error updating resource request:', err);
      throw err;
    }
  }, []);
  
  // Approve resource request
  const approveRequest = useCallback(async (requestId) => {
    try {
      const approvedRequest = await resourceManagementService.approveResourceRequest(requestId);
      setRequests(prev => 
        prev.map(request => 
          request.id === requestId ? { ...request, ...approvedRequest } : request
        )
      );
      return approvedRequest;
    } catch (err) {
      console.error('Error approving resource request:', err);
      throw err;
    }
  }, []);
  
  // Reject resource request
  const rejectRequest = useCallback(async (requestId, reason) => {
    try {
      const rejectedRequest = await resourceManagementService.rejectResourceRequest(requestId, reason);
      setRequests(prev => 
        prev.map(request => 
          request.id === requestId ? { ...request, ...rejectedRequest } : request
        )
      );
      return rejectedRequest;
    } catch (err) {
      console.error('Error rejecting resource request:', err);
      throw err;
    }
  }, []);
  
  // Fetch resource statistics
  const fetchStats = useCallback(async () => {
    if (!projectId) return;
    
    try {
      const statistics = await resourceManagementService.getResourceStats(projectId);
      setStats(statistics);
    } catch (err) {
      console.error('Error fetching resource statistics:', err);
    }
  }, [projectId]);
  
  // Refresh all data
  const refresh = useCallback(() => {
    fetchResources(options);
    fetchCategories();
    fetchInventory();
    fetchRequests();
    fetchStats();
  }, [
    fetchResources,
    fetchCategories,
    fetchInventory,
    fetchRequests,
    fetchStats,
    options
  ]);
  
  // Initialize data
  useEffect(() => {
    if (projectId) {
      refresh();
    }
  }, [projectId, refresh]);
  
  return {
    // State
    resources,
    categories,
    inventory,
    requests,
    stats,
    loading,
    error,
    
    // Actions
    fetchResources,
    fetchResourceById,
    createResource,
    updateResource,
    deleteResource,
    allocateResource,
    deallocateResource,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    fetchInventory,
    fetchRequests,
    createRequest,
    updateRequest,
    approveRequest,
    rejectRequest,
    fetchStats,
    refresh
  };
};

export default useResourceManagement;