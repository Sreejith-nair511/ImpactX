import React from 'react';
import CommunityEngagement from '../components/ui/CommunityEngagement';
import './CommunityEngagementPage.css';

/**
 * Community Engagement Page
 * Dedicated page for viewing and managing community engagement activities
 */
const CommunityEngagementPage = () => {
  // Mock project ID for demonstration
  const projectId = 'project-123';
  
  return (
    <div className="community-engagement-page">
      <div className="page-header">
        <h1>Community Engagement</h1>
        <p>Connect with and empower local communities through meaningful engagement</p>
      </div>
      
      <div className="engagement-content">
        <div className="engagement-main">
          <CommunityEngagement projectId={projectId} />
        </div>
        
        <div className="engagement-sidebar">
          <div className="sidebar-section">
            <h3>Community Leaders</h3>
            <div className="leaders-list">
              <div className="leader-item">
                <div className="leader-avatar">P</div>
                <div className="leader-info">
                  <h4>Priya Sharma</h4>
                  <p>Community Coordinator</p>
                </div>
              </div>
              <div className="leader-item">
                <div className="leader-avatar">R</div>
                <div className="leader-info">
                  <h4>Raj Kumar</h4>
                  <p>Village Head</p>
                </div>
              </div>
              <div className="leader-item">
                <div className="leader-avatar">A</div>
                <div className="leader-info">
                  <h4>Anita Desai</h4>
                  <p>Women's Group Leader</p>
                </div>
              </div>
              <div className="leader-item">
                <div className="leader-avatar">M</div>
                <div className="leader-info">
                  <h4>Meera Patel</h4>
                  <p>Youth Representative</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Engagement Metrics</h3>
            <div className="metrics-summary">
              <div className="metric-item">
                <span className="label">Community Participation</span>
                <span className="value">87%</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '87%' }}></div>
                </div>
              </div>
              <div className="metric-item">
                <span className="label">Feedback Response Rate</span>
                <span className="value">72%</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '72%' }}></div>
                </div>
              </div>
              <div className="metric-item">
                <span className="label">Event Attendance</span>
                <span className="value">91%</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '91%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button className="action-btn">
                <span className="icon">📢</span>
                <span>Announce Event</span>
              </button>
              <button className="action-btn">
                <span className="icon">📝</span>
                <span>Send Survey</span>
              </button>
              <button className="action-btn">
                <span className="icon">👥</span>
                <span>Add Community Leader</span>
              </button>
              <button className="action-btn">
                <span className="icon">📊</span>
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityEngagementPage;