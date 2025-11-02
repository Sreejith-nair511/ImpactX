import { useState, useEffect, useCallback } from 'react';
import * as taskService from '../services/taskService';

/**
 * Custom hook for managing user tasks
 * @param {string} userId - The ID of the user
 * @param {Object} options - Configuration options
 * @returns {Object} Task state and actions
 */
export const useTasks = (userId, options = {}) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
    overdue: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    status: 'all',
    priority: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  
  // Fetch tasks
  const fetchTasks = useCallback(async (fetchOptions = {}) => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const params = { ...filter, ...fetchOptions };
      const data = await taskService.getUserTasks(userId, params);
      setTasks(data.tasks || data);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [userId, filter]);
  
  // Fetch task statistics
  const fetchStats = useCallback(async () => {
    if (!userId) return;
    
    try {
      const statistics = await taskService.getTaskStats(userId);
      setStats(statistics);
    } catch (err) {
      console.error('Error fetching task statistics:', err);
    }
  }, [userId]);
  
  // Create task
  const createTask = useCallback(async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      fetchStats(); // Refresh stats
      return newTask;
    } catch (err) {
      console.error('Error creating task:', err);
      throw err;
    }
  }, [fetchStats]);
  
  // Update task
  const updateTask = useCallback(async (taskId, taskData) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, taskData);
      
      setTasks(prev => 
        prev.map(task => 
          task.id === taskId ? { ...task, ...updatedTask } : task
        )
      );
      
      fetchStats(); // Refresh stats
      return updatedTask;
    } catch (err) {
      console.error('Error updating task:', err);
      throw err;
    }
  }, [fetchStats]);
  
  // Delete task
  const deleteTask = useCallback(async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      
      setTasks(prev => prev.filter(task => task.id !== taskId));
      fetchStats(); // Refresh stats
    } catch (err) {
      console.error('Error deleting task:', err);
      throw err;
    }
  }, [fetchStats]);
  
  // Change task status
  const changeTaskStatus = useCallback(async (taskId, status) => {
    try {
      const updatedTask = await taskService.changeTaskStatus(taskId, status);
      
      setTasks(prev => 
        prev.map(task => 
          task.id === taskId ? { ...task, ...updatedTask } : task
        )
      );
      
      fetchStats(); // Refresh stats
      return updatedTask;
    } catch (err) {
      console.error('Error changing task status:', err);
      throw err;
    }
  }, [fetchStats]);
  
  // Assign task
  const assignTask = useCallback(async (taskId, assigneeId) => {
    try {
      const updatedTask = await taskService.assignTask(taskId, assigneeId);
      
      setTasks(prev => 
        prev.map(task => 
          task.id === taskId ? { ...task, ...updatedTask } : task
        )
      );
      
      return updatedTask;
    } catch (err) {
      console.error('Error assigning task:', err);
      throw err;
    }
  }, []);
  
  // Add task comment
  const addTaskComment = useCallback(async (taskId, commentData) => {
    try {
      const comment = await taskService.addTaskComment(taskId, commentData);
      
      // Update task with new comment count or latest comment
      setTasks(prev => 
        prev.map(task => 
          task.id === taskId 
            ? { 
                ...task, 
                commentsCount: task.commentsCount ? task.commentsCount + 1 : 1,
                latestComment: comment
              } 
            : task
        )
      );
      
      return comment;
    } catch (err) {
      console.error('Error adding task comment:', err);
      throw err;
    }
  }, []);
  
  // Add task attachment
  const addTaskAttachment = useCallback(async (taskId, file) => {
    try {
      const attachment = await taskService.addTaskAttachment(taskId, file);
      
      // Update task with new attachment count
      setTasks(prev => 
        prev.map(task => 
          task.id === taskId 
            ? { 
                ...task, 
                attachmentsCount: task.attachmentsCount ? task.attachmentsCount + 1 : 1
              } 
            : task
        )
      );
      
      return attachment;
    } catch (err) {
      console.error('Error adding task attachment:', err);
      throw err;
    }
  }, []);
  
  // Set filter
  const setTaskFilter = useCallback((newFilter) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  }, []);
  
  // Refresh all data
  const refresh = useCallback(() => {
    fetchTasks();
    fetchStats();
  }, [fetchTasks, fetchStats]);
  
  // Initialize data
  useEffect(() => {
    if (userId) {
      fetchTasks(options);
      fetchStats();
    }
  }, [userId, fetchTasks, fetchStats, options]);
  
  return {
    // State
    tasks,
    stats,
    loading,
    error,
    filter,
    
    // Actions
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
    assignTask,
    addTaskComment,
    addTaskAttachment,
    setTaskFilter,
    refresh
  };
};

export default useTasks;