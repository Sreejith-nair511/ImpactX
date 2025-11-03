import React from 'react';
import ResourceManagement from '../components/ui/ResourceManagement';
import './ResourceManagementPage.css';

/**
 * Resource Management Page
 * Dedicated page for managing project resources, allocations, and requests
 */
const ResourceManagementPage = () => {
  // Mock project ID for demonstration
  const projectId = 'project-123';
  
  return (
    <div className="resource-management-page">
      <div className="page-header">
        <h1>Resource Management</h1>
        <p>Efficiently manage and allocate resources for your disaster relief project</p>
      </div>
      
      <div className="management-content">
        <div className="management-main">
          <ResourceManagement projectId={projectId} />
        </div>
        
        <div className="management-sidebar">
          <div className="sidebar-section">
            <h3>Resource Allocation</h3>
            <div className="allocation-summary">
              <div className="allocation-item">
                <div className="allocation-info">
                  <h4>Water Purification Units</h4>
                  <p>Allocated to: Village A, Village B</p>
                </div>
                <div className="allocation-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '65%' }}></div>
                  </div>
                  <span className="progress-text">65% utilized</span>
                </div>
              </div>
              
              <div className="allocation-item">
                <div className="allocation-info">
                  <h4>Emergency Food Kits</h4>
                  <p>Allocated to: Distribution Centers</p>
                </div>
                <div className="allocation-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '42%' }}></div>
                  </div>
                  <span className="progress-text">42% utilized</span>
                </div>
              </div>
              
              <div className="allocation-item">
                <div className="allocation-info">
                  <h4>Medical Supplies</h4>
                  <p>Allocated to: Health Camps</p>
                </div>
                <div className="allocation-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '88%' }}></div>
                  </div>
                  <span className="progress-text">88% utilized</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button className="action-btn">
                <span className="icon">📦</span>
                <span>Request New Resources</span>
              </button>
              <button className="action-btn">
                <span className="icon">📊</span>
                <span>View Allocation Report</span>
              </button>
              <button className="action-btn">
                <span className="icon">🔔</span>
                <span>Set Low Stock Alerts</span>
              </button>
              <button className="action-btn">
                <span className="icon">📤</span>
                <span>Export Inventory</span>
              </button>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Recent Activity</h3>
            <div className="recent-activity">
              <div className="activity-item">
                <div className="activity-icon">✅</div>
                <div className="activity-content">
                  <p><strong>Resource request approved</strong></p>
                  <p>200 Emergency Food Kits allocated to Distribution Center 3</p>
                  <span className="activity-time">2 hours ago</span>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon">⚠️</div>
                <div className="activity-content">
                  <p><strong>Low stock alert</strong></p>
                  <p>Medical Supplies running low (25 units remaining)</p>
                  <span className="activity-time">5 hours ago</span>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon">📦</div>
                <div className="activity-content">
                  <p><strong>New resource added</strong></p>
                  <p>50 Solar Lanterns added to inventory</p>
                  <span className="activity-time">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceManagementPage;