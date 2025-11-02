import { useState, useEffect, useCallback } from 'react';
import * as userActivityService from '../services/userActivity';

/**
 * Custom hook for managing user activity
 * @param {string} userId - The ID of the user
 * @param {Object} options - Configuration options
 * @returns {Object} User activity state and actions
 */
export const useUserActivity = (userId, options = {}) => {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    liked: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch user activities
  const fetchActivities = useCallback(async (fetchOptions = {}) => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await userActivityService.getActivityFeed(userId, fetchOptions);
      setActivities(data.activities || data);
    } catch (err) {
      setError(err.message || 'Failed to fetch activities');
      console.error('Error fetching activities:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);
  
  // Fetch activity statistics
  const fetchStats = useCallback(async () => {
    if (!userId) return;
    
    try {
      const statistics = await userActivityService.getActivityStats(userId);
      setStats(statistics);
    } catch (err) {
      console.error('Error fetching activity statistics:', err);
    }
  }, [userId]);
  
  // Create activity
  const createActivity = useCallback(async (activityData) => {
    try {
      const newActivity = await userActivityService.createActivity(activityData);
      setActivities(prev => [newActivity, ...prev]);
      fetchStats(); // Refresh stats
      return newActivity;
    } catch (err) {
      console.error('Error creating activity:', err);
      throw err;
    }
  }, [fetchStats]);
  
  // Like activity
  const likeActivity = useCallback(async (activityId) => {
    try {
      const updatedActivity = await userActivityService.likeActivity(activityId, userId);
      
      setActivities(prev => 
        prev.map(activity => 
          activity.id === activityId 
            ? { ...activity, ...updatedActivity } 
            : activity
        )
      );
      
      fetchStats(); // Refresh stats
      return updatedActivity;
    } catch (err) {
      console.error('Error liking activity:', err);
      throw err;
    }
  }, [userId, fetchStats]);
  
  // Unlike activity
  const unlikeActivity = useCallback(async (activityId) => {
    try {
      const updatedActivity = await userActivityService.unlikeActivity(activityId, userId);
      
      setActivities(prev => 
        prev.map(activity => 
          activity.id === activityId 
            ? { ...activity, ...updatedActivity } 
            : activity
        )
      );
      
      fetchStats(); // Refresh stats
      return updatedActivity;
    } catch (err) {
      console.error('Error unliking activity:', err);
      throw err;
    }
  }, [userId, fetchStats]);
  
  // Add comment to activity
  const addActivityComment = useCallback(async (activityId, commentData) => {
    try {
      const comment = await userActivityService.addActivityComment(activityId, commentData);
      
      // Update activity with new comment count
      setActivities(prev => 
        prev.map(activity => 
          activity.id === activityId 
            ? { 
                ...activity, 
                commentsCount: activity.commentsCount ? activity.commentsCount + 1 : 1,
                latestComment: comment
              } 
            : activity
        )
      );
      
      return comment;
    } catch (err) {
      console.error('Error adding activity comment:', err);
      throw err;
    }
  }, []);
  
  // Mark activity as read
  const markAsRead = useCallback(async (activityId) => {
    try {
      await userActivityService.markActivityAsRead(activityId);
      
      // Update local state
      setActivities(prev => 
        prev.map(activity => 
          activity.id === activityId 
            ? { ...activity, read: true } 
            : activity
        )
      );
      
      // Update unread count
      setStats(prev => ({ ...prev, unread: Math.max(0, prev.unread - 1) }));
    } catch (err) {
      console.error('Error marking activity as read:', err);
    }
  }, []);
  
  // Refresh all data
  const refreshActivities = useCallback(() => {
    fetchActivities(options);
    fetchStats();
  }, [fetchActivities, fetchStats, options]);
  
  // Initialize data
  useEffect(() => {
    if (userId) {
      fetchActivities(options);
      fetchStats();
    }
  }, [userId, fetchActivities, fetchStats, options]);
  
  // Subscribe to real-time updates
  useEffect(() => {
    if (!userId) return;
    
    const unsubscribe = userActivityService.subscribeToActivityUpdates(userId, (newActivities) => {
      setActivities(prev => [...newActivities, ...prev]);
    });
    
    // Cleanup subscription
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userId]);
  
  return {
    // State
    activities,
    stats,
    loading,
    error,
    
    // Actions
    fetchActivities,
    createActivity,
    likeActivity,
    unlikeActivity,
    addActivityComment,
    markAsRead,
    refreshActivities
  };
};

export default useUserActivity;