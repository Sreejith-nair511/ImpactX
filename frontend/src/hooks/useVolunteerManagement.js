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
  const [availability, setAvailability] = useState(null);
  const [skills, setSkills] = useState([]);
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch project volunteers
  const fetchVolunteers = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await volunteerManagementService.getVolunteers(projectId, fetchOptions);
      setVolunteers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Create a new volunteer
  const createVolunteer = useCallback(async (volunteerData) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const newVolunteer = await volunteerManagementService.createVolunteer(projectId, volunteerData);
      setVolunteers(prev => [...prev, newVolunteer]);
      return newVolunteer;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Update a volunteer
  const updateVolunteer = useCallback(async (volunteerId, volunteerData) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const updatedVolunteer = await volunteerManagementService.updateVolunteer(projectId, volunteerId, volunteerData);
      setVolunteers(prev => prev.map(volunteer => 
        volunteer.id === volunteerId ? updatedVolunteer : volunteer
      ));
      return updatedVolunteer;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Delete a volunteer
  const deleteVolunteer = useCallback(async (volunteerId) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await volunteerManagementService.deleteVolunteer(projectId, volunteerId);
      setVolunteers(prev => prev.filter(volunteer => volunteer.id !== volunteerId));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Assign volunteer to task
  const assignVolunteer = useCallback(async (assignmentData) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const assignment = await volunteerManagementService.assignVolunteer(projectId, assignmentData);
      return assignment;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Fetch volunteer availability
  const fetchAvailability = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await volunteerManagementService.getVolunteerAvailability(projectId, fetchOptions);
      setAvailability(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Fetch volunteer skills
  const fetchSkills = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await volunteerManagementService.getVolunteerSkills(projectId, fetchOptions);
      setSkills(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Fetch volunteer performance
  const fetchPerformance = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await volunteerManagementService.getVolunteerPerformance(projectId, fetchOptions);
      setPerformance(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Initialize data
  useEffect(() => {
    if (projectId) {
      fetchVolunteers();
      fetchAvailability();
      fetchSkills();
      fetchPerformance();
    }
  }, [projectId, fetchVolunteers, fetchAvailability, fetchSkills, fetchPerformance]);
  
  return {
    volunteers,
    availability,
    skills,
    performance,
    loading,
    error,
    fetchVolunteers,
    createVolunteer,
    updateVolunteer,
    deleteVolunteer,
    assignVolunteer,
    fetchAvailability,
    fetchSkills,
    fetchPerformance
  };
};