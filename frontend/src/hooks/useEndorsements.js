import { useState, useEffect, useCallback } from 'react';
import * as endorsementsService from '../services/endorsementsService';

/**
 * Custom hook for managing user endorsements
 * @param {string} userId - User ID
 * @returns {object} Endorsements management functions and state
 */
export const useEndorsements = (userId) => {
  const [endorsements, setEndorsements] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch user endorsements
   */
  const fetchEndorsements = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await endorsementsService.getUserEndorsements(userId);
      setEndorsements(data.endorsements || []);
    } catch (err) {
      setError(err.message || 'Failed to load endorsements');
      console.error('Error fetching endorsements:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Fetch endorsement statistics
   */
  const fetchStats = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await endorsementsService.getEndorsementStats(userId);
      setStats(data);
    } catch (err) {
      console.error('Error fetching endorsement stats:', err);
    }
  }, [userId]);

  /**
   * Add endorsement
   * @param {object} endorsementData - Endorsement data
   */
  const addEndorsement = useCallback(async (endorsementData) => {
    if (!userId) return;
    
    try {
      const response = await endorsementsService.addEndorsement(userId, endorsementData);
      
      // Update local state
      if (response.endorsement) {
        setEndorsements(prev => [...prev, response.endorsement]);
      }
      
      // Update stats
      if (response.stats) {
        setStats(response.stats);
      }
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to add endorsement');
      console.error('Error adding endorsement:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Remove endorsement
   * @param {string} endorsementId - Endorsement ID
   */
  const removeEndorsement = useCallback(async (endorsementId) => {
    if (!userId) return;
    
    try {
      await endorsementsService.removeEndorsement(userId, endorsementId);
      
      // Update local state
      setEndorsements(prev => prev.filter(e => e.id !== endorsementId));
    } catch (err) {
      setError(err.message || 'Failed to remove endorsement');
      console.error('Error removing endorsement:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Get endorsements by skill
   * @param {string} skillId - Skill ID
   * @returns {Promise<Array>} Endorsements for skill
   */
  const getEndorsementsBySkill = useCallback(async (skillId) => {
    if (!userId) return [];
    
    try {
      const data = await endorsementsService.getEndorsementsBySkill(userId, skillId);
      return data;
    } catch (err) {
      console.error('Error fetching endorsements by skill:', err);
      return [];
    }
  }, [userId]);

  /**
   * Search endorsements
   * @param {string} query - Search query
   * @param {object} options - Search options
   * @returns {Promise<Array>} Search results
   */
  const searchEndorsements = useCallback(async (query, options = {}) => {
    try {
      const results = await endorsementsService.searchEndorsements(query, options);
      return results;
    } catch (err) {
      setError(err.message || 'Failed to search endorsements');
      console.error('Error searching endorsements:', err);
      return [];
    }
  }, []);

  /**
   * Get recent endorsements
   * @param {object} options - Query options
   * @returns {Promise<Array>} Recent endorsements
   */
  const getRecentEndorsements = useCallback(async (options = {}) => {
    try {
      const results = await endorsementsService.getRecentEndorsements(options);
      return results;
    } catch (err) {
      console.error('Error fetching recent endorsements:', err);
      return [];
    }
  }, []);

  /**
   * Get top endorsers
   * @param {object} options - Query options
   * @returns {Promise<Array>} Top endorsers
   */
  const getTopEndorsers = useCallback(async (options = {}) => {
    if (!userId) return [];
    
    try {
      const results = await endorsementsService.getTopEndorsers(userId, options);
      return results;
    } catch (err) {
      console.error('Error fetching top endorsers:', err);
      return [];
    }
  }, [userId]);

  /**
   * Get endorsed skills
   * @param {object} options - Query options
   * @returns {Promise<Array>} Endorsed skills
   */
  const getEndorsedSkills = useCallback(async (options = {}) => {
    if (!userId) return [];
    
    try {
      const results = await endorsementsService.getEndorsedSkills(userId, options);
      return results;
    } catch (err) {
      console.error('Error fetching endorsed skills:', err);
      return [];
    }
  }, [userId]);

  /**
   * Get mutual endorsements
   * @param {string} targetUserId - Target user ID
   * @returns {Promise<object>} Mutual endorsements
   */
  const getMutualEndorsements = useCallback(async (targetUserId) => {
    if (!userId) return null;
    
    try {
      const results = await endorsementsService.getMutualEndorsements(userId, targetUserId);
      return results;
    } catch (err) {
      console.error('Error fetching mutual endorsements:', err);
      return null;
    }
  }, [userId]);

  /**
   * Endorse multiple skills
   * @param {object} endorsementData - Endorsement data with multiple skills
   */
  const endorseMultipleSkills = useCallback(async (endorsementData) => {
    if (!userId) return;
    
    try {
      const response = await endorsementsService.endorseMultipleSkills(userId, endorsementData);
      
      // Update local state
      if (response.endorsements) {
        setEndorsements(prev => [...prev, ...response.endorsements]);
      }
      
      // Update stats
      if (response.stats) {
        setStats(response.stats);
      }
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to endorse multiple skills');
      console.error('Error endorsing multiple skills:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Get endorsement notifications
   * @param {object} options - Query options
   * @returns {Promise<Array>} Endorsement notifications
   */
  const getNotifications = useCallback(async (options = {}) => {
    try {
      const results = await endorsementsService.getEndorsementNotifications(options);
      return results;
    } catch (err) {
      console.error('Error fetching endorsement notifications:', err);
      return [];
    }
  }, []);

  /**
   * Mark endorsement notification as read
   * @param {string} notificationId - Notification ID
   */
  const markNotificationAsRead = useCallback(async (notificationId) => {
    try {
      await endorsementsService.markEndorsementNotificationAsRead(notificationId);
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  }, []);

  // Fetch endorsements and stats on mount and when userId changes
  useEffect(() => {
    if (userId) {
      fetchEndorsements();
      fetchStats();
    }
  }, [userId, fetchEndorsements, fetchStats]);

  return {
    endorsements,
    stats,
    loading,
    error,
    fetchEndorsements,
    addEndorsement,
    removeEndorsement,
    getEndorsementsBySkill,
    searchEndorsements,
    getRecentEndorsements,
    getTopEndorsers,
    getEndorsedSkills,
    getMutualEndorsements,
    endorseMultipleSkills,
    getNotifications,
    markNotificationAsRead
  };
};

export default useEndorsements;