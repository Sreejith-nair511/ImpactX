import { useState, useEffect, useCallback } from 'react';
import * as messagingService from '../services/messagingService';

/**
 * Custom hook for managing user messaging
 * @returns {object} Messaging functions and state
 */
export const useMessaging = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch user conversations
   */
  const fetchConversations = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await messagingService.getConversations();
      setConversations(data);
    } catch (err) {
      setError(err.message || 'Failed to load conversations');
      console.error('Error fetching conversations:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch conversation messages
   * @param {string} conversationId - Conversation ID
   */
  const fetchMessages = useCallback(async (conversationId) => {
    if (!conversationId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await messagingService.getMessages(conversationId);
      setMessages(data);
      
      // Set active conversation
      const conversation = conversations.find(c => c.id === conversationId);
      if (conversation) {
        setActiveConversation(conversation);
      }
    } catch (err) {
      setError(err.message || 'Failed to load messages');
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  }, [conversations]);

  /**
   * Send a message
   * @param {string} conversationId - Conversation ID
   * @param {object} messageData - Message data
   */
  const sendMessage = useCallback(async (conversationId, messageData) => {
    try {
      const newMessage = await messagingService.sendMessage(conversationId, messageData);
      
      // Add message to local state
      setMessages(prev => [...prev, newMessage]);
      
      // Update conversation last message
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId 
            ? { ...conv, lastMessage: newMessage, updatedAt: new Date().toISOString() }
            : conv
        )
      );
      
      return newMessage;
    } catch (err) {
      setError(err.message || 'Failed to send message');
      console.error('Error sending message:', err);
      throw err;
    }
  }, []);

  /**
   * Create a new conversation
   * @param {object} conversationData - Conversation data
   */
  const createConversation = useCallback(async (conversationData) => {
    try {
      const newConversation = await messagingService.createConversation(conversationData);
      setConversations(prev => [newConversation, ...prev]);
      return newConversation;
    } catch (err) {
      setError(err.message || 'Failed to create conversation');
      console.error('Error creating conversation:', err);
      throw err;
    }
  }, []);

  /**
   * Mark conversation as read
   * @param {string} conversationId - Conversation ID
   */
  const markAsRead = useCallback(async (conversationId) => {
    try {
      await messagingService.markAsRead(conversationId);
      
      // Update local state
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId 
            ? { ...conv, unreadCount: 0 }
            : conv
        )
      );
      
      // Update unread count
      const newUnreadCount = await messagingService.getUnreadCount();
      setUnreadCount(newUnreadCount);
    } catch (err) {
      console.error('Error marking conversation as read:', err);
    }
  }, []);

  /**
   * Fetch unread message count
   */
  const fetchUnreadCount = useCallback(async () => {
    try {
      const count = await messagingService.getUnreadCount();
      setUnreadCount(count);
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  }, []);

  /**
   * Delete a conversation
   * @param {string} conversationId - Conversation ID
   */
  const deleteConversation = useCallback(async (conversationId) => {
    try {
      await messagingService.deleteConversation(conversationId);
      
      // Remove from local state
      setConversations(prev => prev.filter(conv => conv.id !== conversationId));
      
      // Clear active conversation if it was deleted
      if (activeConversation && activeConversation.id === conversationId) {
        setActiveConversation(null);
        setMessages([]);
      }
    } catch (err) {
      setError(err.message || 'Failed to delete conversation');
      console.error('Error deleting conversation:', err);
      throw err;
    }
  }, [activeConversation]);

  /**
   * Block a user
   * @param {string} userId - User ID to block
   */
  const blockUser = useCallback(async (userId) => {
    try {
      await messagingService.blockUser(userId);
      
      // Remove conversations with blocked user
      setConversations(prev => 
        prev.filter(conv => 
          !conv.participants.some(p => p.id === userId)
        )
      );
    } catch (err) {
      setError(err.message || 'Failed to block user');
      console.error('Error blocking user:', err);
      throw err;
    }
  }, []);

  /**
   * Search messages
   * @param {string} query - Search query
   * @returns {Promise<Array>} Search results
   */
  const searchMessages = useCallback(async (query) => {
    try {
      const results = await messagingService.searchMessages(query);
      return results;
    } catch (err) {
      setError(err.message || 'Failed to search messages');
      console.error('Error searching messages:', err);
      return [];
    }
  }, []);

  /**
   * Add participant to conversation
   * @param {string} conversationId - Conversation ID
   * @param {string} userId - User ID to add
   */
  const addParticipant = useCallback(async (conversationId, userId) => {
    try {
      const updatedConversation = await messagingService.addParticipant(conversationId, userId);
      
      // Update local state
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId ? updatedConversation : conv
        )
      );
      
      if (activeConversation && activeConversation.id === conversationId) {
        setActiveConversation(updatedConversation);
      }
      
      return updatedConversation;
    } catch (err) {
      setError(err.message || 'Failed to add participant');
      console.error('Error adding participant:', err);
      throw err;
    }
  }, [activeConversation]);

  /**
   * Remove participant from conversation
   * @param {string} conversationId - Conversation ID
   * @param {string} userId - User ID to remove
   */
  const removeParticipant = useCallback(async (conversationId, userId) => {
    try {
      const updatedConversation = await messagingService.removeParticipant(conversationId, userId);
      
      // Update local state
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId ? updatedConversation : conv
        )
      );
      
      if (activeConversation && activeConversation.id === conversationId) {
        setActiveConversation(updatedConversation);
      }
      
      return updatedConversation;
    } catch (err) {
      setError(err.message || 'Failed to remove participant');
      console.error('Error removing participant:', err);
      throw err;
    }
  }, [activeConversation]);

  /**
   * Upload attachment to conversation
   * @param {string} conversationId - Conversation ID
   * @param {File} file - File to upload
   */
  const uploadAttachment = useCallback(async (conversationId, file) => {
    try {
      const response = await messagingService.uploadAttachment(conversationId, file);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to upload attachment');
      console.error('Error uploading attachment:', err);
      throw err;
    }
  }, []);

  // Fetch conversations and unread count on mount
  useEffect(() => {
    fetchConversations();
    fetchUnreadCount();
  }, [fetchConversations, fetchUnreadCount]);

  // Set up polling for unread count
  useEffect(() => {
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  return {
    conversations,
    activeConversation,
    messages,
    unreadCount,
    loading,
    error,
    fetchConversations,
    fetchMessages,
    sendMessage,
    createConversation,
    markAsRead,
    fetchUnreadCount,
    deleteConversation,
    blockUser,
    searchMessages,
    addParticipant,
    removeParticipant,
    uploadAttachment,
    setActiveConversation
  };
};

export default useMessaging;