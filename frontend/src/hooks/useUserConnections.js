import { useState, useEffect, useCallback } from 'react';
import * as userConnectionsService from '../services/userConnections';

/**
 * Custom hook for managing user connections
 * @param {string} userId - User ID
 * @returns {object} Connection management functions and state
 */
export const useUserConnections = (userId) => {
  const [connections, setConnections] = useState({
    followers: [],
    following: [],
    suggestions: []
  });
  const [counts, setCounts] = useState({
    followers: 0,
    following: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch user connections
   */
  const fetchConnections = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch followers
      const followersData = await userConnectionsService.getUserConnections(userId, 'followers');
      // Fetch following
      const followingData = await userConnectionsService.getUserConnections(userId, 'following');
      
      setConnections(prev => ({
        ...prev,
        followers: followersData.connections || [],
        following: followingData.connections || []
      }));
      
      setCounts({
        followers: followersData.total || 0,
        following: followingData.total || 0
      });
    } catch (err) {
      setError(err.message || 'Failed to load connections');
      console.error('Error fetching connections:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Fetch suggested users
   */
  const fetchSuggestions = useCallback(async () => {
    if (!userId) return;
    
    try {
      const suggestionsData = await userConnectionsService.getSuggestedUsers();
      setConnections(prev => ({
        ...prev,
        suggestions: suggestionsData
      }));
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    }
  }, [userId]);

  /**
   * Follow a user
   * @param {string} targetUserId - User ID to follow
   */
  const followUser = useCallback(async (targetUserId) => {
    try {
      await userConnectionsService.followUser(targetUserId);
      
      // Update local state
      setConnections(prev => ({
        ...prev,
        following: [
          ...prev.following,
          prev.suggestions.find(u => u.id === targetUserId) || 
          prev.followers.find(u => u.id === targetUserId) ||
          { id: targetUserId }
        ]
      }));
      
      setCounts(prev => ({
        ...prev,
        following: prev.following + 1
      }));
      
      // Remove from suggestions if present
      setConnections(prev => ({
        ...prev,
        suggestions: prev.suggestions.filter(u => u.id !== targetUserId)
      }));
      
      return true;
    } catch (err) {
      setError(err.message || 'Failed to follow user');
      console.error('Error following user:', err);
      return false;
    }
  }, []);

  /**
   * Unfollow a user
   * @param {string} targetUserId - User ID to unfollow
   */
  const unfollowUser = useCallback(async (targetUserId) => {
    try {
      await userConnectionsService.unfollowUser(targetUserId);
      
      // Update local state
      setConnections(prev => ({
        ...prev,
        following: prev.following.filter(u => u.id !== targetUserId)
      }));
      
      setCounts(prev => ({
        ...prev,
        following: prev.following - 1
      }));
      
      return true;
    } catch (err) {
      setError(err.message || 'Failed to unfollow user');
      console.error('Error unfollowing user:', err);
      return false;
    }
  }, []);

  /**
   * Toggle follow status
   * @param {string} targetUserId - User ID to toggle
   * @param {boolean} isFollowing - Current follow status
   */
  const toggleFollow = useCallback(async (targetUserId, isFollowing) => {
    if (isFollowing) {
      return await unfollowUser(targetUserId);
    } else {
      return await followUser(targetUserId);
    }
  }, [followUser, unfollowUser]);

  /**
   * Block a user
   * @param {string} targetUserId - User ID to block
   */
  const blockUser = useCallback(async (targetUserId) => {
    try {
      await userConnectionsService.blockUser(targetUserId);
      
      // Remove from followers and following
      setConnections(prev => ({
        ...prev,
        followers: prev.followers.filter(u => u.id !== targetUserId),
        following: prev.following.filter(u => u.id !== targetUserId),
        suggestions: prev.suggestions.filter(u => u.id !== targetUserId)
      }));
      
      // Update counts
      setCounts(prev => {
        const followerCount = prev.followers - (connections.followers.some(u => u.id === targetUserId) ? 1 : 0);
        const followingCount = prev.following - (connections.following.some(u => u.id === targetUserId) ? 1 : 0);
        return {
          followers: followerCount,
          following: followingCount
        };
      });
      
      return true;
    } catch (err) {
      setError(err.message || 'Failed to block user');
      console.error('Error blocking user:', err);
      return false;
    }
  }, [connections]);

  /**
   * Search users
   * @param {string} query - Search query
   * @returns {Promise<Array>} Search results
   */
  const searchUsers = useCallback(async (query) => {
    try {
      const results = await userConnectionsService.searchUsers(query);
      return results;
    } catch (err) {
      setError(err.message || 'Failed to search users');
      console.error('Error searching users:', err);
      return [];
    }
  }, []);

  /**
   * Send connection request
   * @param {string} targetUserId - User ID to send request to
   * @param {string} message - Optional message
   */
  const sendConnectionRequest = useCallback(async (targetUserId, message = '') => {
    try {
      const response = await userConnectionsService.sendConnectionRequest(targetUserId, message);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to send connection request');
      console.error('Error sending connection request:', err);
      throw err;
    }
  }, []);

  /**
   * Accept connection request
   * @param {string} requestId - Request ID
   */
  const acceptConnectionRequest = useCallback(async (requestId) => {
    try {
      const response = await userConnectionsService.acceptConnectionRequest(requestId);
      
      // Update followers list
      if (response.user) {
        setConnections(prev => ({
          ...prev,
          followers: [...prev.followers, response.user]
        }));
        
        setCounts(prev => ({
          ...prev,
          followers: prev.followers + 1
        }));
      }
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to accept connection request');
      console.error('Error accepting connection request:', err);
      throw err;
    }
  }, []);

  /**
   * Reject connection request
   * @param {string} requestId - Request ID
   */
  const rejectConnectionRequest = useCallback(async (requestId) => {
    try {
      const response = await userConnectionsService.rejectConnectionRequest(requestId);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to reject connection request');
      console.error('Error rejecting connection request:', err);
      throw err;
    }
  }, []);

  // Fetch connections on mount and when userId changes
  useEffect(() => {
    if (userId) {
      fetchConnections();
      fetchSuggestions();
    }
  }, [userId, fetchConnections, fetchSuggestions]);

  return {
    connections,
    counts,
    loading,
    error,
    fetchConnections,
    followUser,
    unfollowUser,
    toggleFollow,
    blockUser,
    searchUsers,
    sendConnectionRequest,
    acceptConnectionRequest,
    rejectConnectionRequest
  };
};

export default useUserConnections;