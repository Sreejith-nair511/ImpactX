import { useState, useEffect, useCallback } from 'react';
import * as collaborationService from '../services/collaborationService';

/**
 * Custom hook for managing collaboration features
 * @param {string} userId - The ID of the user
 * @returns {Object} Collaboration state and actions
 */
export const useCollaboration = (userId) => {
  const [teams, setTeams] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch user teams
  const fetchTeams = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await collaborationService.getUserTeams(userId);
      setTeams(data.teams || data);
    } catch (err) {
      setError(err.message || 'Failed to fetch teams');
      console.error('Error fetching teams:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);
  
  // Fetch team invitations
  const fetchInvitations = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await collaborationService.getTeamInvitations(userId);
      setInvitations(data.invitations || data);
    } catch (err) {
      console.error('Error fetching team invitations:', err);
    }
  }, [userId]);
  
  // Create team
  const createTeam = useCallback(async (teamData) => {
    try {
      const newTeam = await collaborationService.createTeam(teamData);
      setTeams(prev => [...prev, newTeam]);
      return newTeam;
    } catch (err) {
      console.error('Error creating team:', err);
      throw err;
    }
  }, []);
  
  // Update team
  const updateTeam = useCallback(async (teamId, teamData) => {
    try {
      const updatedTeam = await collaborationService.updateTeam(teamId, teamData);
      
      setTeams(prev => 
        prev.map(team => 
          team.id === teamId ? { ...team, ...updatedTeam } : team
        )
      );
      
      return updatedTeam;
    } catch (err) {
      console.error('Error updating team:', err);
      throw err;
    }
  }, []);
  
  // Delete team
  const deleteTeam = useCallback(async (teamId) => {
    try {
      await collaborationService.deleteTeam(teamId);
      
      setTeams(prev => prev.filter(team => team.id !== teamId));
    } catch (err) {
      console.error('Error deleting team:', err);
      throw err;
    }
  }, []);
  
  // Add team member
  const addTeamMember = useCallback(async (teamId, memberData) => {
    try {
      const updatedTeam = await collaborationService.addTeamMember(teamId, memberData);
      
      // Update team with new member info
      setTeams(prev => 
        prev.map(team => 
          team.id === teamId 
            ? { 
                ...team, 
                members: [...(team.members || []), updatedTeam.member],
                memberCount: team.memberCount ? team.memberCount + 1 : 1
              } 
            : team
        )
      );
      
      return updatedTeam;
    } catch (err) {
      console.error('Error adding team member:', err);
      throw err;
    }
  }, []);
  
  // Remove team member
  const removeTeamMember = useCallback(async (teamId, memberId) => {
    try {
      await collaborationService.removeTeamMember(teamId, memberId);
      
      // Update team by removing member
      setTeams(prev => 
        prev.map(team => 
          team.id === teamId 
            ? { 
                ...team, 
                members: (team.members || []).filter(member => member.id !== memberId),
                memberCount: Math.max(0, (team.memberCount || 0) - 1)
              } 
            : team
        )
      );
    } catch (err) {
      console.error('Error removing team member:', err);
      throw err;
    }
  }, []);
  
  // Accept team invitation
  const acceptInvitation = useCallback(async (invitationId) => {
    try {
      await collaborationService.acceptTeamInvitation(invitationId);
      
      // Remove invitation from list
      setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
      
      // Refresh teams as a new team was added
      fetchTeams();
    } catch (err) {
      console.error('Error accepting team invitation:', err);
      throw err;
    }
  }, [fetchTeams]);
  
  // Decline team invitation
  const declineInvitation = useCallback(async (invitationId) => {
    try {
      await collaborationService.declineTeamInvitation(invitationId);
      
      // Remove invitation from list
      setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
    } catch (err) {
      console.error('Error declining team invitation:', err);
      throw err;
    }
  }, []);
  
  // Get team members
  const getTeamMembers = useCallback(async (teamId) => {
    try {
      const members = await collaborationService.getTeamMembers(teamId);
      return members;
    } catch (err) {
      console.error('Error fetching team members:', err);
      throw err;
    }
  }, []);
  
  // Get team projects
  const getTeamProjects = useCallback(async (teamId) => {
    try {
      const projects = await collaborationService.getTeamProjects(teamId);
      return projects;
    } catch (err) {
      console.error('Error fetching team projects:', err);
      throw err;
    }
  }, []);
  
  // Refresh all data
  const refresh = useCallback(() => {
    fetchTeams();
    fetchInvitations();
  }, [fetchTeams, fetchInvitations]);
  
  // Initialize data
  useEffect(() => {
    if (userId) {
      fetchTeams();
      fetchInvitations();
    }
  }, [userId, fetchTeams, fetchInvitations]);
  
  return {
    // State
    teams,
    invitations,
    loading,
    error,
    
    // Actions
    fetchTeams,
    createTeam,
    updateTeam,
    deleteTeam,
    addTeamMember,
    removeTeamMember,
    acceptInvitation,
    declineInvitation,
    getTeamMembers,
    getTeamProjects,
    refresh
  };
};

export default useCollaboration;