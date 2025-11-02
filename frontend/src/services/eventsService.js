/**
 * Events service for managing user events and calendar
 */

import api from './apiClient';

/**
 * Get user events
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} User events
 */
export const getUserEvents = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/events`, {
      params: options
    });
    return response.events || [];
  } catch (error) {
    console.error('Error fetching user events:', error);
    throw error;
  }
};

/**
 * Get event details
 * @param {string} eventId - Event ID
 * @returns {Promise<object>} Event details
 */
export const getEvent = async (eventId) => {
  try {
    const response = await api.get(`/events/${eventId}`);
    return response;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

/**
 * Create event
 * @param {object} eventData - Event data
 * @returns {Promise<object>} Created event
 */
export const createEvent = async (eventData) => {
  try {
    const response = await api.post('/events', eventData);
    return response;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

/**
 * Update event
 * @param {string} eventId - Event ID
 * @param {object} eventData - Updated event data
 * @returns {Promise<object>} Updated event
 */
export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await api.put(`/events/${eventId}`, eventData);
    return response;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

/**
 * Delete event
 * @param {string} eventId - Event ID
 * @returns {Promise<object>} Delete response
 */
export const deleteEvent = async (eventId) => {
  try {
    const response = await api.delete(`/events/${eventId}`);
    return response;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

/**
 * Get events by date range
 * @param {string} startDate - Start date (ISO format)
 * @param {string} endDate - End date (ISO format)
 * @param {object} options - Query options
 * @returns {Promise<Array>} Events in date range
 */
export const getEventsByDateRange = async (startDate, endDate, options = {}) => {
  try {
    const response = await api.get('/events/date-range', {
      params: {
        startDate,
        endDate,
        ...options
      }
    });
    return response.events || [];
  } catch (error) {
    console.error('Error fetching events by date range:', error);
    throw error;
  }
};

/**
 * Get upcoming events
 * @param {object} options - Query options
 * @returns {Promise<Array>} Upcoming events
 */
export const getUpcomingEvents = async (options = {}) => {
  try {
    const response = await api.get('/events/upcoming', {
      params: options
    });
    return response.events || [];
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    throw error;
  }
};

/**
 * Get past events
 * @param {object} options - Query options
 * @returns {Promise<Array>} Past events
 */
export const getPastEvents = async (options = {}) => {
  try {
    const response = await api.get('/events/past', {
      params: options
    });
    return response.events || [];
  } catch (error) {
    console.error('Error fetching past events:', error);
    throw error;
  }
};

/**
 * Get event types
 * @returns {Promise<Array>} Event types
 */
export const getEventTypes = async () => {
  try {
    const response = await api.get('/events/types');
    return response.types || [];
  } catch (error) {
    console.error('Error fetching event types:', error);
    throw error;
  }
};

/**
 * Get events by type
 * @param {string} type - Event type
 * @param {object} options - Query options
 * @returns {Promise<Array>} Events by type
 */
export const getEventsByType = async (type, options = {}) => {
  try {
    const response = await api.get('/events/type', {
      params: {
        type,
        ...options
      }
    });
    return response.events || [];
  } catch (error) {
    console.error('Error fetching events by type:', error);
    throw error;
  }
};

/**
 * Search events
 * @param {string} query - Search query
 * @param {object} options - Search options
 * @returns {Promise<Array>} Search results
 */
export const searchEvents = async (query, options = {}) => {
  try {
    const response = await api.get('/events/search', {
      params: {
        q: query,
        ...options
      }
    });
    return response.events || [];
  } catch (error) {
    console.error('Error searching events:', error);
    throw error;
  }
};

/**
 * Get event participants
 * @param {string} eventId - Event ID
 * @returns {Promise<Array>} Event participants
 */
export const getEventParticipants = async (eventId) => {
  try {
    const response = await api.get(`/events/${eventId}/participants`);
    return response.participants || [];
  } catch (error) {
    console.error('Error fetching event participants:', error);
    throw error;
  }
};

/**
 * Add participant to event
 * @param {string} eventId - Event ID
 * @param {object} participantData - Participant data
 * @returns {Promise<object>} Added participant
 */
export const addParticipant = async (eventId, participantData) => {
  try {
    const response = await api.post(`/events/${eventId}/participants`, participantData);
    return response;
  } catch (error) {
    console.error('Error adding participant:', error);
    throw error;
  }
};

/**
 * Remove participant from event
 * @param {string} eventId - Event ID
 * @param {string} participantId - Participant ID
 * @returns {Promise<object>} Remove response
 */
export const removeParticipant = async (eventId, participantId) => {
  try {
    const response = await api.delete(`/events/${eventId}/participants/${participantId}`);
    return response;
  } catch (error) {
    console.error('Error removing participant:', error);
    throw error;
  }
};

/**
 * Get participant status
 * @param {string} eventId - Event ID
 * @param {string} userId - User ID
 * @returns {Promise<object>} Participant status
 */
export const getParticipantStatus = async (eventId, userId) => {
  try {
    const response = await api.get(`/events/${eventId}/participants/${userId}`);
    return response;
  } catch (error) {
    console.error('Error fetching participant status:', error);
    throw error;
  }
};

/**
 * Update participant status
 * @param {string} eventId - Event ID
 * @param {string} userId - User ID
 * @param {object} statusData - Status data
 * @returns {Promise<object>} Updated status
 */
export const updateParticipantStatus = async (eventId, userId, statusData) => {
  try {
    const response = await api.put(`/events/${eventId}/participants/${userId}`, statusData);
    return response;
  } catch (error) {
    console.error('Error updating participant status:', error);
    throw error;
  }
};

/**
 * Get event invitations
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} Event invitations
 */
export const getEventInvitations = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/events/invitations`, {
      params: options
    });
    return response.invitations || [];
  } catch (error) {
    console.error('Error fetching event invitations:', error);
    throw error;
  }
};

