import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, AlertCircle, User, ChevronLeft, ChevronRight } from 'lucide-react';
import './ProjectRoadmap.css';

/**
 * Project Roadmap Component
 * Visual timeline showing project milestones, phases, and progress
 */
const ProjectRoadmap = ({ projectId, phases = [], className = '' }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [filter, setFilter] = useState('all');
  
  // Filter milestones based on status
  const filteredPhases = phases.filter(phase => {
    if (filter === 'all') return true;
    if (filter === 'completed') return phase.status === 'completed';
    if (filter === 'in-progress') return phase.status === 'in-progress';
    if (filter === 'upcoming') return phase.status === 'upcoming';
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
          icon: Calendar, 
          className: 'status-default' 
        };
    }
  };
  
  // Navigate to previous phase
  const goToPreviousPhase = () => {
    setCurrentPhase(prev => Math.max(0, prev - 1));
  };
  
  // Navigate to next phase
  const goToNextPhase = () => {
    setCurrentPhase(prev => Math.min(filteredPhases.length - 1, prev + 1));
  };
  
  if (filteredPhases.length === 0) {
    return (
      <div className={`project-roadmap ${className}`}>
        <div className="roadmap-empty">
          No phases found for this project
        </div>
      </div>
    );
  }
  
  const currentPhaseData = filteredPhases[currentPhase];
  const statusInfo = getStatusInfo(currentPhaseData.status);
  const IconComponent = statusInfo.icon;
  
  return (
    <div className={`project-roadmap ${className}`}>
      <div className="roadmap-header">
        <h3>Project Roadmap</h3>
        
        <div className="roadmap-controls">
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
      
      <div className="roadmap-navigation">
        <button 
          className="nav-btn"
          onClick={goToPreviousPhase}
          disabled={currentPhase === 0}
          aria-label="Previous phase"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="phase-indicator">
          Phase {currentPhase + 1} of {filteredPhases.length}
        </div>
        
        <button 
          className="nav-btn"
          onClick={goToNextPhase}
          disabled={currentPhase === filteredPhases.length - 1}
          aria-label="Next phase"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="roadmap-phase">
        <div className={`phase-header ${statusInfo.className}`}>
          <div className="phase-icon">
            <IconComponent size={24} />
          </div>
          <div className="phase-info">
            <h4>{currentPhaseData.title}</h4>
            <p>{currentPhaseData.description}</p>
          </div>
          <div className="phase-status">
            <span className={`status-badge ${statusInfo.className}`}>
              {statusInfo.label}
            </span>
          </div>
        </div>
        
        <div className="phase-details">
          <div className="phase-dates">
            <div className="date-item">
              <Calendar size={16} />
              <div>
                <span className="date-label">Start Date</span>
                <span className="date-value">{formatDate(currentPhaseData.startDate)}</span>
              </div>
            </div>
            <div className="date-item">
              <Calendar size={16} />
              <div>
                <span className="date-label">End Date</span>
                <span className="date-value">{formatDate(currentPhaseData.endDate)}</span>
              </div>
            </div>
          </div>
          
          {currentPhaseData.milestones && currentPhaseData.milestones.length > 0 && (
            <div className="phase-milestones">
              <h5>Milestones</h5>
              <div className="milestones-list">
                {currentPhaseData.milestones.map((milestone, index) => {
                  const milestoneStatus = getStatusInfo(milestone.status);
                  const MilestoneIcon = milestoneStatus.icon;
                  
                  return (
                    <div key={index} className="milestone-item">
                      <div className="milestone-icon">
                        <MilestoneIcon size={16} />
                      </div>
                      <div className="milestone-content">
                        <h6>{milestone.title}</h6>
                        <p>{milestone.description}</p>
                        <div className="milestone-meta">
                          <span className="milestone-date">
                            {formatDate(milestone.date)}
                          </span>
                          <span className={`milestone-status ${milestoneStatus.className}`}>
                            {milestoneStatus.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {currentPhaseData.team && currentPhaseData.team.length > 0 && (
            <div className="phase-team">
              <h5>Team Members</h5>
              <div className="team-list">
                {currentPhaseData.team.map((member, index) => (
                  <div key={index} className="team-member">
                    <div className="member-avatar">
                      {member.name.charAt(0)}
                    </div>
                    <div className="member-info">
                      <span className="member-name">{member.name}</span>
                      <span className="member-role">{member.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="roadmap-overview">
        <h5>Project Overview</h5>
        <div className="overview-stats">
          <div className="stat-item">
            <span className="stat-value">{phases.length}</span>
            <span className="stat-label">Total Phases</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              {phases.filter(p => p.status === 'completed').length}
            </span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              {phases.filter(p => p.status === 'in-progress').length}
            </span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectRoadmap;