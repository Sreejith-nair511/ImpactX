/**
 * Service for managing user preferences and settings
 */

/**
 * Get user preference by key
 * @param {string} key - Preference key
 * @param {any} defaultValue - Default value if not found
 * @returns {any} Preference value
 */
export const getPreference = (key, defaultValue = null) => {
  try {
    const value = localStorage.getItem(`impactx_pref_${key}`);
    return value !== null ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error(`Error getting preference ${key}:`, error);
    return defaultValue;
  }
};

/**
 * Set user preference by key
 * @param {string} key - Preference key
 * @param {any} value - Preference value
 */
export const setPreference = (key, value) => {
  try {
    localStorage.setItem(`impactx_pref_${key}`, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting preference ${key}:`, error);
  }
};

/**
 * Remove user preference by key
 * @param {string} key - Preference key
 */
export const removePreference = (key) => {
  try {
    localStorage.removeItem(`impactx_pref_${key}`);
  } catch (error) {
    console.error(`Error removing preference ${key}:`, error);
  }
};

/**
 * Clear all user preferences
 */
export const clearAllPreferences = () => {
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('impactx_pref_')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing preferences:', error);
  }
};

/**
 * Get all user preferences
 * @returns {object} All preferences
 */
export const getAllPreferences = () => {
  try {
    const preferences = {};
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('impactx_pref_')) {
        const prefKey = key.replace('impactx_pref_', '');
        preferences[prefKey] = JSON.parse(localStorage.getItem(key));
      }
    });
    return preferences;
  } catch (error) {
    console.error('Error getting all preferences:', error);
    return {};
  }
};

/**
 * Theme preferences
 */
export const themePreferences = {
  getTheme: () => getPreference('theme', 'system'),
  setTheme: (theme) => setPreference('theme', theme),
  getDarkMode: () => getPreference('darkMode', null),
  setDarkMode: (isDark) => setPreference('darkMode', isDark)
};

/**
 * Notification preferences
 */
export const notificationPreferences = {
  getEmailNotifications: () => getPreference('emailNotifications', true),
  setEmailNotifications: (enabled) => setPreference('emailNotifications', enabled),
  getPushNotifications: () => getPreference('pushNotifications', true),
  setPushNotifications: (enabled) => setPreference('pushNotifications', enabled),
  getNotificationFrequency: () => getPreference('notificationFrequency', 'daily'),
  setNotificationFrequency: (frequency) => setPreference('notificationFrequency', frequency)
};

/**
 * Dashboard preferences
 */
export const dashboardPreferences = {
  getVisibleWidgets: () => getPreference('visibleWidgets', [
    'donations', 'projects', 'impact', 'geographic'
  ]),
  setVisibleWidgets: (widgets) => setPreference('visibleWidgets', widgets),
  getChartType: () => getPreference('chartType', 'line'),
  setChartType: (type) => setPreference('chartType', type),
  getDataRange: () => getPreference('dataRange', 'last30days'),
  setDataRange: (range) => setPreference('dataRange', range)
};

/**
 * Privacy preferences
 */
export const privacyPreferences = {
  getAnalyticsConsent: () => getPreference('analyticsConsent', true),
  setAnalyticsConsent: (consent) => setPreference('analyticsConsent', consent),
  getDataSharing: () => getPreference('dataSharing', false),
  setDataSharing: (sharing) => setPreference('dataSharing', sharing)
};