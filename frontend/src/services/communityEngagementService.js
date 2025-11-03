import apiClient from './apiClient';

/**
 * Community Engagement Service
 * Handles all community engagement and social impact operations
 */

// Get community engagement metrics
export const getEngagementMetrics = async (projectId, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || '30d',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/engagement-metrics`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching engagement metrics:', error);
    throw error;
  }
};

// Get community feedback
export const getCommunityFeedback = async (projectId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 50,
      offset: options.offset || 0,
      status: options.status || 'all',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/community-feedback`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching community feedback:', error);
    throw error;
  }
};

// Add community feedback
export const addCommunityFeedback = async (projectId, feedbackData) => {
  try {
    const response = await apiClient.post(`/projects/${projectId}/community-feedback`, feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error adding community feedback:', error);
    throw error;
  }
};

// Update community feedback
export const updateCommunityFeedback = async (feedbackId, feedbackData) => {
  try {
    const response = await apiClient.patch(`/community-feedback/${feedbackId}`, feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error updating community feedback:', error);
    throw error;
  }
};

// Delete community feedback
export const deleteCommunityFeedback = async (feedbackId) => {
  try {
    const response = await apiClient.delete(`/community-feedback/${feedbackId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting community feedback:', error);
    throw error;
  }
};

// Get community events
export const getCommunityEvents = async (projectId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 20,
      offset: options.offset || 0,
      status: options.status || 'upcoming',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/community-events`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching community events:', error);
    throw error;
  }
};

// Create community event
export const createCommunityEvent = async (projectId, eventData) => {
  try {
    const response = await apiClient.post(`/projects/${projectId}/community-events`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating community event:', error);
    throw error;
  }
};

// Update community event
export const updateCommunityEvent = async (eventId, eventData) => {
  try {
    const response = await apiClient.patch(`/community-events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error updating community event:', error);
    throw error;
  }
};

// Delete community event
export const deleteCommunityEvent = async (eventId) => {
  try {
    const response = await apiClient.delete(`/community-events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting community event:', error);
    throw error;
  }
};

// Register for community event
export const registerForEvent = async (eventId, registrationData) => {
  try {
    const response = await apiClient.post(`/community-events/${eventId}/register`, registrationData);
    return response.data;
  } catch (error) {
    console.error('Error registering for event:', error);
    throw error;
  }
};

// Get event registrations
export const getEventRegistrations = async (eventId) => {
  try {
    const response = await apiClient.get(`/community-events/${eventId}/registrations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event registrations:', error);
    throw error;
  }
};

// Get community stories
export const getCommunityStories = async (projectId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 20,
      offset: options.offset || 0,
      status: options.status || 'published',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/community-stories`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching community stories:', error);
    throw error;
  }
};

// Create community story
export const createCommunityStory = async (projectId, storyData) => {
  try {
    const response = await apiClient.post(`/projects/${projectId}/community-stories`, storyData);
    return response.data;
  } catch (error) {
    console.error('Error creating community story:', error);
    throw error;
  }
};

// Update community story
export const updateCommunityStory = async (storyId, storyData) => {
  try {
    const response = await apiClient.patch(`/community-stories/${storyId}`, storyData);
    return response.data;
  } catch (error) {
    console.error('Error updating community story:', error);
    throw error;
  }
};

// Delete community story
export const deleteCommunityStory = async (storyId) => {
  try {
    const response = await apiClient.delete(`/community-stories/${storyId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting community story:', error);
    throw error;
  }
};

// Get community leaders
export const getCommunityLeaders = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}/community-leaders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching community leaders:', error);
    throw error;
  }
};

// Add community leader
export const addCommunityLeader = async (projectId, leaderData) => {
  try {
    const response = await apiClient.post(`/projects/${projectId}/community-leaders`, leaderData);
    return response.data;
  } catch (error) {
    console.error('Error adding community leader:', error);
    throw error;
  }
};

// Remove community leader
export const removeCommunityLeader = async (leaderId) => {
  try {
    const response = await apiClient.delete(`/community-leaders/${leaderId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing community leader:', error);
    throw error;
  }
};

// Get community surveys
export const getCommunitySurveys = async (projectId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 10,
      offset: options.offset || 0,
      status: options.status || 'active',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/community-surveys`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching community surveys:', error);
    throw error;
  }
};

// Create community survey
export const createCommunitySurvey = async (projectId, surveyData) => {
  try {
    const response = await apiClient.post(`/projects/${projectId}/community-surveys`, surveyData);
    return response.data;
  } catch (error) {
    console.error('Error creating community survey:', error);
    throw error;
  }
};

// Get survey responses
export const getSurveyResponses = async (surveyId) => {
  try {
    const response = await apiClient.get(`/community-surveys/${surveyId}/responses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching survey responses:', error);
    throw error;
  }
};

// Submit survey response
export const submitSurveyResponse = async (surveyId, responseData) => {
  try {
    const response = await apiClient.post(`/community-surveys/${surveyId}/responses`, responseData);
    return response.data;
  } catch (error) {
    console.error('Error submitting survey response:', error);
    throw error;
  }
};

export default {
  getEngagementMetrics,
  getCommunityFeedback,
  addCommunityFeedback,
  updateCommunityFeedback,
  deleteCommunityFeedback,
  getCommunityEvents,
  createCommunityEvent,
  updateCommunityEvent,
  deleteCommunityEvent,
  registerForEvent,
  getEventRegistrations,
  getCommunityStories,
  createCommunityStory,
  updateCommunityStory,
  deleteCommunityStory,
  getCommunityLeaders,
  addCommunityLeader,
  removeCommunityLeader,
  getCommunitySurveys,
  createCommunitySurvey,
  getSurveyResponses,
  submitSurveyResponse
};