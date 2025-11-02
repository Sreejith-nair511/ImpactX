import apiClient from './apiClient';

/**
 * User Activity Service
 * Handles all user activity-related operations
 */

// Get user activities
export const getUserActivities = async (userId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 50,
      offset: options.offset || 0,
      type: options.type || 'all',
      timeframe: options.timeframe || 'all',
      ...options
    };
    
    const response = await apiClient.get(`/users/${userId}/activities`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching user activities:', error);
    throw error;
  }
};

// Get activity by ID
export const getActivityById = async (activityId) => {
  try {
    const response = await apiClient.get(`/activities/${activityId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching activity:', error);
    throw error;
  }
};

// Create activity
export const createActivity = async (activityData) => {
  try {
    const response = await apiClient.post('/activities', activityData);
    return response.data;
  } catch (error) {
    console.error('Error creating activity:', error);
    throw error;
  }
};

// Update activity
export const updateActivity = async (activityId, activityData) => {
  try {
    const response = await apiClient.patch(`/activities/${activityId}`, activityData);
    return response.data;
  } catch (error) {
    console.error('Error updating activity:', error);
    throw error;
  }
};

// Delete activity
export const deleteActivity = async (activityId) => {
  try {
    const response = await apiClient.delete(`/activities/${activityId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting activity:', error);
    throw error;
  }
};

// Get activity feed for user
export const getActivityFeed = async (userId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 20,
      offset: options.offset || 0,
      includeFollowed: options.includeFollowed || true,
      includeTeams: options.includeTeams || true,
      includeProjects: options.includeProjects || true,
      ...options
    };
    
    const response = await apiClient.get(`/users/${userId}/feed`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching activity feed:', error);
    throw error;
  }
};

// Like activity
export const likeActivity = async (activityId, userId) => {
  try {
    const response = await apiClient.post(`/activities/${activityId}/like`, { userId });
    return response.data;
  } catch (error) {
    console.error('Error liking activity:', error);
    throw error;
  }
};

// Unlike activity
export const unlikeActivity = async (activityId, userId) => {
  try {
    const response = await apiClient.delete(`/activities/${activityId}/like/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error unliking activity:', error);
    throw error;
  }
};

// Add comment to activity
export const addActivityComment = async (activityId, commentData) => {
  try {
    const response = await apiClient.post(`/activities/${activityId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error adding activity comment:', error);
    throw error;
  }
};

// Get activity comments
export const getActivityComments = async (activityId) => {
  try {
    const response = await apiClient.get(`/activities/${activityId}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching activity comments:', error);
    throw error;
  }
};

// Get user's liked activities
export const getUserLikedActivities = async (userId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 20,
      offset: options.offset || 0,
      ...options
    };
    
    const response = await apiClient.get(`/users/${userId}/liked-activities`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching user liked activities:', error);
    throw error;
  }
};

// Get activity statistics
export const getActivityStats = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/activity-stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching activity statistics:', error);
    throw error;
  }
};

// Mark activity as read
export const markActivityAsRead = async (activityId) => {
  try {
    const response = await apiClient.patch(`/activities/${activityId}/read`);
    return response.data;
  } catch (error) {
    console.error('Error marking activity as read:', error);
    throw error;
  }
};

// Get unread activity count
export const getUnreadActivityCount = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/unread-activity-count`);
    return response.data.count;
  } catch (error) {
    console.error('Error fetching unread activity count:', error);
    throw error;
  }
};

// Subscribe to real-time activity updates
export const subscribeToActivityUpdates = (userId, callback) => {
  // This would typically connect to a WebSocket or similar real-time service
  // For now, we'll simulate with periodic polling
  const interval = setInterval(async () => {
    try {
      const activities = await getActivityFeed(userId, { limit: 5 });
      if (activities.length > 0) {
        callback(activities);
      }
    } catch (error) {
      console.error('Error in activity subscription:', error);
    }
  }, 30000); // Check every 30 seconds
  
  // Return cleanup function
  return () => clearInterval(interval);
};

export default {
  getUserActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  getActivityFeed,
  likeActivity,
  unlikeActivity,
  addActivityComment,
  getActivityComments,
  getUserLikedActivities,
  getActivityStats,
  markActivityAsRead,
  getUnreadActivityCount,
  subscribeToActivityUpdates
};