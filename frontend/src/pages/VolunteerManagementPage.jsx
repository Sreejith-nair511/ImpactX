import React from 'react';
import VolunteerManagement from '../components/ui/VolunteerManagement';
import './VolunteerManagementPage.css';

/**
 * Volunteer Management Page
 * Dedicated page for viewing and managing project volunteers
 */
const VolunteerManagementPage = () => {
  // Mock project ID for demonstration
  const projectId = 'project-123';
  
  return (
    <div className="volunteer-management-page">
      <div className="page-header">
        <h1>Volunteer Management</h1>
        <p>Coordinate, track, and manage volunteers for your disaster relief project</p>
      </div>
      
      <div className="page-content">
        <div className="main-content">
          <VolunteerManagement projectId={projectId} />
        </div>
        
        <div className="sidebar">
          <div className="sidebar-section">
            <h3>Volunteer Statistics</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <h4>Total Volunteers</h4>
                <p className="stat-value">142</p>
              </div>
              <div className="stat-card">
                <h4>Active This Week</h4>
                <p className="stat-value">118</p>
              </div>
              <div className="stat-card">
                <h4>New This Month</h4>
                <p className="stat-value">24</p>
              </div>
              <div className="stat-card">
                <h4>Avg. Hours/Week</h4>
                <p className="stat-value">12.5</p>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">
                  <Users size={16} />
                </div>
                <div className="activity-content">
                  <p className="activity-text">Rajesh Kumar completed 8 hours of medical support</p>
                  <p className="activity-time">2 hours ago</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <Edit size={16} />
                </div>
                <div className="activity-content">
                  <p className="activity-text">Priya Sharma updated availability to part-time</p>
                  <p className="activity-time">5 hours ago</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <Award size={16} />
                </div>
                <div className="activity-content">
                  <p className="activity-text">Amit Patel received volunteer recognition badge</p>
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
                Add New Volunteer
              </button>
              <button className="action-button">
                <Mail size={16} />
                Send Group Message
              </button>
              <button className="action-button">
                <Download size={16} />
                Export Volunteer List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerManagementPage;