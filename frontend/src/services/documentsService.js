/**
 * Documents service for managing user documents and files
 */

import api from './apiClient';

/**
 * Get user documents
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} User documents
 */
export const getUserDocuments = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/documents`, {
      params: options
    });
    return response.documents || [];
  } catch (error) {
    console.error('Error fetching user documents:', error);
    throw error;
  }
};

/**
 * Get document details
 * @param {string} documentId - Document ID
 * @returns {Promise<object>} Document details
 */
export const getDocument = async (documentId) => {
  try {
    const response = await api.get(`/documents/${documentId}`);
    return response;
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
};

/**
 * Upload document
 * @param {string} userId - User ID
 * @param {File} file - File to upload
 * @param {object} metadata - Document metadata
 * @returns {Promise<object>} Uploaded document
 */
export const uploadDocument = async (userId, file, metadata = {}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
    
    // Append metadata
    Object.keys(metadata).forEach(key => {
      formData.append(key, metadata[key]);
    });
    
    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

/**
 * Delete document
 * @param {string} documentId - Document ID
 * @returns {Promise<object>} Delete response
 */
export const deleteDocument = async (documentId) => {
  try {
    const response = await api.delete(`/documents/${documentId}`);
    return response;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

/**
 * Update document metadata
 * @param {string} documentId - Document ID
 * @param {object} metadata - Updated metadata
 * @returns {Promise<object>} Updated document
 */
export const updateDocumentMetadata = async (documentId, metadata) => {
  try {
    const response = await api.put(`/documents/${documentId}/metadata`, metadata);
    return response;
  } catch (error) {
    console.error('Error updating document metadata:', error);
    throw error;
  }
};

/**
 * Get document categories
 * @returns {Promise<Array>} Document categories
 */
export const getDocumentCategories = async () => {
  try {
    const response = await api.get('/documents/categories');
    return response.categories || [];
  } catch (error) {
    console.error('Error fetching document categories:', error);
    throw error;
  }
};

/**
 * Get documents by category
 * @param {string} userId - User ID
 * @param {string} category - Document category
 * @param {object} options - Query options
 * @returns {Promise<Array>} Documents by category
 */
export const getDocumentsByCategory = async (userId, category, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/documents/category/${category}`, {
      params: options
    });
    return response.documents || [];
  } catch (error) {
    console.error('Error fetching documents by category:', error);
    throw error;
  }
};

/**
 * Search documents
 * @param {string} userId - User ID
 * @param {string} query - Search query
 * @param {object} options - Search options
 * @returns {Promise<Array>} Search results
 */
export const searchDocuments = async (userId, query, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/documents/search`, {
      params: {
        q: query,
        ...options
      }
    });
    return response.documents || [];
  } catch (error) {
    console.error('Error searching documents:', error);
    throw error;
  }
};

/**
 * Get document preview
 * @param {string} documentId - Document ID
 * @returns {Promise<object>} Document preview
 */
export const getDocumentPreview = async (documentId) => {
  try {
    const response = await api.get(`/documents/${documentId}/preview`);
    return response;
  } catch (error) {
    console.error('Error fetching document preview:', error);
    throw error;
  }
};

/**
 * Share document
 * @param {string} documentId - Document ID
 * @param {object} shareData - Share data
 * @returns {Promise<object>} Share response
 */
export const shareDocument = async (documentId, shareData) => {
  try {
    const response = await api.post(`/documents/${documentId}/share`, shareData);
    return response;
  } catch (error) {
    console.error('Error sharing document:', error);
    throw error;
  }
};

/**
 * Get document shares
 * @param {string} documentId - Document ID
 * @returns {Promise<Array>} Document shares
 */
export const getDocumentShares = async (documentId) => {
  try {
    const response = await api.get(`/documents/${documentId}/shares`);
    return response.shares || [];
  } catch (error) {
    console.error('Error fetching document shares:', error);
    throw error;
  }
};

/**
 * Revoke document share
 * @param {string} shareId - Share ID
 * @returns {Promise<object>} Revoke response
 */
export const revokeDocumentShare = async (shareId) => {
  try {
    const response = await api.delete(`/documents/shares/${shareId}`);
    return response;
  } catch (error) {
    console.error('Error revoking document share:', error);
    throw error;
  }
};

/**
 * Get shared documents
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<Array>} Shared documents
 */
export const getSharedDocuments = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/documents/shared`, {
      params: options
    });
    return response.documents || [];
  } catch (error) {
    console.error('Error fetching shared documents:', error);
    throw error;
  }
};

/**
 * Get document versions
 * @param {string} documentId - Document ID
 * @returns {Promise<Array>} Document versions
 */
export const getDocumentVersions = async (documentId) => {
  try {
    const response = await api.get(`/documents/${documentId}/versions`);
    return response.versions || [];
  } catch (error) {
    console.error('Error fetching document versions:', error);
    throw error;
  }
};

/**
 * Restore document version
 * @param {string} documentId - Document ID
 * @param {string} versionId - Version ID
 * @returns {Promise<object>} Restore response
 */
export const restoreDocumentVersion = async (documentId, versionId) => {
  try {
    const response = await api.post(`/documents/${documentId}/versions/${versionId}/restore`);
    return response;
  } catch (error) {
    console.error('Error restoring document version:', error);
    throw error;
  }
};

/**
 * Get document statistics
 * @param {object} options - Query options
 * @returns {Promise<object>} Document statistics
 */
export const getDocumentStats = async (options = {}) => {
  try {
    const response = await api.get('/documents/stats', {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error fetching document stats:', error);
    throw error;
  }
};

/**
 * Export documents
 * @param {string} userId - User ID
 * @param {object} options - Export options
 * @returns {Promise<object>} Exported documents
 */
export const exportDocuments = async (userId, options = {}) => {
  try {
    const response = await api.get(`/users/${userId}/documents/export`, {
      params: options
    });
    return response;
  } catch (error) {
    console.error('Error exporting documents:', error);
    throw error;
  }
};

/**
 * Import documents
 * @param {string} userId - User ID
 * @param {object} importData - Import data
 * @returns {Promise<object>} Import response
 */
export const importDocuments = async (userId, importData) => {
  try {
    const response = await api.post(`/users/${userId}/documents/import`, importData);
    return response;
  } catch (error) {
    console.error('Error importing documents:', error);
    throw error;
  }
};

/**
 * Get document notifications
 * @param {object} options - Query options
 * @returns {Promise<Array>} Document notifications
 */
export const getDocumentNotifications = async (options = {}) => {
  try {
    const response = await api.get('/documents/notifications', {
      params: options
    });
    return response.notifications || [];
  } catch (error) {
    console.error('Error fetching document notifications:', error);
    throw error;
  }
};

/**
 * Mark document notification as read
 * @param {string} notificationId - Notification ID
 * @returns {Promise<object>} Read status
 */
export const markDocumentNotificationAsRead = async (notificationId) => {
  try {
    const response = await api.post(`/documents/notifications/${notificationId}/read`);
    return response;
  } catch (error) {
    console.error('Error marking document notification as read:', error);
    throw error;
  }
};

// Default export
export default {
  getUserDocuments,
  getDocument,
  uploadDocument,
  deleteDocument,
  updateDocumentMetadata,
  getDocumentCategories,
  getDocumentsByCategory,
  searchDocuments,
  getDocumentPreview,
  shareDocument,
  getDocumentShares,
  revokeDocumentShare,
  getSharedDocuments,
  getDocumentVersions,
  restoreDocumentVersion,
  getDocumentStats,
  exportDocuments,
  importDocuments,
  getDocumentNotifications,
  markDocumentNotificationAsRead
};