import React from 'react';
import FileSharing from '../components/ui/FileSharing';
import './FileSharingPage.css';

/**
 * File Sharing Page
 * Dedicated page for file sharing and collaboration
 */
const FileSharingPage = () => {
  // Mock user ID for demonstration
  const userId = 'user-123';
  
  return (
    <div className="file-sharing-page">
      <div className="page-header">
        <h1>File Sharing</h1>
        <p>Upload, share, and collaborate on files with your team</p>
      </div>
      
      <div className="page-content">
        <div className="file-sharing-container">
          <FileSharing userId={userId} />
        </div>
        
        <div className="file-sharing-sidebar">
          <div className="sidebar-section">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">
                  <span className="icon-upload">↑</span>
                </div>
                <div className="activity-content">
                  <p><strong>Alex Johnson</strong> uploaded Project_Plan.pdf</p>
                  <span className="activity-time">2 hours ago</span>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon">
                  <span className="icon-share">⇄</span>
                </div>
                <div className="activity-content">
                  <p><strong>Taylor Kim</strong> shared Design_Specs.fig with Design Team</p>
                  <span className="activity-time">5 hours ago</span>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon">
                  <span className="icon-download">↓</span>
                </div>
                <div className="activity-content">
                  <p><strong>Jordan Lee</strong> downloaded Meeting_Notes.docx</p>
                  <span className="activity-time">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Storage Usage</h3>
            <div className="storage-info">
              <div className="storage-bar">
                <div className="storage-fill" style={{ width: '65%' }}></div>
              </div>
              <div className="storage-stats">
                <span className="used-space">13.2 GB used</span>
                <span className="total-space">20 GB total</span>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button className="quick-action-btn">
                <span className="action-icon">📁</span>
                <span>Create Folder</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon">🔗</span>
                <span>Shared Links</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon">🔒</span>
                <span>Security Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileSharingPage;