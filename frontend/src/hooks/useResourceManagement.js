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
  const [utilization, setUtilization] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch project resources
  const fetchResources = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await resourceManagementService.getResources(projectId, fetchOptions);
      setResources(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Create a new resource
  const createResource = useCallback(async (resourceData) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const newResource = await resourceManagementService.createResource(projectId, resourceData);
      setResources(prev => [...prev, newResource]);
      return newResource;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Update a resource
  const updateResource = useCallback(async (resourceId, resourceData) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const updatedResource = await resourceManagementService.updateResource(projectId, resourceId, resourceData);
      setResources(prev => prev.map(resource => 
        resource.id === resourceId ? updatedResource : resource
      ));
      return updatedResource;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Delete a resource
  const deleteResource = useCallback(async (resourceId) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await resourceManagementService.deleteResource(projectId, resourceId);
      setResources(prev => prev.filter(resource => resource.id !== resourceId));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Allocate resources
  const allocateResources = useCallback(async (allocationData) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const allocation = await resourceManagementService.allocateResources(projectId, allocationData);
      return allocation;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Fetch resource utilization
  const fetchUtilization = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await resourceManagementService.getResourceUtilization(projectId, fetchOptions);
      setUtilization(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Fetch resource forecast
  const fetchForecast = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await resourceManagementService.getResourceForecast(projectId, fetchOptions);
      setForecast(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Initialize data
  useEffect(() => {
    if (projectId) {
      fetchResources();
      fetchUtilization();
      fetchForecast();
    }
  }, [projectId, fetchResources, fetchUtilization, fetchForecast]);
  
  return {
    resources,
    utilization,
    forecast,
    loading,
    error,
    fetchResources,
    createResource,
    updateResource,
    deleteResource,
    allocateResources,
    fetchUtilization,
    fetchForecast
  };
};

export default useResourceManagement;