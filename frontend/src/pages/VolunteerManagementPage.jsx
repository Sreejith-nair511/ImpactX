import React from 'react';
import VolunteerManagement from '../components/ui/VolunteerManagement';
import './VolunteerManagementPage.css';

/**
 * Volunteer Management Page
 * Dedicated page for managing project volunteers, roles, and assignments
 */
const VolunteerManagementPage = () => {
  // Mock project ID for demonstration
  const projectId = 'project-123';
  
  return (
    <div className="volunteer-management-page">
      <div className="page-header">
        <h1>Volunteer Management</h1>
        <p>Coordinate and manage volunteers for your disaster relief project</p>
      </div>
      
      <div className="management-content">
        <div className="management-main">
          <VolunteerManagement projectId={projectId} />
        </div>
        
        <div className="management-sidebar">
          <div className="sidebar-section">
            <h3>Volunteer Spotlight</h3>
            <div className="volunteer-spotlight">
              <div className="spotlight-item">
                <div className="volunteer-avatar">A</div>
                <div className="volunteer-info">
                  <h4>Alex Johnson</h4>
                  <p>Project Manager</p>
                  <div className="volunteer-stats">
                    <span className="stat">120 hours</span>
                    <span className="stat">5 projects</span>
                  </div>
                </div>
              </div>
              
              <div className="spotlight-item">
                <div className="volunteer-avatar">T</div>
                <div className="volunteer-info">
                  <h4>Taylor Kim</h4>
                  <p>Medical Coordinator</p>
                  <div className="volunteer-stats">
                    <span className="stat">85 hours</span>
                    <span className="stat">3 certifications</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button className="action-btn">
                <span className="icon">👥</span>
                <span>Send Group Message</span>
              </button>
              <button className="action-btn">
                <span className="icon">📊</span>
                <span>View Volunteer Report</span>
              </button>
              <button className="action-btn">
                <span className="icon">🔔</span>
                <span>Send Reminders</span>
              </button>
              <button className="action-btn">
                <span className="icon">📤</span>
                <span>Export Volunteer List</span>
              </button>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Upcoming Shifts</h3>
            <div className="upcoming-shifts">
              <div className="shift-item">
                <div className="shift-date">
                  <div className="date-day">15</div>
                  <div className="date-month">Mar</div>
                </div>
                <div className="shift-details">
                  <h4>Medical Team</h4>
                  <p>Health Camp Setup</p>
                  <span className="shift-time">9:00 AM - 5:00 PM</span>
                </div>
              </div>
              
              <div className="shift-item">
                <div className="shift-date">
                  <div className="date-day">18</div>
                  <div className="date-month">Mar</div>
                </div>
                <div className="shift-details">
                  <h4>Logistics Team</h4>
                  <p>Supply Distribution</p>
                  <span className="shift-time">8:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerManagementPage;