import { useState, useEffect } from 'react';
import { 
  themePreferences, 
  notificationPreferences, 
  dashboardPreferences, 
  privacyPreferences 
} from '../services/userPreferences';

/**
 * Custom hook for managing theme preferences
 * @returns {object} Theme preference functions and state
 */
export const useThemePreferences = () => {
  const [theme, setTheme] = useState(themePreferences.getTheme());
  const [darkMode, setDarkMode] = useState(themePreferences.getDarkMode());

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    themePreferences.setTheme(newTheme);
    
    if (newTheme === 'dark') {
      setDarkMode(true);
      themePreferences.setDarkMode(true);
    } else if (newTheme === 'light') {
      setDarkMode(false);
      themePreferences.setDarkMode(false);
    }
  };

  const toggleDarkMode = (isDark) => {
    setDarkMode(isDark);
    themePreferences.setDarkMode(isDark);
  };

  return {
    theme,
    darkMode,
    updateTheme,
    toggleDarkMode
  };
};

/**
 * Custom hook for managing notification preferences
 * @returns {object} Notification preference functions and state
 */
export const useNotificationPreferences = () => {
  const [emailNotifications, setEmailNotifications] = useState(notificationPreferences.getEmailNotifications());
  const [pushNotifications, setPushNotifications] = useState(notificationPreferences.getPushNotifications());
  const [notificationFrequency, setNotificationFrequency] = useState(notificationPreferences.getNotificationFrequency());

  const updateEmailNotifications = (enabled) => {
    setEmailNotifications(enabled);
    notificationPreferences.setEmailNotifications(enabled);
  };

  const updatePushNotifications = (enabled) => {
    setPushNotifications(enabled);
    notificationPreferences.setPushNotifications(enabled);
  };

  const updateNotificationFrequency = (frequency) => {
    setNotificationFrequency(frequency);
    notificationPreferences.setNotificationFrequency(frequency);
  };

  return {
    emailNotifications,
    pushNotifications,
    notificationFrequency,
    updateEmailNotifications,
    updatePushNotifications,
    updateNotificationFrequency
  };
};

/**
 * Custom hook for managing privacy preferences
 * @returns {object} Privacy preference functions and state
 */
export const usePrivacyPreferences = () => {
  const [analyticsConsent, setAnalyticsConsent] = useState(privacyPreferences.getAnalyticsConsent());
  const [dataSharing, setDataSharing] = useState(privacyPreferences.getDataSharing());

  const updateAnalyticsConsent = (consent) => {
    setAnalyticsConsent(consent);
    privacyPreferences.setAnalyticsConsent(consent);
  };

  const updateDataSharing = (sharing) => {
    setDataSharing(sharing);
    privacyPreferences.setDataSharing(sharing);
  };

  return {
    analyticsConsent,
    dataSharing,
    updateAnalyticsConsent,
    updateDataSharing
  };
};

/**
 * Custom hook for managing dashboard preferences
 * @returns {object} Dashboard preference functions and state
 */
export const useDashboardPreferences = () => {
  const [visibleWidgets, setVisibleWidgets] = useState(dashboardPreferences.getVisibleWidgets());
  const [chartType, setChartType] = useState(dashboardPreferences.getChartType());
  const [dataRange, setDataRange] = useState(dashboardPreferences.getDataRange());

  const updateVisibleWidgets = (widgets) => {
    setVisibleWidgets(widgets);
    dashboardPreferences.setVisibleWidgets(widgets);
  };

  const updateChartType = (type) => {
    setChartType(type);
    dashboardPreferences.setChartType(type);
  };

  const updateDataRange = (range) => {
    setDataRange(range);
    dashboardPreferences.setDataRange(range);
  };

  return {
    visibleWidgets,
    chartType,
    dataRange,
    updateVisibleWidgets,
    updateChartType,
    updateDataRange
  };
};