import React, { useState } from 'react';
import { 
  Bell, 
  Users, 
  CheckCircle, 
  Calendar, 
  MessageSquare, 
  FileText, 
  TrendingUp, 
  Award,
  Settings
} from 'lucide-react';
import NotificationBell from './NotificationBell';
import TaskManager from './TaskManager';
import TeamManager from './TeamManager';
import useNotifications from '../../hooks/useNotifications';
import './CollaborationDashboard.css';

/**
 * Collaboration Dashboard Component
 * Central hub for all collaboration features
 */
const CollaborationDashboard = ({ userId, className = '' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const {
    unreadCount
  } = useNotifications(userId);
  
  // Mock data for dashboard stats
  const stats = {
    tasks: { total: 24, completed: 18, overdue: 2 },
    teams: { total: 3, active: 3 },
    notifications: { unread: unreadCount },
    projects: { total: 8, active: 5 }
  };
  
  // Mock recent activity data
  const recentActivity = [
    { id: 1, user: 'Alex Johnson', action: 'completed task', target: 'Update documentation', time: '2 hours ago' },
    { id: 2, user: 'Sam Wilson', action: 'joined team', target: 'Design Team', time: '4 hours ago' },
    { id: 3, user: 'Taylor Kim', action: 'commented on', target: 'Project proposal', time: '1 day ago' },
    { id: 4, user: 'Jordan Lee', action: 'uploaded file', target: 'Meeting notes', time: '1 day ago' }
  ];
  
  // Mock upcoming events
  const upcomingEvents = [
    { id: 1, title: 'Team Standup', date: 'Today, 10:00 AM', type: 'meeting' },
    { id: 2, title: 'Project Review', date: 'Tomorrow, 2:00 PM', type: 'review' },
    { id: 3, title: 'Sprint Planning', date: 'Fri, 11:00 AM', type: 'planning' }
  ];
  
  const renderOverview = () => (
    <div className="dashboard-overview">
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-card__icon">
            <CheckCircle size={24} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__value">{stats.tasks.completed}/{stats.tasks.total}</span>
            <span className="stat-card__label">Tasks Completed</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card__icon">
            <Users size={24} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__value">{stats.teams.active}</span>
            <span className="stat-card__label">Active Teams</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card__icon">
            <Bell size={24} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__value">{stats.notifications.unread}</span>
            <span className="stat-card__label">Unread Notifications</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card__icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__value">{stats.projects.active}</span>
            <span className="stat-card__label">Active Projects</span>
          </div>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Recent Activity</h3>
          </div>
          
          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-item__user">
                  <div className="user-avatar">
                    {activity.user.charAt(0)}
                  </div>
                </div>
                <div className="activity-item__content">
                  <p>
                    <strong>{activity.user}</strong> {activity.action} <em>{activity.target}</em>
                  </p>
                  <span className="activity-item__time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Upcoming Events</h3>
          </div>
          
          <div className="events-list">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-item">
                <div className="event-item__icon">
                  <Calendar size={16} />
                </div>
                <div className="event-item__content">
                  <h4>{event.title}</h4>
                  <p>{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderTasks = () => (
    <TaskManager userId={userId} />
  );
  
  const renderTeams = () => (
    <TeamManager userId={userId} />
  );
  
  const renderNotifications = () => (
    <div className="notifications-page">
      <h3>Notifications</h3>
      <div className="notifications-container">
        <NotificationBell userId={userId} />
        <p>Notifications will appear in the bell above. You can also configure your notification preferences in settings.</p>
      </div>
    </div>
  );
  
  return (
    <div className={`collaboration-dashboard ${className}`}>
      <div className="dashboard-header">
        <h1>Collaboration Hub</h1>
        
        <div className="dashboard-actions">
          <NotificationBell userId={userId} />
        </div>
      </div>
      
      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <TrendingUp size={16} />
          Overview
        </button>
        
        <button 
          className={`tab-button ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          <CheckCircle size={16} />
          Tasks
        </button>
        
        <button 
          className={`tab-button ${activeTab === 'teams' ? 'active' : ''}`}
          onClick={() => setActiveTab('teams')}
        >
          <Users size={16} />
          Teams
        </button>
        
        <button 
          className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <Bell size={16} />
          Notifications
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'tasks' && renderTasks()}
        {activeTab === 'teams' && renderTeams()}
        {activeTab === 'notifications' && renderNotifications()}
      </div>
    </div>
  );
};

export default CollaborationDashboard;