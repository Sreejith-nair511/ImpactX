import { useState, useEffect, useCallback } from 'react';
import * as preferencesService from '../services/preferencesService';

/**
 * Custom hook for managing user preferences
 * @param {string} userId - User ID
 * @returns {object} Preferences management functions and state
 */
export const usePreferences = (userId) => {
  const [preferences, setPreferences] = useState(null);
  const [notificationPreferences, setNotificationPreferences] = useState(null);
  const [privacyPreferences, setPrivacyPreferences] = useState(null);
  const [displayPreferences, setDisplayPreferences] = useState(null);
  const [communicationPreferences, setCommunicationPreferences] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all user preferences
   */
  const fetchPreferences = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await preferencesService.getUserPreferences(userId);
      setPreferences(data);
    } catch (err) {
      setError(err.message || 'Failed to load preferences');
      console.error('Error fetching preferences:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Fetch notification preferences
   */
  const fetchNotificationPreferences = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await preferencesService.getNotificationPreferences(userId);
      setNotificationPreferences(data);
    } catch (err) {
      console.error('Error fetching notification preferences:', err);
    }
  }, [userId]);

  /**
   * Fetch privacy preferences
   */
  const fetchPrivacyPreferences = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await preferencesService.getPrivacyPreferences(userId);
      setPrivacyPreferences(data);
    } catch (err) {
      console.error('Error fetching privacy preferences:', err);
    }
  }, [userId]);

  /**
   * Fetch display preferences
   */
  const fetchDisplayPreferences = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await preferencesService.getDisplayPreferences(userId);
      setDisplayPreferences(data);
    } catch (err) {
      console.error('Error fetching display preferences:', err);
    }
  }, [userId]);

  /**
   * Fetch communication preferences
   */
  const fetchCommunicationPreferences = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await preferencesService.getCommunicationPreferences(userId);
      setCommunicationPreferences(data);
    } catch (err) {
      console.error('Error fetching communication preferences:', err);
    }
  }, [userId]);

  /**
   * Update user preferences
   * @param {object} updatedPreferences - Updated preferences
   */
  const updatePreferences = useCallback(async (updatedPreferences) => {
    if (!userId) return;
    
    try {
      const response = await preferencesService.updateUserPreferences(userId, updatedPreferences);
      setPreferences(response);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to update preferences');
      console.error('Error updating preferences:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Update notification preferences
   * @param {object} updatedPreferences - Updated notification preferences
   */
  const updateNotificationPreferences = useCallback(async (updatedPreferences) => {
    if (!userId) return;
    
    try {
      const response = await preferencesService.updateNotificationPreferences(userId, updatedPreferences);
      setNotificationPreferences(response);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to update notification preferences');
      console.error('Error updating notification preferences:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Update privacy preferences
   * @param {object} updatedPreferences - Updated privacy preferences
   */
  const updatePrivacyPreferences = useCallback(async (updatedPreferences) => {
    if (!userId) return;
    
    try {
      const response = await preferencesService.updatePrivacyPreferences(userId, updatedPreferences);
      setPrivacyPreferences(response);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to update privacy preferences');
      console.error('Error updating privacy preferences:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Update display preferences
   * @param {object} updatedPreferences - Updated display preferences
   */
  const updateDisplayPreferences = useCallback(async (updatedPreferences) => {
    if (!userId) return;
    
    try {
      const response = await preferencesService.updateDisplayPreferences(userId, updatedPreferences);
      setDisplayPreferences(response);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to update display preferences');
      console.error('Error updating display preferences:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Update communication preferences
   * @param {object} updatedPreferences - Updated communication preferences
   */
  const updateCommunicationPreferences = useCallback(async (updatedPreferences) => {
    if (!userId) return;
    
    try {
      const response = await preferencesService.updateCommunicationPreferences(userId, updatedPreferences);
      setCommunicationPreferences(response);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to update communication preferences');
      console.error('Error updating communication preferences:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Reset preferences to defaults
   */
  const resetPreferences = useCallback(async () => {
    if (!userId) return;
    
    try {
      const response = await preferencesService.resetPreferences(userId);
      setPreferences(response);
      setNotificationPreferences(response.notifications);
      setPrivacyPreferences(response.privacy);
      setDisplayPreferences(response.display);
      setCommunicationPreferences(response.communication);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to reset preferences');
      console.error('Error resetting preferences:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Get default preferences
   */
  const getDefaultPreferences = useCallback(async () => {
    try {
      const defaults = await preferencesService.getDefaultPreferences();
      return defaults;
    } catch (err) {
      console.error('Error fetching default preferences:', err);
      return null;
    }
  }, []);

  /**
   * Export preferences
   */
  const exportPreferences = useCallback(async () => {
    if (!userId) return;
    
    try {
      const exported = await preferencesService.exportPreferences(userId);
      return exported;
    } catch (err) {
      setError(err.message || 'Failed to export preferences');
      console.error('Error exporting preferences:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Import preferences
   * @param {object} importedPreferences - Preferences to import
   */
  const importPreferences = useCallback(async (importedPreferences) => {
    if (!userId) return;
    
    try {
      const response = await preferencesService.importPreferences(userId, importedPreferences);
      setPreferences(response);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to import preferences');
      console.error('Error importing preferences:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Get preference history
   * @param {object} options - Query options
   * @returns {Promise<Array>} Preference history
   */
  const getPreferenceHistory = useCallback(async (options = {}) => {
    if (!userId) return [];
    
    try {
      const history = await preferencesService.getPreferenceHistory(userId, options);
      return history;
    } catch (err) {
      console.error('Error fetching preference history:', err);
      return [];
    }
  }, [userId]);

  // Fetch all preferences on mount and when userId changes
  useEffect(() => {
    if (userId) {
      fetchPreferences();
      fetchNotificationPreferences();
      fetchPrivacyPreferences();
      fetchDisplayPreferences();
      fetchCommunicationPreferences();
    }
  }, [
    userId,
    fetchPreferences,
    fetchNotificationPreferences,
    fetchPrivacyPreferences,
    fetchDisplayPreferences,
    fetchCommunicationPreferences
  ]);

  return {
    preferences,
    notificationPreferences,
    privacyPreferences,
    displayPreferences,
    communicationPreferences,
    loading,
    error,
    fetchPreferences,
    updatePreferences,
    updateNotificationPreferences,
    updatePrivacyPreferences,
    updateDisplayPreferences,
    updateCommunicationPreferences,
    resetPreferences,
    getDefaultPreferences,
    exportPreferences,
    importPreferences,
    getPreferenceHistory
  };
};

export default usePreferences;