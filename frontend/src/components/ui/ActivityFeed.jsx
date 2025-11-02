import React, { useState, useEffect } from 'react';
import { User, Folder, CheckCircle, Users, FileText, Calendar, Heart, MessageCircle, TrendingUp } from 'lucide-react';
import useUserActivity from '../../hooks/useUserActivity';
import './ActivityFeed.css';

/**
 * Activity Feed Component
 * Displays recent user activities and platform events
 */
const ActivityFeed = ({ userId, limit = 20, className = '' }) => {
  const [timeFilter, setTimeFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  const {
    activities,
    loading,
    error,
    refreshActivities
  } = useUserActivity(userId, { limit });
  
  // Filter activities based on selected filters
  const filteredActivities = activities.filter(activity => {
    // Time filter
    if (timeFilter !== 'all') {
      const now = new Date();
      const activityDate = new Date(activity.timestamp);
      const diffInHours = Math.floor((now - activityDate) / (1000 * 60 * 60));
      
      if (timeFilter === 'today' && diffInHours > 24) return false;
      if (timeFilter === 'week' && diffInHours > 168) return false; // 24 * 7
      if (timeFilter === 'month' && diffInHours > 720) return false; // 24 * 30
    }
    
    // Type filter
    if (typeFilter !== 'all' && activity.type !== typeFilter) return false;
    
    return true;
  });
  
  // Get icon for activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'user': return User;
      case 'project': return Folder;
      case 'task': return CheckCircle;
      case 'team': return Users;
      case 'document': return FileText;
      case 'event': return Calendar;
      case 'like': return Heart;
      case 'comment': return MessageCircle;
      default: return TrendingUp;
    }
  };
  
  // Get label for activity type
  const getActivityLabel = (type) => {
    switch (type) {
      case 'user': return 'User Activity';
      case 'project': return 'Project Update';
      case 'task': return 'Task Activity';
      case 'team': return 'Team Activity';
      case 'document': return 'Document Update';
      case 'event': return 'Event';
      case 'like': return 'Like';
      case 'comment': return 'Comment';
      default: return 'Activity';
    }
  };
  
  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Refresh activities periodically
  useEffect(() => {
    const interval = setInterval(() => {
      refreshActivities();
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [refreshActivities]);
  
  if (!userId) {
    return <div className="activity-feed__error">User ID is required</div>;
  }
  
  return (
    <div className={`activity-feed ${className}`}>
      <div className="activity-feed__header">
        <h3>Activity Feed</h3>
        
        <div className="activity-feed__filters">
          <select 
            value={timeFilter} 
            onChange={(e) => setTimeFilter(e.target.value)}
            aria-label="Filter by time"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          
          <select 
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)}
            aria-label="Filter by type"
          >
            <option value="all">All Types</option>
            <option value="user">User</option>
            <option value="project">Project</option>
            <option value="task">Task</option>
            <option value="team">Team</option>
            <option value="document">Document</option>
            <option value="event">Event</option>
            <option value="like">Like</option>
            <option value="comment">Comment</option>
          </select>
        </div>
      </div>
      
      {loading && (
        <div className="activity-feed__loading">
          Loading activities...
        </div>
      )}
      
      {error && (
        <div className="activity-feed__error">
          Error loading activities: {error}
        </div>
      )}
      
      {!loading && !error && filteredActivities.length === 0 && (
        <div className="activity-feed__empty">
          No activities found
        </div>
      )}
      
      {!loading && !error && filteredActivities.length > 0 && (
        <div className="activity-feed__list">
          {filteredActivities.map((activity) => {
            const IconComponent = getActivityIcon(activity.type);
            const typeLabel = getActivityLabel(activity.type);
            
            return (
              <div key={activity.id} className="activity-item">
                <div className="activity-item__icon">
                  <IconComponent size={20} />
                </div>
                
                <div className="activity-item__content">
                  <div className="activity-item__header">
                    <h4>{activity.title}</h4>
                    <span className="activity-item__time">
                      {formatTimestamp(activity.timestamp)}
                    </span>
                  </div>
                  
                  <p className="activity-item__description">
                    {activity.description}
                  </p>
                  
                  <div className="activity-item__meta">
                    <span className="activity-item__type">
                      {typeLabel}
                    </span>
                    
                    {activity.user && (
                      <span className="activity-item__user">
                        <User size={14} />
                        {activity.user.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;