import apiClient from './apiClient';

/**
 * Goal Service
 * Handles all goal-related operations
 */

// Get user goals
export const getUserGoals = async (userId, options = {}) => {
  try {
    const params = {
      status: options.status || 'all',
      category: options.category || 'all',
      limit: options.limit || 50,
      offset: options.offset || 0,
      ...options
    };
    
    const response = await apiClient.get(`/users/${userId}/goals`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching user goals:', error);
    throw error;
  }
};

// Get goal by ID
export const getGoalById = async (goalId) => {
  try {
    const response = await apiClient.get(`/goals/${goalId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching goal:', error);
    throw error;
  }
};

// Create goal
export const createGoal = async (userId, goalData) => {
  try {
    const response = await apiClient.post(`/users/${userId}/goals`, goalData);
    return response.data;
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
};

// Update goal
export const updateGoal = async (goalId, goalData) => {
  try {
    const response = await apiClient.patch(`/goals/${goalId}`, goalData);
    return response.data;
  } catch (error) {
    console.error('Error updating goal:', error);
    throw error;
  }
};

// Delete goal
export const deleteGoal = async (goalId) => {
  try {
    const response = await apiClient.delete(`/goals/${goalId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting goal:', error);
    throw error;
  }
};

// Update goal progress
export const updateGoalProgress = async (goalId, progressData) => {
  try {
    const response = await apiClient.patch(`/goals/${goalId}/progress`, progressData);
    return response.data;
  } catch (error) {
    console.error('Error updating goal progress:', error);
    throw error;
  }
};

// Get goal progress history
export const getGoalProgressHistory = async (goalId, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || '30d',
      interval: options.interval || '1d',
      ...options
    };
    
    const response = await apiClient.get(`/goals/${goalId}/progress-history`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching goal progress history:', error);
    throw error;
  }
};

// Get goal statistics
export const getGoalStats = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/goal-stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching goal statistics:', error);
    throw error;
  }
};

// Get overdue goals
export const getOverdueGoals = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/goals/overdue`);
    return response.data;
  } catch (error) {
    console.error('Error fetching overdue goals:', error);
    throw error;
  }
};

// Get completed goals
export const getCompletedGoals = async (userId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 10,
      offset: options.offset || 0,
      ...options
    };
    
    const response = await apiClient.get(`/users/${userId}/goals/completed`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching completed goals:', error);
    throw error;
  }
};

// Get goal categories
export const getGoalCategories = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/goal-categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching goal categories:', error);
    throw error;
  }
};

// Set goal reminder
export const setGoalReminder = async (goalId, reminderData) => {
  try {
    const response = await apiClient.post(`/goals/${goalId}/reminders`, reminderData);
    return response.data;
  } catch (error) {
    console.error('Error setting goal reminder:', error);
    throw error;
  }
};

// Get goal reminders
export const getGoalReminders = async (goalId) => {
  try {
    const response = await apiClient.get(`/goals/${goalId}/reminders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching goal reminders:', error);
    throw error;
  }
};

// Share goal
export const shareGoal = async (goalId, shareData) => {
  try {
    const response = await apiClient.post(`/goals/${goalId}/share`, shareData);
    return response.data;
  } catch (error) {
    console.error('Error sharing goal:', error);
    throw error;
  }
};

export default {
  getUserGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
  updateGoalProgress,
  getGoalProgressHistory,
  getGoalStats,
  getOverdueGoals,
  getCompletedGoals,
  getGoalCategories,
  setGoalReminder,
  getGoalReminders,
  shareGoal
};