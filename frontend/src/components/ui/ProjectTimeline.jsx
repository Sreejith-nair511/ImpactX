import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, AlertCircle, User, FileText } from 'lucide-react';
import './ProjectTimeline.css';

/**
 * Project Timeline Component
 * Visual timeline showing project milestones and progress
 */
const ProjectTimeline = ({ projectId, milestones = [], className = '' }) => {
  const [filter, setFilter] = useState('all');
  
  // Filter milestones based on status
  const filteredMilestones = milestones.filter(milestone => {
    if (filter === 'all') return true;
    if (filter === 'completed') return milestone.status === 'completed';
    if (filter === 'in-progress') return milestone.status === 'in-progress';
    if (filter === 'upcoming') return milestone.status === 'upcoming';
    return true;
  });
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Get status display info
  const getStatusInfo = (status) => {
    switch (status) {
      case 'completed':
        return { 
          label: 'Completed', 
          icon: CheckCircle, 
          className: 'status-completed' 
        };
      case 'in-progress':
        return { 
          label: 'In Progress', 
          icon: Clock, 
          className: 'status-in-progress' 
        };
      case 'upcoming':
        return { 
          label: 'Upcoming', 
          icon: Calendar, 
          className: 'status-upcoming' 
        };
      case 'delayed':
        return { 
          label: 'Delayed', 
          icon: AlertCircle, 
          className: 'status-delayed' 
        };
      default:
        return { 
          label: status, 
          icon: FileText, 
          className: 'status-default' 
        };
    }
  };
  
  // Calculate progress percentage
  const calculateProgress = () => {
    if (milestones.length === 0) return 0;
    const completed = milestones.filter(m => m.status === 'completed').length;
    return Math.round((completed / milestones.length) * 100);
  };
  
  const progress = calculateProgress();
  
  return (
    <div className={`project-timeline ${className}`}>
      <div className="timeline-header">
        <h3>Project Timeline</h3>
        
        <div className="timeline-controls">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
            <span className="progress-text">{progress}% Complete</span>
          </div>
          
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
            <button 
              className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
              onClick={() => setFilter('in-progress')}
            >
              In Progress
            </button>
            <button 
              className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming
            </button>
          </div>
        </div>
      </div>
      
      {filteredMilestones.length === 0 ? (
        <div className="timeline-empty">
          No milestones found
        </div>
      ) : (
        <div className="timeline">
          {filteredMilestones.map((milestone, index) => {
            const statusInfo = getStatusInfo(milestone.status);
            const IconComponent = statusInfo.icon;
            
            return (
              <div 
                key={milestone.id || index} 
                className={`timeline-item ${statusInfo.className}`}
              >
                <div className="timeline-marker">
                  <IconComponent size={20} />
                </div>
                
                <div className="timeline-content">
                  <div className="timeline-date">
                    <Calendar size={14} />
                    {formatDate(milestone.date)}
                  </div>
                  
                  <h4 className="timeline-title">{milestone.title}</h4>
                  
                  <p className="timeline-description">
                    {milestone.description}
                  </p>
                  
                  <div className="timeline-meta">
                    {milestone.assignee && (
                      <div className="timeline-assignee">
                        <User size={14} />
                        {milestone.assignee.name}
                      </div>
                    )}
                    
                    <div className={`timeline-status ${statusInfo.className}`}>
                      {statusInfo.label}
                    </div>
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

export default ProjectTimeline;