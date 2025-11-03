import apiClient from './apiClient';

/**
 * Volunteer Management Service
 * Handles all volunteer coordination and management operations
 */

// Get project volunteers
export const getProjectVolunteers = async (projectId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 50,
      offset: options.offset || 0,
      status: options.status || 'all',
      role: options.role || 'all',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/volunteers`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching project volunteers:', error);
    throw error;
  }
};

// Get volunteer by ID
export const getVolunteerById = async (volunteerId) => {
  try {
    const response = await apiClient.get(`/volunteers/${volunteerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteer:', error);
    throw error;
  }
};

// Add volunteer to project
export const addVolunteer = async (projectId, volunteerData) => {
  try {
    const response = await apiClient.post(`/projects/${projectId}/volunteers`, volunteerData);
    return response.data;
  } catch (error) {
    console.error('Error adding volunteer:', error);
    throw error;
  }
};

// Update volunteer
export const updateVolunteer = async (volunteerId, volunteerData) => {
  try {
    const response = await apiClient.patch(`/volunteers/${volunteerId}`, volunteerData);
    return response.data;
  } catch (error) {
    console.error('Error updating volunteer:', error);
    throw error;
  }
};

// Remove volunteer from project
export const removeVolunteer = async (volunteerId) => {
  try {
    const response = await apiClient.delete(`/volunteers/${volunteerId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing volunteer:', error);
    throw error;
  }
};

// Get volunteer roles
export const getVolunteerRoles = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}/volunteer-roles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteer roles:', error);
    throw error;
  }
};

// Create volunteer role
export const createVolunteerRole = async (projectId, roleData) => {
  try {
    const response = await apiClient.post(`/projects/${projectId}/volunteer-roles`, roleData);
    return response.data;
  } catch (error) {
    console.error('Error creating volunteer role:', error);
    throw error;
  }
};

// Update volunteer role
export const updateVolunteerRole = async (roleId, roleData) => {
  try {
    const response = await apiClient.patch(`/volunteer-roles/${roleId}`, roleData);
    return response.data;
  } catch (error) {
    console.error('Error updating volunteer role:', error);
    throw error;
  }
};

// Delete volunteer role
export const deleteVolunteerRole = async (roleId) => {
  try {
    const response = await apiClient.delete(`/volunteer-roles/${roleId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting volunteer role:', error);
    throw error;
  }
};

// Get volunteer assignments
export const getVolunteerAssignments = async (volunteerId) => {
  try {
    const response = await apiClient.get(`/volunteers/${volunteerId}/assignments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteer assignments:', error);
    throw error;
  }
};

// Assign volunteer to task
export const assignVolunteer = async (volunteerId, assignmentData) => {
  try {
    const response = await apiClient.post(`/volunteers/${volunteerId}/assignments`, assignmentData);
    return response.data;
  } catch (error) {
    console.error('Error assigning volunteer:', error);
    throw error;
  }
};

// Unassign volunteer from task
export const unassignVolunteer = async (assignmentId) => {
  try {
    const response = await apiClient.delete(`/volunteer-assignments/${assignmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error unassigning volunteer:', error);
    throw error;
  }
};

// Get volunteer availability
export const getVolunteerAvailability = async (volunteerId) => {
  try {
    const response = await apiClient.get(`/volunteers/${volunteerId}/availability`);
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteer availability:', error);
    throw error;
  }
};

// Set volunteer availability
export const setVolunteerAvailability = async (volunteerId, availabilityData) => {
  try {
    const response = await apiClient.post(`/volunteers/${volunteerId}/availability`, availabilityData);
    return response.data;
  } catch (error) {
    console.error('Error setting volunteer availability:', error);
    throw error;
  }
};

// Get volunteer skills
export const getVolunteerSkills = async (volunteerId) => {
  try {
    const response = await apiClient.get(`/volunteers/${volunteerId}/skills`);
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteer skills:', error);
    throw error;
  }
};

// Add volunteer skill
export const addVolunteerSkill = async (volunteerId, skillData) => {
  try {
    const response = await apiClient.post(`/volunteers/${volunteerId}/skills`, skillData);
    return response.data;
  } catch (error) {
    console.error('Error adding volunteer skill:', error);
    throw error;
  }
};

// Remove volunteer skill
export const removeVolunteerSkill = async (skillId) => {
  try {
    const response = await apiClient.delete(`/volunteer-skills/${skillId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing volunteer skill:', error);
    throw error;
  }
};

// Get volunteer hours
export const getVolunteerHours = async (volunteerId, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || '30d',
      ...options
    };
    
    const response = await apiClient.get(`/volunteers/${volunteerId}/hours`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteer hours:', error);
    throw error;
  }
};

// Log volunteer hours
export const logVolunteerHours = async (volunteerId, hoursData) => {
  try {
    const response = await apiClient.post(`/volunteers/${volunteerId}/hours`, hoursData);
    return response.data;
  } catch (error) {
    console.error('Error logging volunteer hours:', error);
    throw error;
  }
};

// Get volunteer certifications
export const getVolunteerCertifications = async (volunteerId) => {
  try {
    const response = await apiClient.get(`/volunteers/${volunteerId}/certifications`);
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteer certifications:', error);
    throw error;
  }
};

// Add volunteer certification
export const addVolunteerCertification = async (volunteerId, certificationData) => {
  try {
    const response = await apiClient.post(`/volunteers/${volunteerId}/certifications`, certificationData);
    return response.data;
  } catch (error) {
    console.error('Error adding volunteer certification:', error);
    throw error;
  }
};

// Remove volunteer certification
export const removeVolunteerCertification = async (certificationId) => {
  try {
    const response = await apiClient.delete(`/volunteer-certifications/${certificationId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing volunteer certification:', error);
    throw error;
  }
};

// Get volunteer statistics
export const getVolunteerStats = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}/volunteer-stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteer statistics:', error);
    throw error;
  }
};

// Send volunteer notification
export const sendVolunteerNotification = async (volunteerId, notificationData) => {
  try {
    const response = await apiClient.post(`/volunteers/${volunteerId}/notifications`, notificationData);
    return response.data;
  } catch (error) {
    console.error('Error sending volunteer notification:', error);
    throw error;
  }
};

export default {
  getProjectVolunteers,
  getVolunteerById,
  addVolunteer,
  updateVolunteer,
  removeVolunteer,
  getVolunteerRoles,
  createVolunteerRole,
  updateVolunteerRole,
  deleteVolunteerRole,
  getVolunteerAssignments,
  assignVolunteer,
  unassignVolunteer,
  getVolunteerAvailability,
  setVolunteerAvailability,
  getVolunteerSkills,
  addVolunteerSkill,
  removeVolunteerSkill,
  getVolunteerHours,
  logVolunteerHours,
  getVolunteerCertifications,
  addVolunteerCertification,
  removeVolunteerCertification,
  getVolunteerStats,
  sendVolunteerNotification
};