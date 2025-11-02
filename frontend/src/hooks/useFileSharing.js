import { useState, useEffect, useCallback } from 'react';
import * as fileSharingService from '../services/fileSharingService';

/**
 * Custom hook for managing file sharing
 * @param {string} userId - The ID of the user
 * @param {Object} options - Configuration options
 * @returns {Object} File sharing state and actions
 */
export const useFileSharing = (userId, options = {}) => {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissions, setPermissions] = useState({});
  const [comments, setComments] = useState([]);
  const [stats, setStats] = useState(null);
  
  // Fetch user shared files
  const fetchSharedFiles = useCallback(async (fetchOptions = {}) => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fileSharingService.getUserSharedFiles(userId, fetchOptions);
      setFiles(data.files || data);
    } catch (err) {
      setError(err.message || 'Failed to fetch shared files');
      console.error('Error fetching shared files:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);
  
  // Upload file
  const uploadFile = useCallback(async (file, metadata = {}) => {
    try {
      const uploadedFile = await fileSharingService.uploadFile(file, metadata);
      setFiles(prev => [uploadedFile, ...prev]);
      return uploadedFile;
    } catch (err) {
      console.error('Error uploading file:', err);
      throw err;
    }
  }, []);
  
  // Get file by ID
  const getFileById = useCallback(async (fileId) => {
    try {
      const file = await fileSharingService.getFileById(fileId);
      setCurrentFile(file);
      return file;
    } catch (err) {
      console.error('Error fetching file:', err);
      throw err;
    }
  }, []);
  
  // Share file with users
  const shareFileWithUsers = useCallback(async (fileId, userIds, permissions = {}) => {
    try {
      const result = await fileSharingService.shareFileWithUsers(fileId, userIds, permissions);
      return result;
    } catch (err) {
      console.error('Error sharing file with users:', err);
      throw err;
    }
  }, []);
  
  // Share file with teams
  const shareFileWithTeams = useCallback(async (fileId, teamIds, permissions = {}) => {
    try {
      const result = await fileSharingService.shareFileWithTeams(fileId, teamIds, permissions);
      return result;
    } catch (err) {
      console.error('Error sharing file with teams:', err);
      throw err;
    }
  }, []);
  
  // Update file permissions
  const updateFilePermissions = useCallback(async (fileId, newPermissions) => {
    try {
      const updatedPermissions = await fileSharingService.updateFilePermissions(fileId, newPermissions);
      setPermissions(prev => ({
        ...prev,
        [fileId]: updatedPermissions
      }));
      return updatedPermissions;
    } catch (err) {
      console.error('Error updating file permissions:', err);
      throw err;
    }
  }, []);
  
  // Get file permissions
  const getFilePermissions = useCallback(async (fileId) => {
    try {
      const filePermissions = await fileSharingService.getFilePermissions(fileId);
      setPermissions(prev => ({
        ...prev,
        [fileId]: filePermissions
      }));
      return filePermissions;
    } catch (err) {
      console.error('Error fetching file permissions:', err);
      throw err;
    }
  }, []);
  
  // Delete shared file
  const deleteSharedFile = useCallback(async (fileId) => {
    try {
      await fileSharingService.deleteSharedFile(fileId);
      setFiles(prev => prev.filter(file => file.id !== fileId));
      if (currentFile && currentFile.id === fileId) {
        setCurrentFile(null);
      }
    } catch (err) {
      console.error('Error deleting shared file:', err);
      throw err;
    }
  }, [currentFile]);
  
  // Download file
  const downloadFile = useCallback(async (fileId) => {
    try {
      const blob = await fileSharingService.downloadFile(fileId);
      return blob;
    } catch (err) {
      console.error('Error downloading file:', err);
      throw err;
    }
  }, []);
  
  // Get file preview
  const getFilePreview = useCallback(async (fileId, options = {}) => {
    try {
      const preview = await fileSharingService.getFilePreview(fileId, options);
      return preview;
    } catch (err) {
      console.error('Error fetching file preview:', err);
      throw err;
    }
  }, []);
  
  // Add file comment
  const addFileComment = useCallback(async (fileId, commentData) => {
    try {
      const newComment = await fileSharingService.addFileComment(fileId, commentData);
      setComments(prev => [newComment, ...prev]);
      return newComment;
    } catch (err) {
      console.error('Error adding file comment:', err);
      throw err;
    }
  }, []);
  
  // Get file comments
  const getFileComments = useCallback(async (fileId) => {
    try {
      const fileComments = await fileSharingService.getFileComments(fileId);
      setComments(fileComments.comments || fileComments);
      return fileComments;
    } catch (err) {
      console.error('Error fetching file comments:', err);
      throw err;
    }
  }, []);
  
  // Get file statistics
  const getFileStats = useCallback(async (fileId) => {
    try {
      const fileStats = await fileSharingService.getFileStats(fileId);
      setStats(fileStats);
      return fileStats;
    } catch (err) {
      console.error('Error fetching file statistics:', err);
      throw err;
    }
  }, []);
  
  // Search shared files
  const searchSharedFiles = useCallback(async (query, searchOptions = {}) => {
    try {
      const results = await fileSharingService.searchSharedFiles(query, searchOptions);
      return results;
    } catch (err) {
      console.error('Error searching shared files:', err);
      throw err;
    }
  }, []);
  
  // Initialize data
  useEffect(() => {
    if (userId) {
      fetchSharedFiles(options);
    }
  }, [userId, fetchSharedFiles, options]);
  
  return {
    // State
    files,
    currentFile,
    loading,
    error,
    permissions,
    comments,
    stats,
    
    // Actions
    fetchSharedFiles,
    uploadFile,
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
    getFileStats,
    searchSharedFiles
  };
};

export default useFileSharing;