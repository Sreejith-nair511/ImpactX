import apiClient from './apiClient';

/**
 * Task Management Service
 * Handles all task-related operations
 */

// Get user tasks
export const getUserTasks = async (userId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 50,
      offset: options.offset || 0,
      status: options.status || 'all',
      priority: options.priority || 'all',
      sortBy: options.sortBy || 'createdAt',
      sortOrder: options.sortOrder || 'desc',
      ...options
    };
    
    const response = await apiClient.get(`/users/${userId}/tasks`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Get task by ID
export const getTaskById = async (taskId) => {
  try {
    const response = await apiClient.get(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task:', error);
    throw error;
  }
};

// Create task
export const createTask = async (taskData) => {
  try {
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Update task
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await apiClient.patch(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Delete task
export const deleteTask = async (taskId) => {
  try {
    const response = await apiClient.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

// Assign task to user
export const assignTask = async (taskId, assigneeId) => {
  try {
    const response = await apiClient.post(`/tasks/${taskId}/assign`, { assigneeId });
    return response.data;
  } catch (error) {
    console.error('Error assigning task:', error);
    throw error;
  }
};

// Unassign task
export const unassignTask = async (taskId) => {
  try {
    const response = await apiClient.post(`/tasks/${taskId}/unassign`);
    return response.data;
  } catch (error) {
    console.error('Error unassigning task:', error);
    throw error;
  }
};

// Change task status
export const changeTaskStatus = async (taskId, status) => {
  try {
    const response = await apiClient.patch(`/tasks/${taskId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error changing task status:', error);
    throw error;
  }
};

// Add task comment
export const addTaskComment = async (taskId, commentData) => {
  try {
    const response = await apiClient.post(`/tasks/${taskId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error adding task comment:', error);
    throw error;
  }
};

// Get task comments
export const getTaskComments = async (taskId) => {
  try {
    const response = await apiClient.get(`/tasks/${taskId}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task comments:', error);
    throw error;
  }
};

// Add task attachment
export const addTaskAttachment = async (taskId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post(`/tasks/${taskId}/attachments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding task attachment:', error);
    throw error;
  }
};

// Get task attachments
export const getTaskAttachments = async (taskId) => {
  try {
    const response = await apiClient.get(`/tasks/${taskId}/attachments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task attachments:', error);
    throw error;
  }
};

// Get task statistics
export const getTaskStats = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/task-stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task statistics:', error);
    throw error;
  }
};

// Get overdue tasks
export const getOverdueTasks = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/tasks/overdue`);
    return response.data;
  } catch (error) {
    console.error('Error fetching overdue tasks:', error);
    throw error;
  }
};

// Get upcoming tasks
export const getUpcomingTasks = async (userId, days = 7) => {
  try {
    const response = await apiClient.get(`/users/${userId}/tasks/upcoming`, {
      params: { days }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming tasks:', error);
    throw error;
  }
};

export default {
  getUserTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  assignTask,
  unassignTask,
  changeTaskStatus,
  addTaskComment,
  getTaskComments,
  addTaskAttachment,
  getTaskAttachments,
  getTaskStats,
  getOverdueTasks,
  getUpcomingTasks
};