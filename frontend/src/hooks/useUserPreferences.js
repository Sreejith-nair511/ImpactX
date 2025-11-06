import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing user preferences with localStorage persistence
 * @param {string} key - The key to store the preference under
 * @param {any} defaultValue - The default value if none is found
 * @returns {Array} - [value, setValue] - Current value and setter function
 */
export const useUserPreference = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
        return defaultValue;
      }
    }
    return defaultValue;
  });

  // Update localStorage when value changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
  }, [key, value]);

  // Reset to default value
  const reset = useCallback(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  // Remove preference
  const remove = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(key);
        setValue(defaultValue);
      } catch (error) {
        console.error(`Error removing localStorage key "${key}":`, error);
      }
    }
  }, [key, defaultValue]);

  return [value, setValue, { reset, remove }];
};

/**
 * Custom hook for managing multiple user preferences
 * @param {Object} preferences - Object with keys as preference names and values as default values
 * @returns {Object} - Object with preference values, setters, and utility functions
 */
export const useUserPreferences = (preferences) => {
  const preferenceKeys = Object.keys(preferences);
  
  // Create preference hooks for each preference
  const preferenceHooks = preferenceKeys.reduce((acc, key) => {
    const [value, setValue, utils] = useUserPreference(key, preferences[key]);
    acc[key] = { value, setValue, ...utils };
    return acc;
  }, {});

  // Get all preference values as an object
  const getAllPreferences = useCallback(() => {
    return preferenceKeys.reduce((acc, key) => {
      acc[key] = preferenceHooks[key].value;
      return acc;
    }, {});
  }, [preferenceHooks, preferenceKeys]);

  // Set multiple preferences at once
  const setPreferences = useCallback((newPreferences) => {
    Object.keys(newPreferences).forEach(key => {
      if (preferenceHooks[key]) {
        preferenceHooks[key].setValue(newPreferences[key]);
      }
    });
  }, [preferenceHooks]);

  // Reset all preferences to defaults
  const resetAll = useCallback(() => {
    preferenceKeys.forEach(key => {
      preferenceHooks[key].reset();
    });
  }, [preferenceHooks, preferenceKeys]);

  return {
    ...preferenceHooks,
    getAllPreferences,
    setPreferences,
    resetAll
  };
};