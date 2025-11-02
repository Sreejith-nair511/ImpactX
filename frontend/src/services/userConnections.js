/**
 * User connections service for managing relationships between users
 */

import api from './apiClient';

/**
 * Get user connections (followers/following)
 * @param {string} userId - User ID
 * @param {string} type - Connection type ('followers' or 'following')
 * @param {object} options - Query options
 * @returns {Promise<object>} Connections data
 */
export const getUserConnections = async (userId, type, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/connections/${type}`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    throw error;
  }
};

/**
 * Follow a user
 * @param {string} targetUserId - User ID to follow
 * @returns {Promise<object>} Follow response
 */
export const followUser = async (targetUserId) => {
  try {
    const response = await api.post(`/users/connections/follow`, {
      targetUserId
    });
    return response;
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
};

/**
 * Unfollow a user
 * @param {string} targetUserId - User ID to unfollow
 * @returns {Promise<object>} Unfollow response
 */
export const unfollowUser = async (targetUserId) => {
  try {
    const response = await api.delete(`/users/connections/unfollow/${targetUserId}`);
    return response;
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
};

/**
 * Get connection status between current user and target user
 * @param {string} targetUserId - Target user ID
 * @returns {Promise<object>} Connection status
 */
export const getConnectionStatus = async (targetUserId) => {
  try {
    const response = await api.get(`/users/connections/status/${targetUserId}`);
    return response;
  } catch (error) {
    console.error('Error fetching connection status:', error);
    throw error;
  }
};

/**
 * Get mutual connections between current user and target user
 * @param {string} targetUserId - Target user ID
 * @returns {Promise<Array>} Mutual connections
 */
export const getMutualConnections = async (targetUserId) => {
  try {
    const response = await api.get(`/users/connections/mutual/${targetUserId}`);
    return response.connections || [];
  } catch (error) {
    console.error('Error fetching mutual connections:', error);
    throw error;
  }
};

/**
 * Block a user
 * @param {string} targetUserId - User ID to block
 * @returns {Promise<object>} Block response
 */
export const blockUser = async (targetUserId) => {
  try {
    const response = await api.post(`/users/connections/block`, {
      targetUserId
    });
    return response;
  } catch (error) {
    console.error('Error blocking user:', error);
    throw error;
  }
};

/**
 * Unblock a user
 * @param {string} targetUserId - User ID to unblock
 * @returns {Promise<object>} Unblock response
 */
export const unblockUser = async (targetUserId) => {
  try {
    const response = await api.delete(`/users/connections/unblock/${targetUserId}`);
    return response;
  } catch (error) {
    console.error('Error unblocking user:', error);
    throw error;
  }
};

/**
 * Get blocked users
 * @returns {Promise<Array>} Blocked users
 */
export const getBlockedUsers = async () => {
  try {
    const response = await api.get(`/users/connections/blocked`);
    return response.users || [];
  } catch (error) {
    console.error('Error fetching blocked users:', error);
    throw error;
  }
};

/**
 * Send a connection request
 * @param {string} targetUserId - User ID to send request to
 * @param {string} message - Optional message
 * @returns {Promise<object>} Request response
 */
export const sendConnectionRequest = async (targetUserId, message = '') => {
  try {
    const response = await api.post(`/users/connections/request`, {
      targetUserId,
      message
    });
    return response;
  } catch (error) {
    console.error('Error sending connection request:', error);
    throw error;
  }
};

/**
 * Accept a connection request
 * @param {string} requestId - Request ID
 * @returns {Promise<object>} Accept response
 */
export const acceptConnectionRequest = async (requestId) => {
  try {
    const response = await api.post(`/users/connections/request/${requestId}/accept`);
    return response;
  } catch (error) {
    console.error('Error accepting connection request:', error);
    throw error;
  }
};

/**
 * Reject a connection request
 * @param {string} requestId - Request ID
 * @returns {Promise<object>} Reject response
 */
export const rejectConnectionRequest = async (requestId) => {
  try {
    const response = await api.post(`/users/connections/request/${requestId}/reject`);
    return response;
  } catch (error) {
    console.error('Error rejecting connection request:', error);
    throw error;
  }
};

/**
 * Get pending connection requests
 * @returns {Promise<Array>} Pending requests
 */
export const getPendingRequests = async () => {
  try {
    const response = await api.get(`/users/connections/requests/pending`);
    return response.requests || [];
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    throw error;
  }
};

/**
 * Search users by name or username
 * @param {string} query - Search query
 * @param {object} options - Search options
 * @returns {Promise<Array>} Search results
 */
export const searchUsers = async (query, options = {}) => {
  try {
    const response = await api.get(`/users/search`, {
      params: {
        q: query,
        ...options
      }
    });
    return response.users || [];
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

/**
 * Get suggested users to connect with
 * @param {object} options - Suggestion options
 * @returns {Promise<Array>} Suggested users
 */
export const getSuggestedUsers = async (options = {}) => {
  try {
    const response = await api.get(`/users/suggestions`, {
      params: options
    });
    return response.users || [];
  } catch (error) {
    console.error('Error fetching user suggestions:', error);
    throw error;
  }
};

// Default export
export default {
  getUserConnections,
  followUser,
  unfollowUser,
  getConnectionStatus,
  getMutualConnections,
  blockUser,
  unblockUser,
  getBlockedUsers,
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  getPendingRequests,
  searchUsers,
  getSuggestedUsers
};