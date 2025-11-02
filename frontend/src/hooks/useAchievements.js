import { useState, useEffect, useCallback } from 'react';
import * as achievementsService from '../services/achievementsService';

/**
 * Custom hook for managing user achievements
 * @param {string} userId - User ID
 * @returns {object} Achievements management functions and state
 */
export const useAchievements = (userId) => {
  const [achievements, setAchievements] = useState([]);
  const [badges, setBadges] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch user achievements
   */
  const fetchAchievements = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await achievementsService.getUserAchievements(userId);
      setAchievements(data);
    } catch (err) {
      setError(err.message || 'Failed to load achievements');
      console.error('Error fetching achievements:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Fetch user badges
   */
  const fetchBadges = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await achievementsService.getUserBadges(userId);
      setBadges(data);
    } catch (err) {
      console.error('Error fetching badges:', err);
    }
  }, [userId]);

  /**
   * Fetch achievement statistics
   */
  const fetchStats = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await achievementsService.getAchievementStats(userId);
      setStats(data);
    } catch (err) {
      console.error('Error fetching achievement stats:', err);
    }
  }, [userId]);

  /**
   * Add a new achievement
   * @param {object} achievementData - Achievement data
   */
  const addAchievement = useCallback(async (achievementData) => {
    if (!userId) return;
    
    try {
      const newAchievement = await achievementsService.addAchievement(userId, achievementData);
      setAchievements(prev => [...prev, newAchievement]);
      return newAchievement;
    } catch (err) {
      setError(err.message || 'Failed to add achievement');
      console.error('Error adding achievement:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Update an achievement
   * @param {string} achievementId - Achievement ID
   * @param {object} achievementData - Updated achievement data
   */
  const updateAchievement = useCallback(async (achievementId, achievementData) => {
    if (!userId) return;
    
    try {
      const updatedAchievement = await achievementsService.updateAchievement(userId, achievementId, achievementData);
      setAchievements(prev => 
        prev.map(achievement => 
          achievement.id === achievementId ? updatedAchievement : achievement
        )
      );
      return updatedAchievement;
    } catch (err) {
      setError(err.message || 'Failed to update achievement');
      console.error('Error updating achievement:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Remove an achievement
   * @param {string} achievementId - Achievement ID
   */
  const removeAchievement = useCallback(async (achievementId) => {
    if (!userId) return;
    
    try {
      await achievementsService.removeAchievement(userId, achievementId);
      setAchievements(prev => prev.filter(achievement => achievement.id !== achievementId));
    } catch (err) {
      setError(err.message || 'Failed to remove achievement');
      console.error('Error removing achievement:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Verify an achievement
   * @param {string} achievementId - Achievement ID
   * @param {object} verificationData - Verification data
   */
  const verifyAchievement = useCallback(async (achievementId, verificationData) => {
    if (!userId) return;
    
    try {
      const response = await achievementsService.verifyAchievement(userId, achievementId, verificationData);
      
      // Update local state
      setAchievements(prev => 
        prev.map(achievement => 
          achievement.id === achievementId 
            ? { ...achievement, verificationStatus: response.status } 
            : achievement
        )
      );
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to verify achievement');
      console.error('Error verifying achievement:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Award a badge
   * @param {object} badgeData - Badge data
   */
  const awardBadge = useCallback(async (badgeData) => {
    if (!userId) return;
    
    try {
      const newBadge = await achievementsService.awardBadge(userId, badgeData);
      setBadges(prev => [...prev, newBadge]);
      return newBadge;
    } catch (err) {
      setError(err.message || 'Failed to award badge');
      console.error('Error awarding badge:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Search achievements
   * @param {string} query - Search query
   * @param {object} options - Search options
   * @returns {Promise<Array>} Search results
   */
  const searchAchievements = useCallback(async (query, options = {}) => {
    try {
      const results = await achievementsService.searchAchievements(query, options);
      return results;
    } catch (err) {
      setError(err.message || 'Failed to search achievements');
      console.error('Error searching achievements:', err);
      return [];
    }
  }, []);

  /**
   * Get popular achievements
   * @param {object} options - Query options
   * @returns {Promise<Array>} Popular achievements
   */
  const getPopularAchievements = useCallback(async (options = {}) => {
    try {
      const results = await achievementsService.getPopularAchievements(options);
      return results;
    } catch (err) {
      console.error('Error fetching popular achievements:', err);
      return [];
    }
  }, []);

  /**
   * Get recent achievements
   * @param {object} options - Query options
   * @returns {Promise<Array>} Recent achievements
   */
  const getRecentAchievements = useCallback(async (options = {}) => {
    try {
      const results = await achievementsService.getRecentAchievements(options);
      return results;
    } catch (err) {
      console.error('Error fetching recent achievements:', err);
      return [];
    }
  }, []);

  /**
   * Import achievements from external sources
   * @param {object} importData - Import data
   */
  const importAchievements = useCallback(async (importData) => {
    if (!userId) return;
    
    try {
      const response = await achievementsService.importAchievements(userId, importData);
      
      // Update local state with imported achievements
      if (response.achievements) {
        setAchievements(prev => [...prev, ...response.achievements]);
      }
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to import achievements');
      console.error('Error importing achievements:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Get achievement types
   * @returns {Promise<Array>} Achievement types
   */
  const getAchievementTypes = useCallback(async () => {
    try {
      const types = await achievementsService.getAchievementTypes();
      return types;
    } catch (err) {
      console.error('Error fetching achievement types:', err);
      return [];
    }
  }, []);

  /**
   * Get badge categories
   * @returns {Promise<Array>} Badge categories
   */
  const getBadgeCategories = useCallback(async () => {
    try {
      const categories = await achievementsService.getBadgeCategories();
      return categories;
    } catch (err) {
      console.error('Error fetching badge categories:', err);
      return [];
    }
  }, []);

  // Fetch achievements, badges, and stats on mount and when userId changes
  useEffect(() => {
    if (userId) {
      fetchAchievements();
      fetchBadges();
      fetchStats();
    }
  }, [userId, fetchAchievements, fetchBadges, fetchStats]);

  return {
    achievements,
    badges,
    stats,
    loading,
    error,
    fetchAchievements,
    addAchievement,
    updateAchievement,
    removeAchievement,
    verifyAchievement,
    awardBadge,
    searchAchievements,
    getPopularAchievements,
    getRecentAchievements,
    importAchievements,
    getAchievementTypes,
    getBadgeCategories
  };
};

export default useAchievements;