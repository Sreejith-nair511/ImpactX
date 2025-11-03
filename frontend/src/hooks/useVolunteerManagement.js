import { useState, useEffect, useCallback } from 'react';
import * as volunteerManagementService from '../services/volunteerManagementService';

/**
 * Custom hook for managing project volunteers
 * @param {string} projectId - The ID of the project
 * @param {Object} options - Configuration options
 * @returns {Object} Volunteer management state and actions
 */
export const useVolunteerManagement = (projectId, options = {}) => {
  const [volunteers, setVolunteers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch project volunteers
  const fetchVolunteers = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await volunteerManagementService.getProjectVolunteers(projectId, fetchOptions);
      setVolunteers(data.volunteers || data);
    } catch (err) {
      setError(err.message || 'Failed to fetch project volunteers');
      console.error('Error fetching project volunteers:', err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Fetch volunteer by ID
  const fetchVolunteerById = useCallback(async (volunteerId) => {
    try {
      const volunteer = await volunteerManagementService.getVolunteerById(volunteerId);
      return volunteer;
    } catch (err) {
      console.error('Error fetching volunteer:', err);
      throw err;
    }
  }, []);
  
  // Add volunteer to project
  const addVolunteer = useCallback(async (volunteerData) => {
    try {
      const newVolunteer = await volunteerManagementService.addVolunteer(projectId, volunteerData);
      setVolunteers(prev => [newVolunteer, ...prev]);
      return newVolunteer;
    } catch (err) {
      console.error('Error adding volunteer:', err);
      throw err;
    }
  }, [projectId]);
  
  // Update volunteer
  const updateVolunteer = useCallback(async (volunteerId, volunteerData) => {
    try {
      const updatedVolunteer = await volunteerManagementService.updateVolunteer(volunteerId, volunteerData);
      setVolunteers(prev => 
        prev.map(volunteer => 
          volunteer.id === volunteerId ? { ...volunteer, ...updatedVolunteer } : volunteer
        )
      );
      return updatedVolunteer;
    } catch (err) {
      console.error('Error updating volunteer:', err);
      throw err;
    }
  }, []);
  
  // Remove volunteer from project
  const removeVolunteer = useCallback(async (volunteerId) => {
    try {
      await volunteerManagementService.removeVolunteer(volunteerId);
      setVolunteers(prev => prev.filter(volunteer => volunteer.id !== volunteerId));
    } catch (err) {
      console.error('Error removing volunteer:', err);
      throw err;
    }
  }, []);
  
  // Fetch volunteer roles
  const fetchRoles = useCallback(async () => {
    if (!projectId) return;
    
    try {
      const data = await volunteerManagementService.getVolunteerRoles(projectId);
      setRoles(data.roles || data);
    } catch (err) {
      console.error('Error fetching volunteer roles:', err);
    }
  }, [projectId]);
  
  // Create volunteer role
  const createRole = useCallback(async (roleData) => {
    try {
      const newRole = await volunteerManagementService.createVolunteerRole(projectId, roleData);
      setRoles(prev => [newRole, ...prev]);
      return newRole;
    } catch (err) {
      console.error('Error creating volunteer role:', err);
      throw err;
    }
  }, [projectId]);
  
  // Update volunteer role
  const updateRole = useCallback(async (roleId, roleData) => {
    try {
      const updatedRole = await volunteerManagementService.updateVolunteerRole(roleId, roleData);
      setRoles(prev => 
        prev.map(role => 
          role.id === roleId ? { ...role, ...updatedRole } : role
        )
      );
      return updatedRole;
    } catch (err) {
      console.error('Error updating volunteer role:', err);
      throw err;
    }
  }, []);
  
  // Delete volunteer role
  const deleteRole = useCallback(async (roleId) => {
    try {
      await volunteerManagementService.deleteVolunteerRole(roleId);
      setRoles(prev => prev.filter(role => role.id !== roleId));
    } catch (err) {
      console.error('Error deleting volunteer role:', err);
      throw err;
    }
  }, []);
  
  // Assign volunteer to task
  const assignVolunteer = useCallback(async (volunteerId, assignmentData) => {
    try {
      const assignment = await volunteerManagementService.assignVolunteer(volunteerId, assignmentData);
      return assignment;
    } catch (err) {
      console.error('Error assigning volunteer:', err);
      throw err;
    }
  }, []);
  
  // Unassign volunteer from task
  const unassignVolunteer = useCallback(async (assignmentId) => {
    try {
      const unassignment = await volunteerManagementService.unassignVolunteer(assignmentId);
      return unassignment;
    } catch (err) {
      console.error('Error unassigning volunteer:', err);
      throw err;
    }
  }, []);
  
  // Set volunteer availability
  const setVolunteerAvailability = useCallback(async (volunteerId, availabilityData) => {
    try {
      const availability = await volunteerManagementService.setVolunteerAvailability(volunteerId, availabilityData);
      return availability;
    } catch (err) {
      console.error('Error setting volunteer availability:', err);
      throw err;
    }
  }, []);
  
  // Add volunteer skill
  const addVolunteerSkill = useCallback(async (volunteerId, skillData) => {
    try {
      const skill = await volunteerManagementService.addVolunteerSkill(volunteerId, skillData);
      return skill;
    } catch (err) {
      console.error('Error adding volunteer skill:', err);
      throw err;
    }
  }, []);
  
  // Remove volunteer skill
  const removeVolunteerSkill = useCallback(async (skillId) => {
    try {
      await volunteerManagementService.removeVolunteerSkill(skillId);
    } catch (err) {
      console.error('Error removing volunteer skill:', err);
      throw err;
    }
  }, []);
  
  // Log volunteer hours
  const logVolunteerHours = useCallback(async (volunteerId, hoursData) => {
    try {
      const hours = await volunteerManagementService.logVolunteerHours(volunteerId, hoursData);
      return hours;
    } catch (err) {
      console.error('Error logging volunteer hours:', err);
      throw err;
    }
  }, []);
  
  // Add volunteer certification
  const addVolunteerCertification = useCallback(async (volunteerId, certificationData) => {
    try {
      const certification = await volunteerManagementService.addVolunteerCertification(volunteerId, certificationData);
      return certification;
    } catch (err) {
      console.error('Error adding volunteer certification:', err);
      throw err;
    }
  }, []);
  
  // Remove volunteer certification
  const removeVolunteerCertification = useCallback(async (certificationId) => {
    try {
      await volunteerManagementService.removeVolunteerCertification(certificationId);
    } catch (err) {
      console.error('Error removing volunteer certification:', err);
      throw err;
    }
  }, []);
  
  // Fetch volunteer statistics
  const fetchStats = useCallback(async () => {
    if (!projectId) return;
    
    try {
      const statistics = await volunteerManagementService.getVolunteerStats(projectId);
      setStats(statistics);
    } catch (err) {
      console.error('Error fetching volunteer statistics:', err);
    }
  }, [projectId]);
  
  // Send volunteer notification
  const sendVolunteerNotification = useCallback(async (volunteerId, notificationData) => {
    try {
      const notification = await volunteerManagementService.sendVolunteerNotification(volunteerId, notificationData);
      return notification;
    } catch (err) {
      console.error('Error sending volunteer notification:', err);
      throw err;
    }
  }, []);
  
  // Refresh all data
  const refresh = useCallback(() => {
    fetchVolunteers(options);
    fetchRoles();
    fetchStats();
  }, [
    fetchVolunteers,
    fetchRoles,
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
    volunteers,
    roles,
    stats,
    loading,
    error,
    
    // Actions
    fetchVolunteers,
    fetchVolunteerById,
    addVolunteer,
    updateVolunteer,
    removeVolunteer,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
    assignVolunteer,
    unassignVolunteer,
    setVolunteerAvailability,
    addVolunteerSkill,
    removeVolunteerSkill,
    logVolunteerHours,
    addVolunteerCertification,
    removeVolunteerCertification,
    fetchStats,
    sendVolunteerNotification,
    refresh
  };
};

export default useVolunteerManagement;