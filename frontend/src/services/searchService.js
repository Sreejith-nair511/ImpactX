import apiClient from './apiClient';

/**
 * Search Service
 * Handles all search-related operations across the platform
 */

// Search across all entities
export const searchAll = async (query, options = {}) => {
  try {
    const params = {
      q: query,
      limit: options.limit || 20,
      offset: options.offset || 0,
      type: options.type || 'all',
      sortBy: options.sortBy || 'relevance',
      sortOrder: options.sortOrder || 'desc',
      ...options
    };
    
    const response = await apiClient.get('/search', { params });
    return response.data;
  } catch (error) {
    console.error('Error performing search:', error);
    throw error;
  }
};

// Search users
export const searchUsers = async (query, options = {}) => {
  try {
    const params = {
      q: query,
      limit: options.limit || 20,
      offset: options.offset || 0,
      sortBy: options.sortBy || 'name',
      sortOrder: options.sortOrder || 'asc',
      ...options
    };
    
    const response = await apiClient.get('/search/users', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

// Search projects
export const searchProjects = async (query, options = {}) => {
  try {
    const params = {
      q: query,
      limit: options.limit || 20,
      offset: options.offset || 0,
      sortBy: options.sortBy || 'name',
      sortOrder: options.sortOrder || 'asc',
      ...options
    };
    
    const response = await apiClient.get('/search/projects', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching projects:', error);
    throw error;
  }
};

// Search tasks
export const searchTasks = async (query, options = {}) => {
  try {
    const params = {
      q: query,
      limit: options.limit || 20,
      offset: options.offset || 0,
      sortBy: options.sortBy || 'name',
      sortOrder: options.sortOrder || 'asc',
      ...options
    };
    
    const response = await apiClient.get('/search/tasks', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching tasks:', error);
    throw error;
  }
};

// Search teams
export const searchTeams = async (query, options = {}) => {
  try {
    const params = {
      q: query,
      limit: options.limit || 20,
      offset: options.offset || 0,
      sortBy: options.sortBy || 'name',
      sortOrder: options.sortOrder || 'asc',
      ...options
    };
    
    const response = await apiClient.get('/search/teams', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching teams:', error);
    throw error;
  }
};

// Search documents
export const searchDocuments = async (query, options = {}) => {
  try {
    const params = {
      q: query,
      limit: options.limit || 20,
      offset: options.offset || 0,
      sortBy: options.sortBy || 'name',
      sortOrder: options.sortOrder || 'asc',
      ...options
    };
    
    const response = await apiClient.get('/search/documents', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching documents:', error);
    throw error;
  }
};

// Search events
export const searchEvents = async (query, options = {}) => {
  try {
    const params = {
      q: query,
      limit: options.limit || 20,
      offset: options.offset || 0,
      sortBy: options.sortBy || 'name',
      sortOrder: options.sortOrder || 'asc',
      ...options
    };
    
    const response = await apiClient.get('/search/events', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching events:', error);
    throw error;
  }
};

// Get search suggestions
export const getSearchSuggestions = async (query, options = {}) => {
  try {
    const params = {
      q: query,
      limit: options.limit || 10,
      type: options.type || 'all',
      ...options
    };
    
    const response = await apiClient.get('/search/suggestions', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching search suggestions:', error);
    throw error;
  }
};

// Get recent searches
export const getRecentSearches = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/recent-searches`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recent searches:', error);
    throw error;
  }
};

// Save search
export const saveSearch = async (userId, searchQuery) => {
  try {
    const response = await apiClient.post(`/users/${userId}/saved-searches`, {
      query: searchQuery
    });
    return response.data;
  } catch (error) {
    console.error('Error saving search:', error);
    throw error;
  }
};

// Get saved searches
export const getSavedSearches = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/saved-searches`);
    return response.data;
  } catch (error) {
    console.error('Error fetching saved searches:', error);
    throw error;
  }
};

// Delete saved search
export const deleteSavedSearch = async (userId, searchId) => {
  try {
    const response = await apiClient.delete(`/users/${userId}/saved-searches/${searchId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting saved search:', error);
    throw error;
  }
};

// Advanced search with filters
export const advancedSearch = async (query, filters = {}, options = {}) => {
  try {
    const params = {
      q: query,
      limit: options.limit || 20,
      offset: options.offset || 0,
      sortBy: options.sortBy || 'relevance',
      sortOrder: options.sortOrder || 'desc',
      ...options
    };
    
    const response = await apiClient.post('/search/advanced', {
      filters,
      params
    });
    
    return response.data;
  } catch (error) {
    console.error('Error performing advanced search:', error);
    throw error;
  }
};

export default {
  searchAll,
  searchUsers,
  searchProjects,
  searchTasks,
  searchTeams,
  searchDocuments,
  searchEvents,
  getSearchSuggestions,
  getRecentSearches,
  saveSearch,
  getSavedSearches,
  deleteSavedSearch,
  advancedSearch
};