import { useState, useEffect, useCallback } from 'react';
import * as communityEngagementService from '../services/communityEngagementService';

/**
 * Custom hook for managing community engagement and social impact
 * @param {string} projectId - The ID of the project
 * @param {Object} options - Configuration options
 * @returns {Object} Community engagement state and actions
 */
export const useCommunityEngagement = (projectId, options = {}) => {
  const [metrics, setMetrics] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [events, setEvents] = useState([]);
  const [stories, setStories] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch engagement metrics
  const fetchMetrics = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await communityEngagementService.getEngagementMetrics(projectId, fetchOptions);
      setMetrics(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch engagement metrics');
      console.error('Error fetching engagement metrics:', err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Fetch community feedback
  const fetchFeedback = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    try {
      const data = await communityEngagementService.getCommunityFeedback(projectId, fetchOptions);
      setFeedback(data.feedback || data);
    } catch (err) {
      console.error('Error fetching community feedback:', err);
    }
  }, [projectId]);
  
  // Add community feedback
  const addFeedback = useCallback(async (feedbackData) => {
    try {
      const newFeedback = await communityEngagementService.addCommunityFeedback(projectId, feedbackData);
      setFeedback(prev => [newFeedback, ...prev]);
      return newFeedback;
    } catch (err) {
      console.error('Error adding community feedback:', err);
      throw err;
    }
  }, [projectId]);
  
  // Update community feedback
  const updateFeedback = useCallback(async (feedbackId, feedbackData) => {
    try {
      const updatedFeedback = await communityEngagementService.updateCommunityFeedback(feedbackId, feedbackData);
      setFeedback(prev => 
        prev.map(item => 
          item.id === feedbackId ? { ...item, ...updatedFeedback } : item
        )
      );
      return updatedFeedback;
    } catch (err) {
      console.error('Error updating community feedback:', err);
      throw err;
    }
  }, []);
  
  // Delete community feedback
  const deleteFeedback = useCallback(async (feedbackId) => {
    try {
      await communityEngagementService.deleteCommunityFeedback(feedbackId);
      setFeedback(prev => prev.filter(item => item.id !== feedbackId));
    } catch (err) {
      console.error('Error deleting community feedback:', err);
      throw err;
    }
  }, []);
  
  // Fetch community events
  const fetchEvents = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    try {
      const data = await communityEngagementService.getCommunityEvents(projectId, fetchOptions);
      setEvents(data.events || data);
    } catch (err) {
      console.error('Error fetching community events:', err);
    }
  }, [projectId]);
  
  // Create community event
  const createEvent = useCallback(async (eventData) => {
    try {
      const newEvent = await communityEngagementService.createCommunityEvent(projectId, eventData);
      setEvents(prev => [newEvent, ...prev]);
      return newEvent;
    } catch (err) {
      console.error('Error creating community event:', err);
      throw err;
    }
  }, [projectId]);
  
  // Update community event
  const updateEvent = useCallback(async (eventId, eventData) => {
    try {
      const updatedEvent = await communityEngagementService.updateCommunityEvent(eventId, eventData);
      setEvents(prev => 
        prev.map(event => 
          event.id === eventId ? { ...event, ...updatedEvent } : event
        )
      );
      return updatedEvent;
    } catch (err) {
      console.error('Error updating community event:', err);
      throw err;
    }
  }, []);
  
  // Delete community event
  const deleteEvent = useCallback(async (eventId) => {
    try {
      await communityEngagementService.deleteCommunityEvent(eventId);
      setEvents(prev => prev.filter(event => event.id !== eventId));
    } catch (err) {
      console.error('Error deleting community event:', err);
      throw err;
    }
  }, []);
  
  // Register for event
  const registerForEvent = useCallback(async (eventId, registrationData) => {
    try {
      const registration = await communityEngagementService.registerForEvent(eventId, registrationData);
      return registration;
    } catch (err) {
      console.error('Error registering for event:', err);
      throw err;
    }
  }, []);
  
  // Fetch community stories
  const fetchStories = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    try {
      const data = await communityEngagementService.getCommunityStories(projectId, fetchOptions);
      setStories(data.stories || data);
    } catch (err) {
      console.error('Error fetching community stories:', err);
    }
  }, [projectId]);
  
  // Create community story
  const createStory = useCallback(async (storyData) => {
    try {
      const newStory = await communityEngagementService.createCommunityStory(projectId, storyData);
      setStories(prev => [newStory, ...prev]);
      return newStory;
    } catch (err) {
      console.error('Error creating community story:', err);
      throw err;
    }
  }, [projectId]);
  
  // Update community story
  const updateStory = useCallback(async (storyId, storyData) => {
    try {
      const updatedStory = await communityEngagementService.updateCommunityStory(storyId, storyData);
      setStories(prev => 
        prev.map(story => 
          story.id === storyId ? { ...story, ...updatedStory } : story
        )
      );
      return updatedStory;
    } catch (err) {
      console.error('Error updating community story:', err);
      throw err;
    }
  }, []);
  
  // Delete community story
  const deleteStory = useCallback(async (storyId) => {
    try {
      await communityEngagementService.deleteCommunityStory(storyId);
      setStories(prev => prev.filter(story => story.id !== storyId));
    } catch (err) {
      console.error('Error deleting community story:', err);
      throw err;
    }
  }, []);
  
  // Fetch community leaders
  const fetchLeaders = useCallback(async () => {
    if (!projectId) return;
    
    try {
      const data = await communityEngagementService.getCommunityLeaders(projectId);
      setLeaders(data.leaders || data);
    } catch (err) {
      console.error('Error fetching community leaders:', err);
    }
  }, [projectId]);
  
  // Add community leader
  const addLeader = useCallback(async (leaderData) => {
    try {
      const newLeader = await communityEngagementService.addCommunityLeader(projectId, leaderData);
      setLeaders(prev => [newLeader, ...prev]);
      return newLeader;
    } catch (err) {
      console.error('Error adding community leader:', err);
      throw err;
    }
  }, [projectId]);
  
  // Remove community leader
  const removeLeader = useCallback(async (leaderId) => {
    try {
      await communityEngagementService.removeCommunityLeader(leaderId);
      setLeaders(prev => prev.filter(leader => leader.id !== leaderId));
    } catch (err) {
      console.error('Error removing community leader:', err);
      throw err;
    }
  }, []);
  
  // Fetch community surveys
  const fetchSurveys = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    try {
      const data = await communityEngagementService.getCommunitySurveys(projectId, fetchOptions);
      setSurveys(data.surveys || data);
    } catch (err) {
      console.error('Error fetching community surveys:', err);
    }
  }, [projectId]);
  
  // Create community survey
  const createSurvey = useCallback(async (surveyData) => {
    try {
      const newSurvey = await communityEngagementService.createCommunitySurvey(projectId, surveyData);
      setSurveys(prev => [newSurvey, ...prev]);
      return newSurvey;
    } catch (err) {
      console.error('Error creating community survey:', err);
      throw err;
    }
  }, [projectId]);
  
  // Submit survey response
  const submitSurveyResponse = useCallback(async (surveyId, responseData) => {
    try {
      const response = await communityEngagementService.submitSurveyResponse(surveyId, responseData);
      return response;
    } catch (err) {
      console.error('Error submitting survey response:', err);
      throw err;
    }
  }, []);
  
  // Refresh all data
  const refresh = useCallback(() => {
    fetchMetrics(options);
    fetchFeedback(options);
    fetchEvents(options);
    fetchStories(options);
    fetchLeaders();
    fetchSurveys(options);
  }, [
    fetchMetrics,
    fetchFeedback,
    fetchEvents,
    fetchStories,
    fetchLeaders,
    fetchSurveys,
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
    metrics,
    feedback,
    events,
    stories,
    leaders,
    surveys,
    loading,
    error,
    
    // Actions
    fetchMetrics,
    fetchFeedback,
    addFeedback,
    updateFeedback,
    deleteFeedback,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    fetchStories,
    createStory,
    updateStory,
    deleteStory,
    fetchLeaders,
    addLeader,
    removeLeader,
    fetchSurveys,
    createSurvey,
    submitSurveyResponse,
    refresh
  };
};

export default useCommunityEngagement;