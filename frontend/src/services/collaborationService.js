import apiClient from './apiClient';

/**
 * Collaboration Service
 * Handles team and collaboration-related operations
 */

// Get user teams
export const getUserTeams = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/teams`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user teams:', error);
    throw error;
  }
};

// Get team by ID
export const getTeamById = async (teamId) => {
  try {
    const response = await apiClient.get(`/teams/${teamId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team:', error);
    throw error;
  }
};

// Create team
export const createTeam = async (teamData) => {
  try {
    const response = await apiClient.post('/teams', teamData);
    return response.data;
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
};

// Update team
export const updateTeam = async (teamId, teamData) => {
  try {
    const response = await apiClient.patch(`/teams/${teamId}`, teamData);
    return response.data;
  } catch (error) {
    console.error('Error updating team:', error);
    throw error;
  }
};

// Delete team
export const deleteTeam = async (teamId) => {
  try {
    const response = await apiClient.delete(`/teams/${teamId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting team:', error);
    throw error;
  }
};

// Add team member
export const addTeamMember = async (teamId, memberData) => {
  try {
    const response = await apiClient.post(`/teams/${teamId}/members`, memberData);
    return response.data;
  } catch (error) {
    console.error('Error adding team member:', error);
    throw error;
  }
};

// Remove team member
export const removeTeamMember = async (teamId, memberId) => {
  try {
    const response = await apiClient.delete(`/teams/${teamId}/members/${memberId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing team member:', error);
    throw error;
  }
};

// Get team members
export const getTeamMembers = async (teamId) => {
  try {
    const response = await apiClient.get(`/teams/${teamId}/members`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
};

// Get team projects
export const getTeamProjects = async (teamId) => {
  try {
    const response = await apiClient.get(`/teams/${teamId}/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team projects:', error);
    throw error;
  }
};

// Assign project to team
export const assignProjectToTeam = async (teamId, projectId) => {
  try {
    const response = await apiClient.post(`/teams/${teamId}/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error assigning project to team:', error);
    throw error;
  }
};

// Remove project from team
export const removeProjectFromTeam = async (teamId, projectId) => {
  try {
    const response = await apiClient.delete(`/teams/${teamId}/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing project from team:', error);
    throw error;
  }
};

// Create team discussion
export const createTeamDiscussion = async (teamId, discussionData) => {
  try {
    const response = await apiClient.post(`/teams/${teamId}/discussions`, discussionData);
    return response.data;
  } catch (error) {
    console.error('Error creating team discussion:', error);
    throw error;
  }
};

// Get team discussions
export const getTeamDiscussions = async (teamId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 20,
      offset: options.offset || 0,
      ...options
    };
    
    const response = await apiClient.get(`/teams/${teamId}/discussions`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching team discussions:', error);
    throw error;
  }
};

// Add discussion comment
export const addDiscussionComment = async (discussionId, commentData) => {
  try {
    const response = await apiClient.post(`/discussions/${discussionId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error adding discussion comment:', error);
    throw error;
  }
};

// Get discussion comments
export const getDiscussionComments = async (discussionId) => {
  try {
    const response = await apiClient.get(`/discussions/${discussionId}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching discussion comments:', error);
    throw error;
  }
};

// Get team activity feed
export const getTeamActivityFeed = async (teamId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 50,
      offset: options.offset || 0,
      ...options
    };
    
    const response = await apiClient.get(`/teams/${teamId}/activity`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching team activity feed:', error);
    throw error;
  }
};

// Get team statistics
export const getTeamStats = async (teamId) => {
  try {
    const response = await apiClient.get(`/teams/${teamId}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team statistics:', error);
    throw error;
  }
};

// Get user's team invitations
export const getTeamInvitations = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/team-invitations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team invitations:', error);
    throw error;
  }
};

// Accept team invitation
export const acceptTeamInvitation = async (invitationId) => {
  try {
    const response = await apiClient.post(`/team-invitations/${invitationId}/accept`);
    return response.data;
  } catch (error) {
    console.error('Error accepting team invitation:', error);
    throw error;
  }
};

// Decline team invitation
export const declineTeamInvitation = async (invitationId) => {
  try {
    const response = await apiClient.post(`/team-invitations/${invitationId}/decline`);
    return response.data;
  } catch (error) {
    console.error('Error declining team invitation:', error);
    throw error;
  }
};

export default {
  getUserTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
  addTeamMember,
  removeTeamMember,
  getTeamMembers,
  getTeamProjects,
  assignProjectToTeam,
  removeProjectFromTeam,
  createTeamDiscussion,
  getTeamDiscussions,
  addDiscussionComment,
  getDiscussionComments,
  getTeamActivityFeed,
  getTeamStats,
  getTeamInvitations,
  acceptTeamInvitation,
  declineTeamInvitation
};