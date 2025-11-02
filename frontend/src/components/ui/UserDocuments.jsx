import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import useDocuments from '../../hooks/useDocuments';

const UserDocuments = ({ userId, showUploadButton = true, className = '' }) => {
  const {
    documents,
    categories,
    sharedDocuments,
    loading,
    error,
    uploadDocument,
    deleteDocument,
    updateDocumentMetadata,
    searchDocuments,
    shareDocument,
    revokeDocumentShare,
    getDocumentVersions,
    restoreDocumentVersion
  } = useDocuments(userId);

  const [activeTab, setActiveTab] = useState('all'); // all, shared, category
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showDocumentDetails, setShowDocumentDetails] = useState(null);
  const [showShareForm, setShowShareForm] = useState(null);
  const [showVersions, setShowVersions] = useState(null);
  const [newDocument, setNewDocument] = useState({
    name: '',
    description: '',
    category: 'other',
    isPublic: false
  });
  const [shareData, setShareData] = useState({
    email: '',
    permissions: 'view'
  });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  // Handle file drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  // Handle file upload
  const handleFileUpload = async (file) => {
    if (!file) return;
    
    setUploading(true);
    
    try {
      const metadata = {
        name: file.name,
        description: newDocument.description || '',
        category: newDocument.category,
        isPublic: newDocument.isPublic
      };
      
      await uploadDocument(file, metadata);
      setNewDocument({
        name: '',
        description: '',
        category: 'other',
        isPublic: false
      });
      setShowUploadForm(false);
    } catch (err) {
      console.error('Error uploading file:', err);
    } finally {
      setUploading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setNewDocument(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle share input changes
  const handleShareInputChange = (field, value) => {
    setShareData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle search
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        await searchDocuments(query);
      } catch (err) {
        console.error('Error searching documents:', err);
      }
    }
  };

  // Handle document share
  const handleShareDocument = async (documentId) => {
    if (!shareData.email) return;
    
    try {
      await shareDocument(documentId, shareData);
      setShareData({
        email: '',
        permissions: 'view'
      });
      setShowShareForm(null);
    } catch (err) {
      console.error('Error sharing document:', err);
    }
  };

  // Handle document delete
  const handleDeleteDocument = async (documentId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDocument(documentId);
      } catch (err) {
        console.error('Error deleting document:', err);
      }
    }
  };

  // Handle version restore
  const handleRestoreVersion = async (documentId, versionId) => {
    try {
      await restoreDocumentVersion(documentId, versionId);
      setShowVersions(null);
    } catch (err) {
      console.error('Error restoring version:', err);
    }
  };

  // Filter documents based on active tab and category
  const filteredDocuments = documents.filter(doc => {
    if (activeTab === 'shared') {
      return doc.shares && doc.shares.length > 0;
    }
    
    if (selectedCategory !== 'all') {
      return doc.category === selectedCategory;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        doc.name.toLowerCase().includes(query) ||
        (doc.description && doc.description.toLowerCase().includes(query)) ||
        doc.category.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Get file icon based on file type
  const getFileIcon = (mimeType) => {
    if (mimeType.includes('image')) {
      return '🖼️';
    } else if (mimeType.includes('pdf')) {
      return '📄';
    } else if (mimeType.includes('video')) {
      return '🎬';
    } else if (mimeType.includes('audio')) {
      return '🎵';
    } else if (mimeType.includes('zip') || mimeType.includes('rar')) {
      return '📦';
    } else if (mimeType.includes('text') || mimeType.includes('document')) {
      return '📝';
    } else {
      return '📁';
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-96 ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-xl p-6 text-center ${className}`}>
        <div className="text-red-600 dark:text-red-400 font-medium mb-2">
          Error loading documents
        </div>
        <div className="text-red-500 dark:text-red-300 text-sm mb-4">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Documents & Files
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your documents and files
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full sm:w-64"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {showUploadButton && (
              <button
                onClick={() => setShowUploadForm(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center whitespace-nowrap"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Document
              </button>
            )}
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All Documents
          </button>
          <button
            onClick={() => setActiveTab('shared')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'shared'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Shared with Me
          </button>
          
          {/* Category filters */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {documents.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Documents
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {sharedDocuments.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Shared with You
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {documents.filter(d => d.isPublic).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Public Documents
            </div>
          </div>
        </div>
      </div>
      
      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-700">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No documents found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery 
              ? 'No documents match your search criteria.' 
              : activeTab === 'shared'
                ? 'No documents have been shared with you yet.'
                : 'Upload your first document to get started.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDocuments.map((document) => (
            <motion.div
              key={document.id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="text-3xl">
                    {getFileIcon(document.mimeType)}
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setShowDocumentDetails(document)}
                      className="p-1 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      aria-label="View details"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setShowShareForm(document)}
                      className="p-1 text-gray-500 hover:text-green-600 dark:hover:text-green-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      aria-label="Share"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteDocument(document.id)}
                      className="p-1 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      aria-label="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                  {document.name}
                </h3>
                
                {document.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 truncate">
                    {document.description}
                  </p>
                )}
                
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span className="mr-2">{formatFileSize(document.size)}</span>
                  <span>•</span>
                  <span className="ml-2">{formatDate(document.createdAt)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    document.category === 'report' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' :
                    document.category === 'contract' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                    document.category === 'proposal' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200' :
                    document.category === 'presentation' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {document.category}
                  </span>
                  
                  {document.isPublic && (
                    <span className="text-xs text-green-600 dark:text-green-400">
                      Public
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Upload Document Modal */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg mx-4"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Upload Document
                </h3>
                <button
                  onClick={() => setShowUploadForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  dragActive 
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-indigo-600 dark:text-indigo-400">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF, DOC, XLS, PPT, JPG, PNG up to 10MB
                </p>
              </div>
              
              {uploading && (
                <div className="mt-4">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-600 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">Uploading...</span>
                  </div>
                </div>
              )}
              
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={newDocument.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter document description"
                    rows={3}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={newDocument.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="other">Other</option>
                    <option value="report">Report</option>
                    <option value="contract">Contract</option>
                    <option value="proposal">Proposal</option>
                    <option value="presentation">Presentation</option>
                    <option value="invoice">Invoice</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={newDocument.isPublic}
                    onChange={(e) => handleInputChange('isPublic', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-900 dark:text-white">
                    Make document public
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowUploadForm(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Document Details Modal */}
      {showDocumentDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg mx-4"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Document Details
                </h3>
                <button
                  onClick={() => setShowDocumentDetails(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="text-center text-4xl">
                  {getFileIcon(showDocumentDetails.mimeType)}
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    {showDocumentDetails.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {showDocumentDetails.description || 'No description provided'}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">File Size</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatFileSize(showDocumentDetails.size)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Category</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {showDocumentDetails.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Created</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDate(showDocumentDetails.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Last Modified</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDate(showDocumentDetails.updatedAt)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    showDocumentDetails.isPublic 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {showDocumentDetails.isPublic ? 'Public' : 'Private'}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowVersions(showDocumentDetails)}
                      className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Versions
                    </button>
                    <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Share Document Modal */}
      {showShareForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md mx-4"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Share Document
                </h3>
                <button
                  onClick={() => setShowShareForm(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Share with Email
                  </label>
                  <input
                    type="email"
                    value={shareData.email}
                    onChange={(e) => handleShareInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Permissions
                  </label>
                  <select
                    value={shareData.permissions}
                    onChange={(e) => handleShareInputChange('permissions', e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="view">View Only</option>
                    <option value="edit">Can Edit</option>
                    <option value="comment">Can Comment</option>
                  </select>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-lg p-3">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    The recipient will receive an email with access to this document.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowShareForm(null)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleShareDocument(showShareForm.id)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Share
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Document Versions Modal */}
      {showVersions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg mx-4"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Document Versions
                </h3>
                <button
                  onClick={() => setShowVersions(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Current Version
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(showVersions.updatedAt)}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 text-xs rounded-full">
                    Current
                  </span>
                </div>
                
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    No previous versions available
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserDocuments;