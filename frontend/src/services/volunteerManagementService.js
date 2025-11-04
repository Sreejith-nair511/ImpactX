import apiClient from './apiClient';

/**
 * Volunteer Management Service
 * Handles all volunteer coordination and management operations
 */

// Get project volunteers
export const getVolunteers = async (projectId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 50,
      offset: options.offset || 0,
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/volunteers`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    throw error;
  }
};

// Create a new volunteer
export const createVolunteer = async (projectId, volunteerData) => {
  try {
    const response = await apiClient.post(`/projects/${projectId}/volunteers`, volunteerData);
    return response.data;
  } catch (error) {
    console.error('Error creating volunteer:', error);
    throw error;
  }
};

// Update a volunteer
export const updateVolunteer = async (projectId, volunteerId, volunteerData) => {
  try {
    const response = await apiClient.put(`/projects/${projectId}/volunteers/${volunteerId}`, volunteerData);
    return response.data;
  } catch (error) {
    console.error('Error updating volunteer:', error);
    throw error;
  }
};

// Delete a volunteer
export const deleteVolunteer = async (projectId, volunteerId) => {
  try {
    const response = await apiClient.delete(`/projects/${projectId}/volunteers/${volunteerId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting volunteer:', error);
    throw error;
  }
};

// Assign volunteer to task
export const assignVolunteer = async (projectId, assignmentData) => {
  try {
    const response = await apiClient.post(`/projects/${projectId}/volunteer-assignments`, assignmentData);
    return response.data;
  } catch (error) {
    console.error('Error assigning volunteer:', error);
    throw error;
  }
};

// Get volunteer availability
export const getVolunteerAvailability = async (projectId, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || '30d',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/volunteer-availability`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteer availability:', error);
    throw error;
  }
};

// Get volunteer skills
export const getVolunteerSkills = async (projectId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 50,
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/volunteer-skills`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteer skills:', error);
    throw error;
  }
};

// Get volunteer performance
export const getVolunteerPerformance = async (projectId, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || '90d',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/volunteer-performance`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteer performance:', error);
    throw error;
  }
};

export default {
  getVolunteers,
  createVolunteer,
  updateVolunteer,
  deleteVolunteer,
  assignVolunteer,
  getVolunteerAvailability,
  getVolunteerSkills,
  getVolunteerPerformance
};