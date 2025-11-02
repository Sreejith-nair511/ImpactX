import { useState, useEffect, useCallback } from 'react';
import * as goalService from '../services/goalService';

/**
 * Custom hook for managing goals
 * @param {string} userId - The ID of the user
 * @param {Object} options - Configuration options
 * @returns {Object} Goals state and actions
 */
export const useGoals = (userId, options = {}) => {
  const [goals, setGoals] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    overdue: 0
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    status: 'all',
    category: 'all'
  });
  
  // Fetch user goals
  const fetchGoals = useCallback(async (fetchOptions = {}) => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const params = { ...filter, ...fetchOptions };
      const data = await goalService.getUserGoals(userId, params);
      setGoals(data.goals || data);
    } catch (err) {
      setError(err.message || 'Failed to fetch goals');
      console.error('Error fetching goals:', err);
    } finally {
      setLoading(false);
    }
  }, [userId, filter]);
  
  // Fetch goal statistics
  const fetchStats = useCallback(async () => {
    if (!userId) return;
    
    try {
      const statistics = await goalService.getGoalStats(userId);
      setStats(statistics);
    } catch (err) {
      console.error('Error fetching goal statistics:', err);
    }
  }, [userId]);
  
  // Fetch goal categories
  const fetchCategories = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await goalService.getGoalCategories(userId);
      setCategories(data.categories || data);
    } catch (err) {
      console.error('Error fetching goal categories:', err);
    }
  }, [userId]);
  
  // Create goal
  const createGoal = useCallback(async (goalData) => {
    try {
      const newGoal = await goalService.createGoal(userId, goalData);
      setGoals(prev => [newGoal, ...prev]);
      fetchStats(); // Refresh stats
      return newGoal;
    } catch (err) {
      console.error('Error creating goal:', err);
      throw err;
    }
  }, [userId, fetchStats]);
  
  // Update goal
  const updateGoal = useCallback(async (goalId, goalData) => {
    try {
      const updatedGoal = await goalService.updateGoal(goalId, goalData);
      
      setGoals(prev => 
        prev.map(goal => 
          goal.id === goalId ? { ...goal, ...updatedGoal } : goal
        )
      );
      
      fetchStats(); // Refresh stats
      return updatedGoal;
    } catch (err) {
      console.error('Error updating goal:', err);
      throw err;
    }
  }, [fetchStats]);
  
  // Delete goal
  const deleteGoal = useCallback(async (goalId) => {
    try {
      await goalService.deleteGoal(goalId);
      
      setGoals(prev => prev.filter(goal => goal.id !== goalId));
      fetchStats(); // Refresh stats
    } catch (err) {
      console.error('Error deleting goal:', err);
      throw err;
    }
  }, [fetchStats]);
  
  // Update goal progress
  const updateProgress = useCallback(async (goalId, progressData) => {
    try {
      const updatedGoal = await goalService.updateGoalProgress(goalId, progressData);
      
      setGoals(prev => 
        prev.map(goal => 
          goal.id === goalId ? { ...goal, ...updatedGoal } : goal
        )
      );
      
      fetchStats(); // Refresh stats
      return updatedGoal;
    } catch (err) {
      console.error('Error updating goal progress:', err);
      throw err;
    }
  }, [fetchStats]);
  
  // Set goal filter
  const setGoalFilter = useCallback((newFilter) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  }, []);
  
  // Refresh all data
  const refresh = useCallback(() => {
    fetchGoals();
    fetchStats();
    fetchCategories();
  }, [fetchGoals, fetchStats, fetchCategories]);
  
  // Initialize data
  useEffect(() => {
    if (userId) {
      fetchGoals(options);
      fetchStats();
      fetchCategories();
    }
  }, [userId, fetchGoals, fetchStats, fetchCategories, options]);
  
  return {
    // State
    goals,
    stats,
    categories,
    loading,
    error,
    filter,
    
    // Actions
    fetchGoals,
    createGoal,
    updateGoal,
    deleteGoal,
    updateProgress,
    setGoalFilter,
    refresh
  };
};

export default useGoals;