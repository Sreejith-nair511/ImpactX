import React, { useState } from 'react';
import { Upload, Download, Share2, Eye, File, FileText, Image, Video, Music, Archive, MoreVertical, Search, Filter, SortAsc } from 'lucide-react';
import './FileSharing.css';

/**
 * File Sharing Component
 * Allows users to upload, share, and manage files
 */
const FileSharing = ({ userId, className = '' }) => {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Project_Plan.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadedBy: 'Alex Johnson',
      uploadedAt: '2024-01-15T10:30:00Z',
      sharedWith: ['Team A', 'Team B'],
      permissions: 'read-write'
    },
    {
      id: '2',
      name: 'Design_Specs.fig',
      type: 'figma',
      size: '5.1 MB',
      uploadedBy: 'Taylor Kim',
      uploadedAt: '2024-01-14T14:22:00Z',
      sharedWith: ['Design Team'],
      permissions: 'read-only'
    },
    {
      id: '3',
      name: 'Meeting_Notes.docx',
      type: 'document',
      size: '0.8 MB',
      uploadedBy: 'Jordan Lee',
      uploadedAt: '2024-01-13T09:15:00Z',
      sharedWith: ['All Team Members'],
      permissions: 'read-write'
    }
  ]);
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newFile, setNewFile] = useState(null);
  
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
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Get file icon based on type
  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText className="file-icon" />;
      case 'image':
      case 'figma':
        return <Image className="file-icon" />;
      case 'video':
        return <Video className="file-icon" />;
      case 'audio':
        return <Music className="file-icon" />;
      case 'archive':
        return <Archive className="file-icon" />;
      default:
        return <File className="file-icon" />;
    }
  };
  
  // Handle file selection
  const handleFileSelect = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };
  
  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, this would upload to a server
      console.log('Uploading file:', file);
      setShowUploadModal(false);
    }
  };
  
  // Handle file download
  const handleFileDownload = (fileId) => {
    // In a real app, this would download the file
    console.log('Downloading file:', fileId);
  };
  
  // Handle file share
  const handleFileShare = (fileId) => {
    // In a real app, this would open a share dialog
    console.log('Sharing file:', fileId);
  };
  
  // Handle file preview
  const handleFilePreview = (fileId) => {
    // In a real app, this would show a preview
    console.log('Previewing file:', fileId);
  };
  
  // Filter files based on search query
  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className={`file-sharing ${className}`}>
      <div className="file-sharing__header">
        <h3>File Sharing</h3>
        
        <div className="file-sharing__controls">
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="action-buttons">
            <button 
              className="btn-upload"
              onClick={() => setShowUploadModal(true)}
            >
              <Upload size={16} />
              Upload
            </button>
            
            <button className="btn-filter">
              <Filter size={16} />
              Filter
            </button>
            
            <button className="btn-sort">
              <SortAsc size={16} />
              Sort
            </button>
          </div>
        </div>
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="file-sharing__bulk-actions">
          <span>{selectedFiles.length} file(s) selected</span>
          <div className="bulk-action-buttons">
            <button className="btn-bulk-download">
              <Download size={16} />
              Download
            </button>
            <button className="btn-bulk-share">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>
      )}
      
      <div className="file-sharing__list">
        {filteredFiles.length === 0 ? (
          <div className="file-sharing__empty">
            <File size={48} />
            <p>No files found. Upload your first file to get started!</p>
            <button 
              className="btn-upload-large"
              onClick={() => setShowUploadModal(true)}
            >
              <Upload size={20} />
              Upload File
            </button>
          </div>
        ) : (
          <div className="files-grid">
            {filteredFiles.map((file) => (
              <div 
                key={file.id} 
                className={`file-card ${selectedFiles.includes(file.id) ? 'selected' : ''}`}
                onClick={() => handleFileSelect(file.id)}
              >
                <div className="file-card__header">
                  <div className="file-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleFileSelect(file.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  
                  <div className="file-icon-container">
                    {getFileIcon(file.type)}
                  </div>
                  
                  <div className="file-actions">
                    <button 
                      className="btn-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFilePreview(file.id);
                      }}
                      aria-label="Preview"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="btn-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileDownload(file.id);
                      }}
                      aria-label="Download"
                    >
                      <Download size={16} />
                    </button>
                    <button 
                      className="btn-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileShare(file.id);
                      }}
                      aria-label="Share"
                    >
                      <Share2 size={16} />
                    </button>
                    <button 
                      className="btn-action-more"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="More options"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="file-card__content">
                  <h4 className="file-name" title={file.name}>{file.name}</h4>
                  <div className="file-meta">
                    <span className="file-size">{file.size}</span>
                    <span className="file-type">{file.type.toUpperCase()}</span>
                  </div>
                  <div className="file-info">
                    <span className="uploaded-by">Uploaded by {file.uploadedBy}</span>
                    <span className="uploaded-at">{formatDate(file.uploadedAt)}</span>
                  </div>
                  <div className="file-sharing-info">
                    <span className="shared-with">Shared with {file.sharedWith.length} groups</span>
                    <span className={`permissions ${file.permissions}`}>
                      {file.permissions === 'read-write' ? 'RW' : 'RO'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Upload File</h4>
              <button 
                className="modal-close"
                onClick={() => setShowUploadModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="upload-area">
                <Upload size={48} />
                <p>Drag and drop files here or click to browse</p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="file-input"
                />
              </div>
              
              <div className="upload-options">
                <h5>Sharing Options</h5>
                <div className="sharing-settings">
                  <label>
                    <input type="checkbox" defaultChecked />
                    Share with team members
                  </label>
                  <label>
                    <input type="checkbox" />
                    Notify collaborators
                  </label>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-cancel"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-upload-confirm"
                onClick={() => {
                  // Handle upload confirmation
                  setShowUploadModal(false);
                }}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileSharing;