import { useState, useEffect, useCallback } from 'react';
import * as portfolioService from '../services/portfolioService';

/**
 * Custom hook for managing user portfolios
 * @param {string} userId - User ID
 * @returns {object} Portfolio management functions and state
 */
export const usePortfolio = (userId) => {
  const [portfolio, setPortfolio] = useState(null);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch user portfolio
   */
  const fetchPortfolio = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await portfolioService.getUserPortfolio(userId);
      setPortfolio(data);
    } catch (err) {
      setError(err.message || 'Failed to load portfolio');
      console.error('Error fetching portfolio:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Fetch user projects
   */
  const fetchProjects = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await portfolioService.getUserProjects(userId);
      setProjects(data);
    } catch (err) {
      setError(err.message || 'Failed to load projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Fetch portfolio statistics
   */
  const fetchStats = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await portfolioService.getPortfolioStats(userId);
      setStats(data);
    } catch (err) {
      setError(err.message || 'Failed to load portfolio statistics');
      console.error('Error fetching portfolio stats:', err);
    }
  }, [userId]);

  /**
   * Create a new project
   * @param {object} projectData - Project data
   */
  const createProject = useCallback(async (projectData) => {
    try {
      const newProject = await portfolioService.createProject(projectData);
      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (err) {
      setError(err.message || 'Failed to create project');
      console.error('Error creating project:', err);
      throw err;
    }
  }, []);

  /**
   * Update a project
   * @param {string} projectId - Project ID
   * @param {object} projectData - Updated project data
   */
  const updateProject = useCallback(async (projectId, projectData) => {
    try {
      const updatedProject = await portfolioService.updateProject(projectId, projectData);
      setProjects(prev => 
        prev.map(project => 
          project.id === projectId ? updatedProject : project
        )
      );
      return updatedProject;
    } catch (err) {
      setError(err.message || 'Failed to update project');
      console.error('Error updating project:', err);
      throw err;
    }
  }, []);

  /**
   * Delete a project
   * @param {string} projectId - Project ID
   */
  const deleteProject = useCallback(async (projectId) => {
    try {
      await portfolioService.deleteProject(projectId);
      setProjects(prev => prev.filter(project => project.id !== projectId));
    } catch (err) {
      setError(err.message || 'Failed to delete project');
      console.error('Error deleting project:', err);
      throw err;
    }
  }, []);

  /**
   * Add team member to project
   * @param {string} projectId - Project ID
   * @param {object} memberData - Team member data
   */
  const addTeamMember = useCallback(async (projectId, memberData) => {
    try {
      const updatedProject = await portfolioService.addTeamMember(projectId, memberData);
      setProjects(prev => 
        prev.map(project => 
          project.id === projectId ? updatedProject : project
        )
      );
      return updatedProject;
    } catch (err) {
      setError(err.message || 'Failed to add team member');
      console.error('Error adding team member:', err);
      throw err;
    }
  }, []);

  /**
   * Remove team member from project
   * @param {string} projectId - Project ID
   * @param {string} memberId - Member ID
   */
  const removeTeamMember = useCallback(async (projectId, memberId) => {
    try {
      const updatedProject = await portfolioService.removeTeamMember(projectId, memberId);
      setProjects(prev => 
        prev.map(project => 
          project.id === projectId ? updatedProject : project
        )
      );
      return updatedProject;
    } catch (err) {
      setError(err.message || 'Failed to remove team member');
      console.error('Error removing team member:', err);
      throw err;
    }
  }, []);

  /**
   * Create a project update
   * @param {string} projectId - Project ID
   * @param {object} updateData - Update data
   */
  const createProjectUpdate = useCallback(async (projectId, updateData) => {
    try {
      const newUpdate = await portfolioService.createProjectUpdate(projectId, updateData);
      // Update the project with the new update
      setProjects(prev => 
        prev.map(project => {
          if (project.id === projectId) {
            return {
              ...project,
              updates: project.updates ? [...project.updates, newUpdate] : [newUpdate]
            };
          }
          return project;
        })
      );
      return newUpdate;
    } catch (err) {
      setError(err.message || 'Failed to create project update');
      console.error('Error creating project update:', err);
      throw err;
    }
  }, []);

  /**
   * Search projects
   * @param {string} query - Search query
   * @param {object} options - Search options
   * @returns {Promise<Array>} Search results
   */
  const searchProjects = useCallback(async (query, options = {}) => {
    try {
      const results = await portfolioService.searchProjects(query, options);
      return results;
    } catch (err) {
      setError(err.message || 'Failed to search projects');
      console.error('Error searching projects:', err);
      return [];
    }
  }, []);

  /**
   * Get featured projects
   * @param {object} options - Query options
   * @returns {Promise<Array>} Featured projects
   */
  const getFeaturedProjects = useCallback(async (options = {}) => {
    try {
      const results = await portfolioService.getFeaturedProjects(options);
      return results;
    } catch (err) {
      setError(err.message || 'Failed to fetch featured projects');
      console.error('Error fetching featured projects:', err);
      return [];
    }
  }, []);

  // Fetch portfolio data on mount and when userId changes
  useEffect(() => {
    if (userId) {
      fetchPortfolio();
      fetchProjects();
      fetchStats();
    }
  }, [userId, fetchPortfolio, fetchProjects, fetchStats]);

  return {
    portfolio,
    projects,
    stats,
    loading,
    error,
    fetchPortfolio,
    fetchProjects,
    fetchStats,
    createProject,
    updateProject,
    deleteProject,
    addTeamMember,
    removeTeamMember,
    createProjectUpdate,
    searchProjects,
    getFeaturedProjects
  };
};

export default usePortfolio;