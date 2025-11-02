/**
 * Portfolio service for managing user projects and portfolios
 */

import api from './apiClient';

/**
 * Get user portfolio
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<object>} Portfolio data
 */
export const getUserPortfolio = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/portfolio`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching user portfolio:', error);
    throw error;
  }
};

/**
 * Get user projects
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} User projects
 */
export const getUserProjects = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/projects`, {
      params: options
    });
    return response.projects || [];
  } catch (error) {
    console.error('Error fetching user projects:', error);
    throw error;
  }
};

/**
 * Create a new project
 * @param {object} projectData - Project data
 * @returns {Promise<object>} Created project
 */
export const createProject = async (projectData) => {
  try {
    const response = await api.post('/projects', projectData);
    return response;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

/**
 * Update a project
 * @param {string} projectId - Project ID
 * @param {object} projectData - Updated project data
 * @returns {Promise<object>} Updated project
 */
export const updateProject = async (projectId, projectData) => {
  try {
    const response = await api.put(`/projects/${projectId}`, projectData);
    return response;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

/**
 * Delete a project
 * @param {string} projectId - Project ID
 * @returns {Promise<object>} Delete response
 */
export const deleteProject = async (projectId) => {
  try {
    const response = await api.delete(`/projects/${projectId}`);
    return response;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

/**
 * Get project details
 * @param {string} projectId - Project ID
 * @returns {Promise<object>} Project details
 */
export const getProject = async (projectId) => {
  try {
    const response = await api.get(`/projects/${projectId}`);
    return response;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

/**
 * Get project statistics
 * @param {string} projectId - Project ID
 * @returns {Promise<object>} Project statistics
 */
export const getProjectStats = async (projectId) => {
  try {
    const response = await api.get(`/projects/${projectId}/stats`);
    return response;
  } catch (error) {
    console.error('Error fetching project stats:', error);
    throw error;
  }
};

/**
 * Get project donations
 * @param {string} projectId - Project ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} Project donations
 */
export const getProjectDonations = async (projectId, options = {}) => {
  try {
    const response = await api.get(`/projects/${projectId}/donations`, {
      params: options
    });
    return response.donations || [];
  } catch (error) {
    console.error('Error fetching project donations:', error);
    throw error;
  }
};

/**
 * Get project updates
 * @param {string} projectId - Project ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} Project updates
 */
export const getProjectUpdates = async (projectId, options = {}) => {
  try {
    const response = await api.get(`/projects/${projectId}/updates`, {
      params: options
    });
    return response.updates || [];
  } catch (error) {
    console.error('Error fetching project updates:', error);
    throw error;
  }
};

/**
 * Create a project update
 * @param {string} projectId - Project ID
 * @param {object} updateData - Update data
 * @returns {Promise<object>} Created update
 */
export const createProjectUpdate = async (projectId, updateData) => {
  try {
    const response = await api.post(`/projects/${projectId}/updates`, updateData);
    return response;
  } catch (error) {
    console.error('Error creating project update:', error);
    throw error;
  }
};

/**
 * Get project team members
 * @param {string} projectId - Project ID
 * @returns {Promise<Array>} Team members
 */
export const getProjectTeam = async (projectId) => {
  try {
    const response = await api.get(`/projects/${projectId}/team`);
    return response.team || [];
  } catch (error) {
    console.error('Error fetching project team:', error);
    throw error;
  }
};

/**
 * Add team member to project
 * @param {string} projectId - Project ID
 * @param {object} memberData - Team member data
 * @returns {Promise<object>} Added member
 */
export const addTeamMember = async (projectId, memberData) => {
  try {
    const response = await api.post(`/projects/${projectId}/team`, memberData);
    return response;
  } catch (error) {
    console.error('Error adding team member:', error);
    throw error;
  }
};

/**
 * Remove team member from project
 * @param {string} projectId - Project ID
 * @param {string} memberId - Member ID
 * @returns {Promise<object>} Remove response
 */
export const removeTeamMember = async (projectId, memberId) => {
  try {
    const response = await api.delete(`/projects/${projectId}/team/${memberId}`);
    return response;
  } catch (error) {
    console.error('Error removing team member:', error);
    throw error;
  }
};

/**
 * Get portfolio statistics
 * @param {string} userId - User ID
 * @returns {Promise<object>} Portfolio statistics
 */
export const getPortfolioStats = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/portfolio/stats`);
    return response;
  } catch (error) {
    console.error('Error fetching portfolio stats:', error);
    throw error;
  }
};

/**
 * Get portfolio impact data
 * @param {string} userId - User ID
 * @returns {Promise<object>} Portfolio impact data
 */
export const getPortfolioImpact = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/portfolio/impact`);
    return response;
  } catch (error) {
    console.error('Error fetching portfolio impact:', error);
    throw error;
  }
};

/**
 * Search projects
 * @param {string} query - Search query
 * @param {object} options - Search options
 * @returns {Promise<Array>} Search results
 */
export const searchProjects = async (query, options = {}) => {
  try {
    const response = await api.get('/projects/search', {
      params: {
        q: query,
        ...options
      }
    });
    return response.projects || [];
  } catch (error) {
    console.error('Error searching projects:', error);
    throw error;
  }
};

/**
 * Get featured projects
 * @param {object} options - Query options
 * @returns {Promise<Array>} Featured projects
 */
export const getFeaturedProjects = async (options = {}) => {
  try {
    const response = await api.get('/projects/featured', {
      params: options
    });
    return response.projects || [];
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    throw error;
  }
};

// Default export
export default {
  getUserPortfolio,
  getUserProjects,
  createProject,
  updateProject,
  deleteProject,
  getProject,
  getProjectStats,
  getProjectDonations,
  getProjectUpdates,
  createProjectUpdate,
  getProjectTeam,
  addTeamMember,
  removeTeamMember,
  getPortfolioStats,
  getPortfolioImpact,
  searchProjects,
  getFeaturedProjects
};