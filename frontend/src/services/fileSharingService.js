import apiClient from './apiClient';

/**
 * File Sharing Service
 * Handles all file sharing and collaboration operations
 */

// Upload file for sharing
export const uploadFile = async (file, metadata = {}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));
    
    const response = await apiClient.post('/file-sharing/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Get shared files for user
export const getUserSharedFiles = async (userId, options = {}) => {
  try {
    const params = {
      limit: options.limit || 50,
      offset: options.offset || 0,
      sortBy: options.sortBy || 'createdAt',
      sortOrder: options.sortOrder || 'desc',
      ...options
    };
    
    const response = await apiClient.get(`/users/${userId}/shared-files`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching shared files:', error);
    throw error;
  }
};

// Get file by ID
export const getFileById = async (fileId) => {
  try {
    const response = await apiClient.get(`/file-sharing/${fileId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching file:', error);
    throw error;
  }
};

// Share file with users
export const shareFileWithUsers = async (fileId, userIds, permissions = {}) => {
  try {
    const response = await apiClient.post(`/file-sharing/${fileId}/share`, {
      userIds,
      permissions
    });
    return response.data;
  } catch (error) {
    console.error('Error sharing file:', error);
    throw error;
  }
};

// Share file with teams
export const shareFileWithTeams = async (fileId, teamIds, permissions = {}) => {
  try {
    const response = await apiClient.post(`/file-sharing/${fileId}/share-with-teams`, {
      teamIds,
      permissions
    });
    return response.data;
  } catch (error) {
    console.error('Error sharing file with teams:', error);
    throw error;
  }
};

// Update file permissions
export const updateFilePermissions = async (fileId, permissions) => {
  try {
    const response = await apiClient.patch(`/file-sharing/${fileId}/permissions`, {
      permissions
    });
    return response.data;
  } catch (error) {
    console.error('Error updating file permissions:', error);
    throw error;
  }
};

// Get file permissions
export const getFilePermissions = async (fileId) => {
  try {
    const response = await apiClient.get(`/file-sharing/${fileId}/permissions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching file permissions:', error);
    throw error;
  }
};

// Delete shared file
export const deleteSharedFile = async (fileId) => {
  try {
    const response = await apiClient.delete(`/file-sharing/${fileId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting shared file:', error);
    throw error;
  }
};

// Download file
export const downloadFile = async (fileId) => {
  try {
    const response = await apiClient.get(`/file-sharing/${fileId}/download`, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

// Get file preview
export const getFilePreview = async (fileId, options = {}) => {
  try {
    const params = {
      width: options.width || 800,
      height: options.height || 600,
      ...options
    };
    
    const response = await apiClient.get(`/file-sharing/${fileId}/preview`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching file preview:', error);
    throw error;
  }
};

// Add file comment
export const addFileComment = async (fileId, commentData) => {
  try {
    const response = await apiClient.post(`/file-sharing/${fileId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error adding file comment:', error);
    throw error;
  }
};

// Get file comments
export const getFileComments = async (fileId) => {
  try {
    const response = await apiClient.get(`/file-sharing/${fileId}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching file comments:', error);
    throw error;
  }
};

// Get file version history
export const getFileVersionHistory = async (fileId) => {
  try {
    const response = await apiClient.get(`/file-sharing/${fileId}/versions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching file version history:', error);
    throw error;
  }
};

// Revert to file version
export const revertToFileVersion = async (fileId, versionId) => {
  try {
    const response = await apiClient.post(`/file-sharing/${fileId}/versions/${versionId}/revert`);
    return response.data;
  } catch (error) {
    console.error('Error reverting to file version:', error);
    throw error;
  }
};

// Get file statistics
export const getFileStats = async (fileId) => {
  try {
    const response = await apiClient.get(`/file-sharing/${fileId}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching file statistics:', error);
    throw error;
  }
};

// Search shared files
export const searchSharedFiles = async (query, options = {}) => {
  try {
    const params = {
      q: query,
      limit: options.limit || 20,
      offset: options.offset || 0,
      ...options
    };
    
    const response = await apiClient.get('/file-sharing/search', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching shared files:', error);
    throw error;
  }
};

export default {
  uploadFile,
  getUserSharedFiles,
  getFileById,
  shareFileWithUsers,
  shareFileWithTeams,
  updateFilePermissions,
  getFilePermissions,
  deleteSharedFile,
  downloadFile,
  getFilePreview,
  addFileComment,
  getFileComments,
  getFileVersionHistory,
  revertToFileVersion,
  getFileStats,
  searchSharedFiles
};