import React from 'react';
import ResourceManagement from '../components/ui/ResourceManagement';
import './ResourceManagementPage.css';

/**
 * Resource Management Page
 * Dedicated page for viewing and managing project resources
 */
const ResourceManagementPage = () => {
  // Mock project ID for demonstration
  const projectId = 'project-123';
  
  return (
    <div className="resource-management-page">
      <div className="page-header">
        <h1>Resource Management</h1>
        <p>Track, allocate, and manage resources for your disaster relief project</p>
      </div>
      
      <div className="page-content">
        <div className="main-content">
          <ResourceManagement projectId={projectId} />
        </div>
        
        <div className="sidebar">
          <div className="sidebar-section">
            <h3>Resource Allocation</h3>
            <div className="allocation-stats">
              <div className="stat-card">
                <h4>Total Resources</h4>
                <p className="stat-value">12</p>
              </div>
              <div className="stat-card">
                <h4>Allocated</h4>
                <p className="stat-value">8</p>
              </div>
              <div className="stat-card">
                <h4>Available</h4>
                <p className="stat-value">4</p>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">
                  <Package size={16} />
                </div>
                <div className="activity-content">
                  <p className="activity-text">Added 50 Water Purification Units</p>
                  <p className="activity-time">2 hours ago</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <Edit size={16} />
                </div>
                <div className="activity-content">
                  <p className="activity-text">Updated Medical Supplies allocation</p>
                  <p className="activity-time">5 hours ago</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <Trash2 size={16} />
                </div>
                <div className="activity-content">
                  <p className="activity-text">Removed expired food rations</p>
                  <p className="activity-time">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button className="action-button">
                <Plus size={16} />
                Request Resources
              </button>
              <button className="action-button">
                <TrendingUp size={16} />
                View Forecast
              </button>
              <button className="action-button">
                <Download size={16} />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceManagementPage;