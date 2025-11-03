import React from 'react';
import ProjectAnalytics from '../components/ui/ProjectAnalytics';
import './ProjectInsightsPage.css';

/**
 * Project Insights Page
 * Dedicated page for viewing comprehensive project analytics and insights
 */
const ProjectInsightsPage = () => {
  // Mock project ID for demonstration
  const projectId = 'project-123';
  
  return (
    <div className="project-insights-page">
      <div className="page-header">
        <h1>Project Insights</h1>
        <p>Comprehensive analytics and insights for your disaster relief project</p>
      </div>
      
      <div className="insights-content">
        <div className="insights-main">
          <ProjectAnalytics projectId={projectId} />
        </div>
        
        <div className="insights-sidebar">
          <div className="sidebar-section">
            <h3>Project Summary</h3>
            <div className="project-summary">
              <div className="summary-item">
                <span className="label">Project Name</span>
                <span className="value">Disaster Relief Initiative</span>
              </div>
              <div className="summary-item">
                <span className="label">Location</span>
                <span className="value">Kerala, India</span>
              </div>
              <div className="summary-item">
                <span className="label">Start Date</span>
                <span className="value">Jan 1, 2024</span>
              </div>
              <div className="summary-item">
                <span className="label">End Date</span>
                <span className="value">Dec 31, 2024</span>
              </div>
              <div className="summary-item">
                <span className="label">Project Manager</span>
                <span className="value">Alex Johnson</span>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button className="action-btn">
                <span className="icon">📊</span>
                <span>Export Report</span>
              </button>
              <button className="action-btn">
                <span className="icon">📅</span>
                <span>Schedule Meeting</span>
              </button>
              <button className="action-btn">
                <span className="icon">🔔</span>
                <span>Set Alerts</span>
              </button>
              <button className="action-btn">
                <span className="icon">📤</span>
                <span>Share Insights</span>
              </button>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Recent Updates</h3>
            <div className="recent-updates">
              <div className="update-item">
                <div className="update-icon">✅</div>
                <div className="update-content">
                  <p>Resource allocation milestone completed</p>
                  <span className="update-time">2 hours ago</span>
                </div>
              </div>
              <div className="update-item">
                <div className="update-icon">💰</div>
                <div className="update-content">
                  <p>New donation of $15,000 received</p>
                  <span className="update-time">1 day ago</span>
                </div>
              </div>
              <div className="update-item">
                <div className="update-icon">👥</div>
                <div className="update-content">
                  <p>50 new volunteers registered</p>
                  <span className="update-time">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInsightsPage;