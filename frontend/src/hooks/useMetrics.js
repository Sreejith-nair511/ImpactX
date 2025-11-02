import { useState, useEffect, useCallback } from 'react';
import * as metricsService from '../services/metricsService';

/**
 * Custom hook for managing metrics
 * @param {string} userId - The ID of the user
 * @param {Object} options - Configuration options
 * @returns {Object} Metrics state and actions
 */
export const useMetrics = (userId, options = {}) => {
  const [metrics, setMetrics] = useState([]);
  const [history, setHistory] = useState([]);
  const [goals, setGoals] = useState({});
  const [benchmarks, setBenchmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState(options.timeframe || '30d');
  
  // Fetch dashboard metrics
  const fetchDashboardMetrics = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await metricsService.getDashboardMetrics(userId, { timeframe });
      setMetrics(data.metrics || data);
    } catch (err) {
      setError(err.message || 'Failed to fetch metrics');
      console.error('Error fetching metrics:', err);
    } finally {
      setLoading(false);
    }
  }, [userId, timeframe]);
  
  // Fetch metrics history
  const fetchMetricsHistory = useCallback(async (entityId, entityType) => {
    if (!entityId || !entityType) return;
    
    try {
      const data = await metricsService.getMetricsHistory(entityId, entityType, { timeframe });
      setHistory(data.history || data);
    } catch (err) {
      console.error('Error fetching metrics history:', err);
    }
  }, [timeframe]);
  
  // Fetch comparative metrics
  const fetchComparativeMetrics = useCallback(async (compareWith = 'peer-group') => {
    if (!userId) return;
    
    try {
      const data = await metricsService.getComparativeMetrics(userId, { 
        compareWith, 
        timeframe 
      });
      return data;
    } catch (err) {
      console.error('Error fetching comparative metrics:', err);
      throw err;
    }
  }, [userId, timeframe]);
  
  // Fetch metrics benchmarks
  const fetchBenchmarks = useCallback(async (category = 'all') => {
    if (!userId) return;
    
    try {
      const data = await metricsService.getMetricsBenchmarks(userId, { category });
      setBenchmarks(data.benchmarks || data);
    } catch (err) {
      console.error('Error fetching metrics benchmarks:', err);
    }
  }, [userId]);
  
  // Set metrics goals
  const setGoalsAction = useCallback(async (newGoals) => {
    if (!userId) return;
    
    try {
      const data = await metricsService.setMetricsGoals(userId, newGoals);
      setGoals(data.goals || data);
      return data;
    } catch (err) {
      console.error('Error setting metrics goals:', err);
      throw err;
    }
  }, [userId]);
  
  // Fetch metrics goals
  const fetchGoals = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await metricsService.getMetricsGoals(userId);
      setGoals(data.goals || data);
    } catch (err) {
      console.error('Error fetching metrics goals:', err);
    }
  }, [userId]);
  
  // Export metrics
  const exportMetrics = useCallback(async (format = 'csv') => {
    if (!userId) return;
    
    try {
      const data = await metricsService.exportMetrics(userId, format, { timeframe });
      return data;
    } catch (err) {
      console.error('Error exporting metrics:', err);
      throw err;
    }
  }, [userId, timeframe]);
  
  // Refresh all data
  const refresh = useCallback(() => {
    fetchDashboardMetrics();
    fetchGoals();
    fetchBenchmarks();
  }, [fetchDashboardMetrics, fetchGoals, fetchBenchmarks]);
  
  // Initialize data
  useEffect(() => {
    if (userId) {
      fetchDashboardMetrics();
      fetchGoals();
      fetchBenchmarks();
    }
  }, [userId, fetchDashboardMetrics, fetchGoals, fetchBenchmarks]);
  
  return {
    // State
    metrics,
    history,
    goals,
    benchmarks,
    loading,
    error,
    timeframe,
    
    // Actions
    fetchDashboardMetrics,
    fetchMetricsHistory,
    fetchComparativeMetrics,
    fetchBenchmarks,
    setGoals: setGoalsAction,
    fetchGoals,
    exportMetrics,
    refresh,
    setTimeframe
  };
};

export default useMetrics;