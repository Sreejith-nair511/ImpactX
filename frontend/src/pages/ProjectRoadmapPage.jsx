import React from 'react';
import ProjectRoadmap from '../components/ui/ProjectRoadmap';
import './ProjectRoadmapPage.css';

/**
 * Project Roadmap Page
 * Dedicated page for visualizing project timelines and milestones
 */
const ProjectRoadmapPage = () => {
  // Mock project phases data for demonstration
  const mockPhases = [
    {
      id: 1,
      title: 'Project Initiation',
      description: 'Define project scope, objectives, and stakeholders',
      status: 'completed',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      milestones: [
        {
          title: 'Project Charter Approved',
          description: 'Official approval of project charter document',
          date: '2024-01-15',
          status: 'completed'
        },
        {
          title: 'Stakeholder Meeting',
          description: 'Initial meeting with all project stakeholders',
          date: '2024-01-20',
          status: 'completed'
        }
      ],
      team: [
        { name: 'Alex Johnson', role: 'Project Manager' },
        { name: 'Sam Wilson', role: 'Business Analyst' }
      ]
    },
    {
      id: 2,
      title: 'Requirements Gathering',
      description: 'Collect and document detailed project requirements',
      status: 'completed',
      startDate: '2024-02-01',
      endDate: '2024-03-15',
      milestones: [
        {
          title: 'Requirements Workshop',
          description: 'Conduct workshop with key stakeholders',
          date: '2024-02-10',
          status: 'completed'
        },
        {
          title: 'Requirements Document',
          description: 'Finalize and approve requirements documentation',
          date: '2024-03-05',
          status: 'completed'
        }
      ],
      team: [
        { name: 'Alex Johnson', role: 'Project Manager' },
        { name: 'Sam Wilson', role: 'Business Analyst' },
        { name: 'Taylor Kim', role: 'UX Designer' }
      ]
    },
    {
      id: 3,
      title: 'Design Phase',
      description: 'Create system architecture and UI/UX designs',
      status: 'in-progress',
      startDate: '2024-03-16',
      endDate: '2024-05-31',
      milestones: [
        {
          title: 'System Architecture',
          description: 'Complete system architecture design',
          date: '2024-04-15',
          status: 'completed'
        },
        {
          title: 'UI/UX Designs',
          description: 'Finalize user interface and experience designs',
          date: '2024-05-20',
          status: 'in-progress'
        }
      ],
      team: [
        { name: 'Alex Johnson', role: 'Project Manager' },
        { name: 'Taylor Kim', role: 'UX Designer' },
        { name: 'Jordan Lee', role: 'System Architect' }
      ]
    },
    {
      id: 4,
      title: 'Development',
      description: 'Implement core features and functionality',
      status: 'upcoming',
      startDate: '2024-06-01',
      endDate: '2024-09-30',
      milestones: [
        {
          title: 'Backend Development',
          description: 'Complete backend API development',
          date: '2024-07-15',
          status: 'upcoming'
        },
        {
          title: 'Frontend Development',
          description: 'Complete frontend implementation',
          date: '2024-08-30',
          status: 'upcoming'
        }
      ],
      team: [
        { name: 'Alex Johnson', role: 'Project Manager' },
        { name: 'Jordan Lee', role: 'System Architect' },
        { name: 'Casey Smith', role: 'Frontend Developer' },
        { name: 'Riley Brown', role: 'Backend Developer' }
      ]
    },
    {
      id: 5,
      title: 'Testing & QA',
      description: 'Conduct thorough testing and quality assurance',
      status: 'upcoming',
      startDate: '2024-10-01',
      endDate: '2024-11-15',
      milestones: [
        {
          title: 'Unit Testing',
          description: 'Complete unit testing for all components',
          date: '2024-10-20',
          status: 'upcoming'
        },
        {
          title: 'User Acceptance Testing',
          description: 'Conduct UAT with stakeholders',
          date: '2024-11-10',
          status: 'upcoming'
        }
      ],
      team: [
        { name: 'Alex Johnson', role: 'Project Manager' },
        { name: 'Morgan Davis', role: 'QA Engineer' }
      ]
    }
  ];
  
  return (
    <div className="project-roadmap-page">
      <div className="page-header">
        <h1>Project Roadmap</h1>
        <p>Visual timeline of project phases, milestones, and deliverables</p>
      </div>
      
      <div className="roadmap-controls">
        <div className="project-info">
          <h2>Disaster Relief Platform</h2>
          <p className="project-description">
            A comprehensive platform for coordinating disaster relief efforts with real-time tracking and resource management.
          </p>
        </div>
        
        <div className="roadmap-actions">
          <button className="btn-primary">Export Roadmap</button>
          <button className="btn-secondary">Share</button>
        </div>
      </div>
      
      <ProjectRoadmap 
        projectId="project-123"
        phases={mockPhases}
      />
      
      <div className="roadmap-insights">
        <h3>Project Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <h4>Timeline Progress</h4>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '40%' }}></div>
            </div>
            <p>40% of project timeline completed</p>
          </div>
          
          <div className="insight-card">
            <h4>Milestone Completion</h4>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '60%' }}></div>
            </div>
            <p>60% of milestones achieved</p>
          </div>
          
          <div className="insight-card">
            <h4>Team Utilization</h4>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '75%' }}></div>
            </div>
            <p>75% team capacity utilized</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectRoadmapPage;