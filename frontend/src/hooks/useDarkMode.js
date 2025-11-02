import { useState, useEffect } from 'react';

/**
 * Custom hook for handling dark mode
 * @param {boolean} initialValue - Initial dark mode value
 * @returns {object} Dark mode state and toggle function
 */
export const useDarkMode = (initialValue = false) => {
  const [isDarkMode, setIsDarkMode] = useState(initialValue);

  useEffect(() => {
    // Check for saved preference in localStorage
    const savedPreference = localStorage.getItem('darkMode');
    if (savedPreference !== null) {
      setIsDarkMode(savedPreference === 'true');
      return;
    }

    // Check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      return;
    }

    // Use initial value
    setIsDarkMode(initialValue);
  }, [initialValue]);

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const enableDarkMode = () => {
    setIsDarkMode(true);
  };

  const disableDarkMode = () => {
    setIsDarkMode(false);
  };

  return {
    isDarkMode,
    toggleDarkMode,
    enableDarkMode,
    disableDarkMode
  };
};

/**
 * Custom hook for handling theme transitions
 * @returns {object} Theme transition utilities
 */
export const useThemeTransition = () => {
  useEffect(() => {
    // Add theme transition class to document
    document.documentElement.classList.add('theme-transition');
    
    // Remove class after transition completes
    const cleanup = () => {
      document.documentElement.classList.remove('theme-transition');
    };
    
    // Listen for transition end
    document.documentElement.addEventListener('transitionend', cleanup);
    
    return () => {
      document.documentElement.removeEventListener('transitionend', cleanup);
    };
  }, []);

  return {
    enableTransition: () => {
      document.documentElement.classList.add('theme-transition');
    },
    disableTransition: () => {
      document.documentElement.classList.remove('theme-transition');
    }
  };
};

/**
 * Custom hook for handling theme colors
 * @param {string} theme - Theme name
 * @returns {object} Theme color utilities
 */
export const useThemeColors = (theme = 'default') => {
  // Define theme color palettes
  const themes = {
    default: {
      primary: '#4F46E5',
      secondary: '#7C3AED',
      accent: '#10B981',
      background: '#F9FAFB',
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280'
    },
    dark: {
      primary: '#818CF8',
      secondary: '#A78BFA',
      accent: '#34D399',
      background: '#111827',
      surface: '#1F2937',
      text: '#F9FAFB',
      textSecondary: '#9CA3AF'
    },
    highContrast: {
      primary: '#FFFFFF',
      secondary: '#FFFF00',
      accent: '#00FF00',
      background: '#000000',
      surface: '#333333',
      text: '#FFFFFF',
      textSecondary: '#CCCCCC'
    }
  };

  const currentTheme = themes[theme] || themes.default;

  /**
   * Apply theme colors to CSS variables
   */
  const applyThemeColors = () => {
    const root = document.documentElement;
    Object.entries(currentTheme).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  };

  /**
   * Get theme color
   * @param {string} colorName - Color name
   * @returns {string} Color value
   */
  const getColor = (colorName) => {
    return currentTheme[colorName] || '#000000';
  };

  return {
    colors: currentTheme,
    applyThemeColors,
    getColor
  };
};