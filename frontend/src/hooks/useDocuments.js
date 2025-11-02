import { useState, useEffect, useCallback } from 'react';
import * as documentsService from '../services/documentsService';

/**
 * Custom hook for managing user documents
 * @param {string} userId - User ID
 * @returns {object} Documents management functions and state
 */
export const useDocuments = (userId) => {
  const [documents, setDocuments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sharedDocuments, setSharedDocuments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch user documents
   */
  const fetchDocuments = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await documentsService.getUserDocuments(userId);
      setDocuments(data);
    } catch (err) {
      setError(err.message || 'Failed to load documents');
      console.error('Error fetching documents:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Fetch document categories
   */
  const fetchCategories = useCallback(async () => {
    try {
      const data = await documentsService.getDocumentCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching document categories:', err);
    }
  }, []);

  /**
   * Fetch shared documents
   */
  const fetchSharedDocuments = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await documentsService.getSharedDocuments(userId);
      setSharedDocuments(data);
    } catch (err) {
      console.error('Error fetching shared documents:', err);
    }
  }, [userId]);

  /**
   * Fetch document statistics
   */
  const fetchStats = useCallback(async () => {
    try {
      const data = await documentsService.getDocumentStats();
      setStats(data);
    } catch (err) {
      console.error('Error fetching document stats:', err);
    }
  }, []);

  /**
   * Upload document
   * @param {File} file - File to upload
   * @param {object} metadata - Document metadata
   */
  const uploadDocument = useCallback(async (file, metadata = {}) => {
    if (!userId) return;
    
    try {
      const response = await documentsService.uploadDocument(userId, file, metadata);
      setDocuments(prev => [...prev, response.document]);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to upload document');
      console.error('Error uploading document:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Delete document
   * @param {string} documentId - Document ID
   */
  const deleteDocument = useCallback(async (documentId) => {
    try {
      await documentsService.deleteDocument(documentId);
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    } catch (err) {
      setError(err.message || 'Failed to delete document');
      console.error('Error deleting document:', err);
      throw err;
    }
  }, []);

  /**
   * Update document metadata
   * @param {string} documentId - Document ID
   * @param {object} metadata - Updated metadata
   */
  const updateDocumentMetadata = useCallback(async (documentId, metadata) => {
    try {
      const response = await documentsService.updateDocumentMetadata(documentId, metadata);
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === documentId ? response.document : doc
        )
      );
      return response;
    } catch (err) {
      setError(err.message || 'Failed to update document metadata');
      console.error('Error updating document metadata:', err);
      throw err;
    }
  }, []);

  /**
   * Get documents by category
   * @param {string} category - Document category
   * @param {object} options - Query options
   * @returns {Promise<Array>} Documents by category
   */
  const getDocumentsByCategory = useCallback(async (category, options = {}) => {
    if (!userId) return [];
    
    try {
      const data = await documentsService.getDocumentsByCategory(userId, category, options);
      return data;
    } catch (err) {
      console.error('Error fetching documents by category:', err);
      return [];
    }
  }, [userId]);

  /**
   * Search documents
   * @param {string} query - Search query
   * @param {object} options - Search options
   * @returns {Promise<Array>} Search results
   */
  const searchDocuments = useCallback(async (query, options = {}) => {
    if (!userId) return [];
    
    try {
      const results = await documentsService.searchDocuments(userId, query, options);
      return results;
    } catch (err) {
      setError(err.message || 'Failed to search documents');
      console.error('Error searching documents:', err);
      return [];
    }
  }, [userId]);

  /**
   * Share document
   * @param {string} documentId - Document ID
   * @param {object} shareData - Share data
   */
  const shareDocument = useCallback(async (documentId, shareData) => {
    try {
      const response = await documentsService.shareDocument(documentId, shareData);
      
      // Update local state
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === documentId 
            ? { 
                ...doc, 
                shares: doc.shares ? [...doc.shares, response.share] : [response.share],
                shareCount: (doc.shareCount || 0) + 1
              } 
            : doc
        )
      );
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to share document');
      console.error('Error sharing document:', err);
      throw err;
    }
  }, []);

  /**
   * Get document shares
   * @param {string} documentId - Document ID
   * @returns {Promise<Array>} Document shares
   */
  const getDocumentShares = useCallback(async (documentId) => {
    try {
      const shares = await documentsService.getDocumentShares(documentId);
      return shares;
    } catch (err) {
      console.error('Error fetching document shares:', err);
      return [];
    }
  }, []);

  /**
   * Revoke document share
   * @param {string} shareId - Share ID
   * @param {string} documentId - Document ID
   */
  const revokeDocumentShare = useCallback(async (shareId, documentId) => {
    try {
      await documentsService.revokeDocumentShare(shareId);
      
      // Update local state
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === documentId 
            ? { 
                ...doc, 
                shares: doc.shares ? doc.shares.filter(s => s.id !== shareId) : [],
                shareCount: Math.max(0, (doc.shareCount || 0) - 1)
              } 
            : doc
        )
      );
    } catch (err) {
      setError(err.message || 'Failed to revoke document share');
      console.error('Error revoking document share:', err);
      throw err;
    }
  }, []);

  /**
   * Get document versions
   * @param {string} documentId - Document ID
   * @returns {Promise<Array>} Document versions
   */
  const getDocumentVersions = useCallback(async (documentId) => {
    try {
      const versions = await documentsService.getDocumentVersions(documentId);
      return versions;
    } catch (err) {
      console.error('Error fetching document versions:', err);
      return [];
    }
  }, []);

  /**
   * Restore document version
   * @param {string} documentId - Document ID
   * @param {string} versionId - Version ID
   */
  const restoreDocumentVersion = useCallback(async (documentId, versionId) => {
    try {
      const response = await documentsService.restoreDocumentVersion(documentId, versionId);
      
      // Update local state
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === documentId ? response.document : doc
        )
      );
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to restore document version');
      console.error('Error restoring document version:', err);
      throw err;
    }
  }, []);

  /**
   * Export documents
   * @param {object} options - Export options
   * @returns {Promise<object>} Exported documents
   */
  const exportDocuments = useCallback(async (options = {}) => {
    if (!userId) return;
    
    try {
      const exported = await documentsService.exportDocuments(userId, options);
      return exported;
    } catch (err) {
      setError(err.message || 'Failed to export documents');
      console.error('Error exporting documents:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Import documents
   * @param {object} importData - Import data
   */
  const importDocuments = useCallback(async (importData) => {
    if (!userId) return;
    
    try {
      const response = await documentsService.importDocuments(userId, importData);
      
      // Update local state with imported documents
      if (response.documents) {
        setDocuments(prev => [...prev, ...response.documents]);
      }
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to import documents');
      console.error('Error importing documents:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Get document notifications
   * @param {object} options - Query options
   * @returns {Promise<Array>} Document notifications
   */
  const getNotifications = useCallback(async (options = {}) => {
    try {
      const notifications = await documentsService.getDocumentNotifications(options);
      return notifications;
    } catch (err) {
      console.error('Error fetching document notifications:', err);
      return [];
    }
  }, []);

  /**
   * Mark document notification as read
   * @param {string} notificationId - Notification ID
   */
  const markNotificationAsRead = useCallback(async (notificationId) => {
    try {
      await documentsService.markDocumentNotificationAsRead(notificationId);
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  }, []);

  // Fetch documents, categories, shared documents, and stats on mount and when userId changes
  useEffect(() => {
    if (userId) {
      fetchDocuments();
      fetchCategories();
      fetchSharedDocuments();
      fetchStats();
    }
  }, [userId, fetchDocuments, fetchCategories, fetchSharedDocuments, fetchStats]);

  return {
    documents,
    categories,
    sharedDocuments,
    stats,
    loading,
    error,
    fetchDocuments,
    uploadDocument,
    deleteDocument,
    updateDocumentMetadata,
    getDocumentsByCategory,
    searchDocuments,
    shareDocument,
    getDocumentShares,
    revokeDocumentShare,
    getDocumentVersions,
    restoreDocumentVersion,
    exportDocuments,
    importDocuments,
    getNotifications,
    markNotificationAsRead
  };
};

export default useDocuments;