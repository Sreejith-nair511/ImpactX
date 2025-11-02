/**
 * Messaging service for handling user communications
 */

import api from './apiClient';

/**
 * Get user conversations
 * @param {object} options - Query options
 * @returns {Promise<Array>} User conversations
 */
export const getConversations = async (options = {}) => {
  try {
    const response = await api.get('/messages/conversations', {
      params: options
    });
    return response.conversations || [];
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

/**
 * Get conversation messages
 * @param {string} conversationId - Conversation ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} Conversation messages
 */
export const getMessages = async (conversationId, options = {}) => {
  try {
    const response = await api.get(`/messages/conversations/${conversationId}`, {
      params: options
    });
    return response.messages || [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

/**
 * Send a message
 * @param {string} conversationId - Conversation ID
 * @param {object} messageData - Message data
 * @returns {Promise<object>} Sent message
 */
export const sendMessage = async (conversationId, messageData) => {
  try {
    const response = await api.post(`/messages/conversations/${conversationId}`, messageData);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

/**
 * Create a new conversation
 * @param {object} conversationData - Conversation data
 * @returns {Promise<object>} Created conversation
 */
export const createConversation = async (conversationData) => {
  try {
    const response = await api.post('/messages/conversations', conversationData);
    return response;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
};

/**
 * Mark conversation as read
 * @param {string} conversationId - Conversation ID
 * @returns {Promise<object>} Read status
 */
export const markAsRead = async (conversationId) => {
  try {
    const response = await api.post(`/messages/conversations/${conversationId}/read`);
    return response;
  } catch (error) {
    console.error('Error marking conversation as read:', error);
    throw error;
  }
};

/**
 * Get unread message count
 * @returns {Promise<number>} Unread message count
 */
export const getUnreadCount = async () => {
  try {
    const response = await api.get('/messages/unread');
    return response.count || 0;
  } catch (error) {
    console.error('Error fetching unread count:', error);
    throw error;
  }
};

/**
 * Delete a conversation
 * @param {string} conversationId - Conversation ID
 * @returns {Promise<object>} Delete response
 */
export const deleteConversation = async (conversationId) => {
  try {
    const response = await api.delete(`/messages/conversations/${conversationId}`);
    return response;
  } catch (error) {
    console.error('Error deleting conversation:', error);
    throw error;
  }
};

/**
 * Block a user from messaging
 * @param {string} userId - User ID to block
 * @returns {Promise<object>} Block response
 */
export const blockUser = async (userId) => {
  try {
    const response = await api.post('/messages/block', { userId });
    return response;
  } catch (error) {
    console.error('Error blocking user:', error);
    throw error;
  }
};

/**
 * Unblock a user
 * @param {string} userId - User ID to unblock
 * @returns {Promise<object>} Unblock response
 */
export const unblockUser = async (userId) => {
  try {
    const response = await api.delete(`/messages/block/${userId}`);
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
    const response = await api.get('/messages/blocked');
    return response.users || [];
  } catch (error) {
    console.error('Error fetching blocked users:', error);
    throw error;
  }
};

/**
 * Search messages
 * @param {string} query - Search query
 * @param {object} options - Search options
 * @returns {Promise<Array>} Search results
 */
export const searchMessages = async (query, options = {}) => {
  try {
    const response = await api.get('/messages/search', {
      params: {
        q: query,
        ...options
      }
    });
    return response.messages || [];
  } catch (error) {
    console.error('Error searching messages:', error);
    throw error;
  }
};

/**
 * Get conversation participants
 * @param {string} conversationId - Conversation ID
 * @returns {Promise<Array>} Conversation participants
 */
export const getParticipants = async (conversationId) => {
  try {
    const response = await api.get(`/messages/conversations/${conversationId}/participants`);
    return response.participants || [];
  } catch (error) {
    console.error('Error fetching participants:', error);
    throw error;
  }
};

/**
 * Add participant to conversation
 * @param {string} conversationId - Conversation ID
 * @param {string} userId - User ID to add
 * @returns {Promise<object>} Add response
 */
export const addParticipant = async (conversationId, userId) => {
  try {
    const response = await api.post(`/messages/conversations/${conversationId}/participants`, { userId });
    return response;
  } catch (error) {
    console.error('Error adding participant:', error);
    throw error;
  }
};

/**
 * Remove participant from conversation
 * @param {string} conversationId - Conversation ID
 * @param {string} userId - User ID to remove
 * @returns {Promise<object>} Remove response
 */
export const removeParticipant = async (conversationId, userId) => {
  try {
    const response = await api.delete(`/messages/conversations/${conversationId}/participants/${userId}`);
    return response;
  } catch (error) {
    console.error('Error removing participant:', error);
    throw error;
  }
};

/**
 * Update conversation settings
 * @param {string} conversationId - Conversation ID
 * @param {object} settings - Conversation settings
 * @returns {Promise<object>} Update response
 */
export const updateConversationSettings = async (conversationId, settings) => {
  try {
    const response = await api.put(`/messages/conversations/${conversationId}/settings`, settings);
    return response;
  } catch (error) {
    console.error('Error updating conversation settings:', error);
    throw error;
  }
};

/**
 * Get message attachments
 * @param {string} messageId - Message ID
 * @returns {Promise<Array>} Message attachments
 */
export const getMessageAttachments = async (messageId) => {
  try {
    const response = await api.get(`/messages/${messageId}/attachments`);
    return response.attachments || [];
  } catch (error) {
    console.error('Error fetching message attachments:', error);
    throw error;
  }
};

/**
 * Upload attachment to message
 * @param {string} conversationId - Conversation ID
 * @param {File} file - File to upload
 * @returns {Promise<object>} Upload response
 */
export const uploadAttachment = async (conversationId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(`/messages/conversations/${conversationId}/attachments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response;
  } catch (error) {
    console.error('Error uploading attachment:', error);
    throw error;
  }
};

// Default export
export default {
  getConversations,
  getMessages,
  sendMessage,
  createConversation,
  markAsRead,
  getUnreadCount,
  deleteConversation,
  blockUser,
  unblockUser,
  getBlockedUsers,
  searchMessages,
  getParticipants,
  addParticipant,
  removeParticipant,
  updateConversationSettings,
  getMessageAttachments,
  uploadAttachment
};