/**
 * Accept event invitation
 * @param {string} invitationId - Invitation ID
 * @returns {Promise<object>} Accept response
 */
export const acceptInvitation = async (invitationId) => {
  try {
    const response = await api.post(`/events/invitations/${invitationId}/accept`);
    return response;
  } catch (error) {
    console.error('Error accepting invitation:', error);
    throw error;
  }
};

/**
 * Decline event invitation
 * @param {string} invitationId - Invitation ID
 * @returns {Promise<object>} Decline response
 */
export const declineInvitation = async (invitationId) => {
  try {
    const response = await api.post(`/events/invitations/${invitationId}/decline`);
    return response;
  } catch (error) {
    console.error('Error declining invitation:', error);
    throw error;
  }
};

/**
 * Get event statistics
 * @param {object} options - Query options
 * @returns {Promise<object>} Event statistics
 */
export const getEventStats = async (options = {}) => {
  try {
    const response = await api.get('/events/stats', {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching event stats:', error);
    throw error;
  }
};

/**
 * Export events
 * @param {object} options - Export options
 * @returns {Promise<object>} Exported events
 */
export const exportEvents = async (options = {}) => {
  try {
    const response = await api.get('/events/export', {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error exporting events:', error);
    throw error;
  }
};

/**
 * Import events
 * @param {object} importData - Import data
 * @returns {Promise<object>} Import response
 */
export const importEvents = async (importData) => {
  try {
    const response = await api.post('/events/import', importData);
    return response;
  } catch (error) {
    console.error('Error importing events:', error);
    throw error;
  }
};

/**
 * Get event notifications
 * @param {object} options - Query options
 * @returns {Promise<Array>} Event notifications
 */
export const getEventNotifications = async (options = {}) => {
  try {
    const response = await api.get('/events/notifications', {
      params: options
    });
    return response.notifications || [];
  } catch (error) {
    console.error('Error fetching event notifications:', error);
    throw error;
  }
};

/**
 * Mark event notification as read
 * @param {string} notificationId - Notification ID
 * @returns {Promise<object>} Read status
 */
export const markEventNotificationAsRead = async (notificationId) => {
  try {
    const response = await api.post(`/events/notifications/${notificationId}/read`);
    return response;
  } catch (error) {
    console.error('Error marking event notification as read:', error);
    throw error;
  }
};

// Default export
export default {
  getUserEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByDateRange,
  getUpcomingEvents,
  getPastEvents,
  getEventTypes,
  getEventsByType,
  searchEvents,
  getEventParticipants,
  addParticipant,
  removeParticipant,
  getParticipantStatus,
  updateParticipantStatus,
  getEventInvitations,
  acceptInvitation,
  declineInvitation,
  getEventStats,
  exportEvents,
  importEvents,
  getEventNotifications,
  markEventNotificationAsRead
};