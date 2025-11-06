import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUserPreference } from '../hooks/useUserPreferences';

const ThemeContext = createContext();

/**
 * Theme Provider Component
 * Manages application theme (light/dark/high contrast) and provides context to children
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useUserPreference('app-theme', 'system');
  const [highContrast, setHighContrast] = useUserPreference('high-contrast', false);
  const [fontSize, setFontSize] = useUserPreference('font-size', 'medium');

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark', 'high-contrast', 'small-text', 'large-text');
    
    // Apply theme classes
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    // Apply high contrast
    if (highContrast) {
      root.classList.add('high-contrast');
    }
    
    // Apply font size
    if (fontSize === 'small') {
      root.classList.add('small-text');
    } else if (fontSize === 'large') {
      root.classList.add('large-text');
    }
  }, [theme, highContrast, fontSize]);

  // Toggle between light and dark theme
  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'light';
      return 'light'; // Default to light if system
    });
  }, [setTheme]);

  // Set theme explicitly
  const setThemeMode = useCallback((mode) => {
    if (['light', 'dark', 'system'].includes(mode)) {
      setTheme(mode);
    }
  }, [setTheme]);

  // Toggle high contrast mode
  const toggleHighContrast = useCallback(() => {
    setHighContrast(prev => !prev);
  }, [setHighContrast]);

  // Set font size
  const setFontSizeMode = useCallback((size) => {
    if (['small', 'medium', 'large'].includes(size)) {
      setFontSize(size);
    }
  }, [setFontSize]);

  const value = {
    theme,
    highContrast,
    fontSize,
    toggleTheme,
    setThemeMode,
    toggleHighContrast,
    setFontSizeMode
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access theme context
 * @returns {Object} Theme context values and functions
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};