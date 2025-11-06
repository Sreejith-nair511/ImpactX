import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for advanced tab management
 * @param {Array} tabs - Array of tab objects
 * @param {number} defaultActiveTab - Default active tab index
 * @param {boolean} persistState - Whether to persist tab state in localStorage
 * @returns {Object} Tab management functions and state
 */
export const useTabs = (tabs, defaultActiveTab = 0, persistState = false) => {
  const [activeTab, setActiveTab] = useState(() => {
    // Check for persisted state if enabled
    if (persistState && typeof window !== 'undefined') {
      const savedTab = localStorage.getItem(`tabs-active-tab-${window.location.pathname}`);
      return savedTab ? parseInt(savedTab, 10) : defaultActiveTab;
    }
    return defaultActiveTab;
  });
  
  const [disabledTabs, setDisabledTabs] = useState(new Set());
  const [tabHistory, setTabHistory] = useState([defaultActiveTab]);

  // Save active tab to localStorage if persistState is enabled
  useEffect(() => {
    if (persistState && typeof window !== 'undefined') {
      localStorage.setItem(`tabs-active-tab-${window.location.pathname}`, activeTab.toString());
    }
  }, [activeTab, persistState]);

  // Handle tab change
  const handleTabChange = useCallback((index) => {
    if (disabledTabs.has(index)) return;
    
    setActiveTab(index);
    setTabHistory(prev => [...prev.slice(-9), index]); // Keep last 10 tabs in history
  }, [disabledTabs]);

  // Go to next tab
  const nextTab = useCallback(() => {
    const nextIndex = activeTab < tabs.length - 1 ? activeTab + 1 : 0;
    if (!disabledTabs.has(nextIndex)) {
      handleTabChange(nextIndex);
    }
  }, [activeTab, tabs.length, disabledTabs, handleTabChange]);

  // Go to previous tab
  const prevTab = useCallback(() => {
    const prevIndex = activeTab > 0 ? activeTab - 1 : tabs.length - 1;
    if (!disabledTabs.has(prevIndex)) {
      handleTabChange(prevIndex);
    }
  }, [activeTab, tabs.length, disabledTabs, handleTabChange]);

  // Go to specific tab
  const goToTab = useCallback((index) => {
    if (index >= 0 && index < tabs.length && !disabledTabs.has(index)) {
      handleTabChange(index);
    }
  }, [tabs.length, disabledTabs, handleTabChange]);

  // Disable a tab
  const disableTab = useCallback((index) => {
    setDisabledTabs(prev => new Set(prev).add(index));
  }, []);

  // Enable a tab
  const enableTab = useCallback((index) => {
    setDisabledTabs(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  }, []);

  // Toggle tab disabled state
  const toggleTabDisabled = useCallback((index) => {
    setDisabledTabs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  // Go back to previous tab in history
  const goBackInHistory = useCallback(() => {
    if (tabHistory.length > 1) {
      const previousTab = tabHistory[tabHistory.length - 2];
      setTabHistory(prev => prev.slice(0, -1));
      goToTab(previousTab);
    }
  }, [tabHistory, goToTab]);

  return {
    activeTab,
    disabledTabs: Array.from(disabledTabs),
    tabHistory,
    handleTabChange,
    nextTab,
    prevTab,
    goToTab,
    disableTab,
    enableTab,
    toggleTabDisabled,
    goBackInHistory
  };
};