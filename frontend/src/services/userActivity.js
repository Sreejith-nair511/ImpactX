/**
 * User activity tracking service
 */

// Activity types
const ACTIVITY_TYPES = {
  PAGE_VIEW: 'page_view',
  BUTTON_CLICK: 'button_click',
  FORM_SUBMIT: 'form_submit',
  NAVIGATION: 'navigation',
  SEARCH: 'search',
  DONATION: 'donation',
  PROJECT_VIEW: 'project_view',
  PROFILE_UPDATE: 'profile_update',
  SETTINGS_CHANGE: 'settings_change'
};

/**
 * Track user activity
 * @param {string} type - Activity type
 * @param {object} data - Activity data
 */
export const trackActivity = (type, data = {}) => {
  // In a real implementation, this would send data to an analytics service
  const activity = {
    id: generateId(),
    type,
    timestamp: new Date().toISOString(),
    data,
    userAgent: navigator.userAgent,
    url: window.location.href,
    referrer: document.referrer
  };

  // Store in localStorage for demo purposes
  try {
    const activities = JSON.parse(localStorage.getItem('user_activities') || '[]');
    activities.push(activity);
    localStorage.setItem('user_activities', JSON.stringify(activities.slice(-100))); // Keep last 100 activities
  } catch (error) {
    console.error('Error tracking activity:', error);
  }

  // Also log to console for development
  console.log('User Activity Tracked:', activity);
};

/**
 * Get user activities
 * @returns {Array} User activities
 */
export const getUserActivities = () => {
  try {
    return JSON.parse(localStorage.getItem('user_activities') || '[]');
  } catch (error) {
    console.error('Error getting user activities:', error);
    return [];
  }
};

/**
 * Clear user activities
 */
export const clearUserActivities = () => {
  try {
    localStorage.removeItem('user_activities');
  } catch (error) {
    console.error('Error clearing user activities:', error);
  }
};

/**
 * Get activity statistics
 * @returns {object} Activity statistics
 */
export const getActivityStats = () => {
  const activities = getUserActivities();
  
  // Count activities by type
  const typeCounts = activities.reduce((acc, activity) => {
    acc[activity.type] = (acc[activity.type] || 0) + 1;
    return acc;
  }, {});

  // Get most active pages
  const pageCounts = activities
    .filter(a => a.type === ACTIVITY_TYPES.PAGE_VIEW)
    .reduce((acc, activity) => {
      const page = activity.data?.page || 'Unknown';
      acc[page] = (acc[page] || 0) + 1;
      return acc;
    }, {});

  // Get most active time periods (by hour)
  const hourCounts = activities.reduce((acc, activity) => {
    const hour = new Date(activity.timestamp).getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {});

  return {
    total: activities.length,
    byType: typeCounts,
    byPage: pageCounts,
    byHour: hourCounts,
    firstActivity: activities[0]?.timestamp,
    lastActivity: activities[activities.length - 1]?.timestamp
  };
};

/**
 * Track page view
 * @param {string} page - Page name
 * @param {object} properties - Additional properties
 */
export const trackPageView = (page, properties = {}) => {
  trackActivity(ACTIVITY_TYPES.PAGE_VIEW, {
    page,
    ...properties
  });
};

/**
 * Track button click
 * @param {string} buttonName - Button name
 * @param {object} properties - Additional properties
 */
export const trackButtonClick = (buttonName, properties = {}) => {
  trackActivity(ACTIVITY_TYPES.BUTTON_CLICK, {
    buttonName,
    ...properties
  });
};

/**
 * Track form submission
 * @param {string} formName - Form name
 * @param {object} properties - Additional properties
 */
export const trackFormSubmit = (formName, properties = {}) => {
  trackActivity(ACTIVITY_TYPES.FORM_SUBMIT, {
    formName,
    ...properties
  });
};

/**
 * Track navigation
 * @param {string} from - Source page
 * @param {string} to - Destination page
 * @param {object} properties - Additional properties
 */
export const trackNavigation = (from, to, properties = {}) => {
  trackActivity(ACTIVITY_TYPES.NAVIGATION, {
    from,
    to,
    ...properties
  });
};

/**
 * Track search
 * @param {string} query - Search query
 * @param {object} properties - Additional properties
 */
export const trackSearch = (query, properties = {}) => {
  trackActivity(ACTIVITY_TYPES.SEARCH, {
    query,
    ...properties
  });
};

/**
 * Track donation
 * @param {number} amount - Donation amount
 * @param {string} projectId - Project ID
 * @param {object} properties - Additional properties
 */
export const trackDonation = (amount, projectId, properties = {}) => {
  trackActivity(ACTIVITY_TYPES.DONATION, {
    amount,
    projectId,
    ...properties
  });
};

/**
 * Track project view
 * @param {string} projectId - Project ID
 * @param {object} properties - Additional properties
 */
export const trackProjectView = (projectId, properties = {}) => {
  trackActivity(ACTIVITY_TYPES.PROJECT_VIEW, {
    projectId,
    ...properties
  });
};

/**
 * Track profile update
 * @param {object} properties - Additional properties
 */
export const trackProfileUpdate = (properties = {}) => {
  trackActivity(ACTIVITY_TYPES.PROFILE_UPDATE, properties);
};

/**
 * Track settings change
 * @param {string} settingName - Setting name
 * @param {any} oldValue - Old value
 * @param {any} newValue - New value
 * @param {object} properties - Additional properties
 */
export const trackSettingsChange = (settingName, oldValue, newValue, properties = {}) => {
  trackActivity(ACTIVITY_TYPES.SETTINGS_CHANGE, {
    settingName,
    oldValue,
    newValue,
    ...properties
  });
};

/**
 * Generate random ID
 * @returns {string} Random ID
 */
const generateId = () => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

// Export activity types for external use
export { ACTIVITY_TYPES };