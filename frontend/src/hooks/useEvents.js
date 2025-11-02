import { useState, useEffect, useCallback } from 'react';
import * as eventsService from '../services/eventsService';

/**
 * Custom hook for managing user events
 * @param {string} userId - User ID
 * @returns {object} Events management functions and state
 */
export const useEvents = (userId) => {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch user events
   */
  const fetchEvents = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await eventsService.getUserEvents(userId);
      setEvents(data);
    } catch (err) {
      setError(err.message || 'Failed to load events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Fetch upcoming events
   */
  const fetchUpcomingEvents = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await eventsService.getUpcomingEvents({ userId });
      setUpcomingEvents(data);
    } catch (err) {
      console.error('Error fetching upcoming events:', err);
    }
  }, [userId]);

  /**
   * Fetch past events
   */
  const fetchPastEvents = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await eventsService.getPastEvents({ userId });
      setPastEvents(data);
    } catch (err) {
      console.error('Error fetching past events:', err);
    }
  }, [userId]);

  /**
   * Fetch event types
   */
  const fetchEventTypes = useCallback(async () => {
    try {
      const data = await eventsService.getEventTypes();
      setEventTypes(data);
    } catch (err) {
      console.error('Error fetching event types:', err);
    }
  }, []);

  /**
   * Fetch event statistics
   */
  const fetchStats = useCallback(async () => {
    try {
      const data = await eventsService.getEventStats();
      setStats(data);
    } catch (err) {
      console.error('Error fetching event stats:', err);
    }
  }, []);

  /**
   * Create event
   * @param {object} eventData - Event data
   */
  const createEvent = useCallback(async (eventData) => {
    try {
      const newEvent = await eventsService.createEvent(eventData);
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (err) {
      setError(err.message || 'Failed to create event');
      console.error('Error creating event:', err);
      throw err;
    }
  }, []);

  /**
   * Update event
   * @param {string} eventId - Event ID
   * @param {object} eventData - Updated event data
   */
  const updateEvent = useCallback(async (eventId, eventData) => {
    try {
      const updatedEvent = await eventsService.updateEvent(eventId, eventData);
      setEvents(prev => 
        prev.map(event => 
          event.id === eventId ? updatedEvent : event
        )
      );
      return updatedEvent;
    } catch (err) {
      setError(err.message || 'Failed to update event');
      console.error('Error updating event:', err);
      throw err;
    }
  }, []);

  /**
   * Delete event
   * @param {string} eventId - Event ID
   */
  const deleteEvent = useCallback(async (eventId) => {
    try {
      await eventsService.deleteEvent(eventId);
      setEvents(prev => prev.filter(event => event.id !== eventId));
    } catch (err) {
      setError(err.message || 'Failed to delete event');
      console.error('Error deleting event:', err);
      throw err;
    }
  }, []);

  /**
   * Get events by date range
   * @param {string} startDate - Start date (ISO format)
   * @param {string} endDate - End date (ISO format)
   * @param {object} options - Query options
   * @returns {Promise<Array>} Events in date range
   */
  const getEventsByDateRange = useCallback(async (startDate, endDate, options = {}) => {
    try {
      const data = await eventsService.getEventsByDateRange(startDate, endDate, options);
      return data;
    } catch (err) {
      console.error('Error fetching events by date range:', err);
      return [];
    }
  }, []);

  /**
   * Search events
   * @param {string} query - Search query
   * @param {object} options - Search options
   * @returns {Promise<Array>} Search results
   */
  const searchEvents = useCallback(async (query, options = {}) => {
    try {
      const results = await eventsService.searchEvents(query, options);
      return results;
    } catch (err) {
      setError(err.message || 'Failed to search events');
      console.error('Error searching events:', err);
      return [];
    }
  }, []);

  /**
   * Add participant to event
   * @param {string} eventId - Event ID
   * @param {object} participantData - Participant data
   */
  const addParticipant = useCallback(async (eventId, participantData) => {
    try {
      const response = await eventsService.addParticipant(eventId, participantData);
      
      // Update local state
      setEvents(prev => 
        prev.map(event => 
          event.id === eventId 
            ? { 
                ...event, 
                participants: event.participants ? [...event.participants, response.participant] : [response.participant],
                participantCount: (event.participantCount || 0) + 1
              } 
            : event
        )
      );
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to add participant');
      console.error('Error adding participant:', err);
      throw err;
    }
  }, []);

  /**
   * Remove participant from event
   * @param {string} eventId - Event ID
   * @param {string} participantId - Participant ID
   */
  const removeParticipant = useCallback(async (eventId, participantId) => {
    try {
      await eventsService.removeParticipant(eventId, participantId);
      
      // Update local state
      setEvents(prev => 
        prev.map(event => 
          event.id === eventId 
            ? { 
                ...event, 
                participants: event.participants ? event.participants.filter(p => p.id !== participantId) : [],
                participantCount: Math.max(0, (event.participantCount || 0) - 1)
              } 
            : event
        )
      );
    } catch (err) {
      setError(err.message || 'Failed to remove participant');
      console.error('Error removing participant:', err);
      throw err;
    }
  }, []);

  /**
   * Update participant status
   * @param {string} eventId - Event ID
   * @param {string} userId - User ID
   * @param {object} statusData - Status data
   */
  const updateParticipantStatus = useCallback(async (eventId, userId, statusData) => {
    try {
      const response = await eventsService.updateParticipantStatus(eventId, userId, statusData);
      
      // Update local state
      setEvents(prev => 
        prev.map(event => 
          event.id === eventId 
            ? { 
                ...event, 
                participants: event.participants ? 
                  event.participants.map(p => 
                    p.userId === userId ? { ...p, ...response } : p
                  ) : []
              } 
            : event
        )
      );
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to update participant status');
      console.error('Error updating participant status:', err);
      throw err;
    }
  }, []);

  /**
   * Get event invitations
   * @param {object} options - Query options
   * @returns {Promise<Array>} Event invitations
   */
  const getInvitations = useCallback(async (options = {}) => {
    if (!userId) return [];
    
    try {
      const invitations = await eventsService.getEventInvitations(userId, options);
      return invitations;
    } catch (err) {
      console.error('Error fetching event invitations:', err);
      return [];
    }
  }, [userId]);

  /**
   * Accept event invitation
   * @param {string} invitationId - Invitation ID
   */
  const acceptInvitation = useCallback(async (invitationId) => {
    try {
      const response = await eventsService.acceptInvitation(invitationId);
      
      // Update local state
      setUpcomingEvents(prev => [...prev, response.event]);
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to accept invitation');
      console.error('Error accepting invitation:', err);
      throw err;
    }
  }, []);

  /**
   * Decline event invitation
   * @param {string} invitationId - Invitation ID
   */
  const declineInvitation = useCallback(async (invitationId) => {
    try {
      await eventsService.declineInvitation(invitationId);
    } catch (err) {
      setError(err.message || 'Failed to decline invitation');
      console.error('Error declining invitation:', err);
      throw err;
    }
  }, []);

  /**
   * Export events
   * @param {object} options - Export options
   * @returns {Promise<object>} Exported events
   */
  const exportEvents = useCallback(async (options = {}) => {
    try {
      const exported = await eventsService.exportEvents(options);
      return exported;
    } catch (err) {
      setError(err.message || 'Failed to export events');
      console.error('Error exporting events:', err);
      throw err;
    }
  }, []);

  /**
   * Import events
   * @param {object} importData - Import data
   */
  const importEvents = useCallback(async (importData) => {
    try {
      const response = await eventsService.importEvents(importData);
      
      // Update local state with imported events
      if (response.events) {
        setEvents(prev => [...prev, ...response.events]);
      }
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to import events');
      console.error('Error importing events:', err);
      throw err;
    }
  }, []);

  /**
   * Get event notifications
   * @param {object} options - Query options
   * @returns {Promise<Array>} Event notifications
   */
  const getNotifications = useCallback(async (options = {}) => {
    try {
      const notifications = await eventsService.getEventNotifications(options);
      return notifications;
    } catch (err) {
      console.error('Error fetching event notifications:', err);
      return [];
    }
  }, []);

  /**
   * Mark event notification as read
   * @param {string} notificationId - Notification ID
   */
  const markNotificationAsRead = useCallback(async (notificationId) => {
    try {
      await eventsService.markEventNotificationAsRead(notificationId);
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  }, []);

  // Fetch events, upcoming events, past events, event types, and stats on mount and when userId changes
  useEffect(() => {
    if (userId) {
      fetchEvents();
      fetchUpcomingEvents();
      fetchPastEvents();
      fetchEventTypes();
      fetchStats();
    }
  }, [userId, fetchEvents, fetchUpcomingEvents, fetchPastEvents, fetchEventTypes, fetchStats]);

  return {
    events,
    upcomingEvents,
    pastEvents,
    eventTypes,
    stats,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventsByDateRange,
    searchEvents,
    addParticipant,
    removeParticipant,
    updateParticipantStatus,
    getInvitations,
    acceptInvitation,
    declineInvitation,
    exportEvents,
    importEvents,
    getNotifications,
    markNotificationAsRead
  };
};

export default useEvents;