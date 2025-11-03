import React, { useState, useEffect } from 'react';
import { BarChart, LineChart, PieChart, TrendingUp, Users, Target, DollarSign, Calendar, Filter, Download, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import './ProjectAnalytics.css';

/**
 * Project Analytics Component
 * Displays comprehensive project metrics and analytics
 */
const ProjectAnalytics = ({ projectId, className = '' }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [metrics, setMetrics] = useState({
    funding: {
      total: 125000,
      goal: 150000,
      percentage: 83.3,
      trend: 'up'
    },
    impact: {
      beneficiaries: 2450,
      goals: 12,
      completed: 8,
      percentage: 66.7
    },
    engagement: {
      donors: 142,
      volunteers: 28,
      shares: 56,
      comments: 89
    },
    timeline: {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      currentDate: '2024-03-15'
    }
  });

  const [chartData, setChartData] = useState({
    fundingTrend: [
      { month: 'Jan', amount: 25000 },
      { month: 'Feb', amount: 45000 },
      { month: 'Mar', amount: 55000 },
      { month: 'Apr', amount: 65000 },
      { month: 'May', amount: 75000 }
    ],
    impactDistribution: [
      { category: 'Education', value: 35 },
      { category: 'Healthcare', value: 25 },
      { category: 'Infrastructure', value: 20 },
      { category: 'Food Security', value: 20 }
    ]
  });

  const [milestones, setMilestones] = useState([
    {
      id: 1,
      title: 'Project Launch',
      description: 'Initial project setup and team formation',
      status: 'completed',
      progress: 100,
      dueDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Community Outreach',
      description: 'Engage with local communities and stakeholders',
      status: 'completed',
      progress: 100,
      dueDate: '2024-02-01'
    },
    {
      id: 3,
      title: 'Resource Allocation',
      description: 'Distribute initial resources to target areas',
      status: 'in-progress',
      progress: 75,
      dueDate: '2024-03-30'
    },
    {
      id: 4,
      title: 'Mid-term Evaluation',
      description: 'Assess project progress and impact metrics',
      status: 'upcoming',
      progress: 0,
      dueDate: '2024-06-15'
    },
    {
      id: 5,
      title: 'Final Implementation',
      description: 'Complete all project deliverables',
      status: 'upcoming',
      progress: 0,
      dueDate: '2024-11-30'
    }
  ]);

  const [risks, setRisks] = useState([
    {
      id: 1,
      category: 'Financial',
      level: 'low',
      score: 2.5,
      description: 'Funding shortfall risk'
    },
    {
      id: 2,
      category: 'Operational',
      level: 'medium',
      score: 5.2,
      description: 'Logistics challenges'
    },
    {
      id: 3,
      category: 'Environmental',
      level: 'low',
      score: 1.8,
      description: 'Weather-related delays'
    },
    {
      id: 4,
      category: 'Social',
      level: 'high',
      score: 7.8,
      description: 'Community resistance'
    }
  ]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Handle time range change
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // In a real app, this would fetch new data based on the time range
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'in-progress':
        return <Clock size={20} className="text-blue-500" />;
      case 'upcoming':
        return <Clock size={20} className="text-gray-400" />;
      default:
        return <Clock size={20} className="text-gray-400" />;
    }
  };

  // Get risk class
  const getRiskClass = (level) => {
    switch (level) {
      case 'low':
        return 'low';
      case 'medium':
        return 'medium';
      case 'high':
        return 'high';
      default:
        return '';
    }
  };

  // Get risk icon
  const getRiskIcon = (level) => {
    switch (level) {
      case 'low':
        return <CheckCircle size={20} className="risk-low" />;
      case 'medium':
        return <AlertTriangle size={20} className="risk-medium" />;
      case 'high':
        return <AlertTriangle size={20} className="risk-high" />;
      default:
        return <AlertTriangle size={20} className="risk-high" />;
    }
  };

  return (
    <div className={`project-analytics ${className}`}>
      <div className="project-analytics__header">
        <h3>Project Analytics</h3>
        
        <div className="time-range-selector">
          <button 
            className={timeRange === '7d' ? 'active' : ''}
            onClick={() => handleTimeRangeChange('7d')}
          >
            7 Days
          </button>
          <button 
            className={timeRange === '30d' ? 'active' : ''}
            onClick={() => handleTimeRangeChange('30d')}
          >
            30 Days
          </button>
          <button 
            className={timeRange === '90d' ? 'active' : ''}
            onClick={() => handleTimeRangeChange('90d')}
          >
            90 Days
          </button>
          <button 
            className={timeRange === '1y' ? 'active' : ''}
            onClick={() => handleTimeRangeChange('1y')}
          >
            1 Year
          </button>
        </div>
      </div>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon">
              <DollarSign size={20} />
            </div>
            <h4 className="metric-title">Funding Progress</h4>
          </div>
          <div className="metric-value">{formatCurrency(metrics.funding.total)}</div>
          <div className="metric-subtitle">of {formatCurrency(metrics.funding.goal)} goal</div>
          <div className={`metric-trend ${metrics.funding.trend === 'up' ? 'trend-up' : 'trend-down'}`}>
            <TrendingUp size={16} />
            <span>{metrics.funding.percentage}% funded</span>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon">
              <Users size={20} />
            </div>
            <h4 className="metric-title">Beneficiaries</h4>
          </div>
          <div className="metric-value">{metrics.impact.beneficiaries.toLocaleString()}</div>
          <div className="metric-subtitle">People impacted</div>
          <div className="metric-trend trend-up">
            <TrendingUp size={16} />
            <span>+12% from last month</span>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon">
              <Target size={20} />
            </div>
            <h4 className="metric-title">Goal Completion</h4>
          </div>
          <div className="metric-value">{metrics.impact.completed}/{metrics.impact.goals}</div>
          <div className="metric-subtitle">Goals achieved</div>
          <div className="metric-trend trend-up">
            <TrendingUp size={16} />
            <span>{metrics.impact.percentage}% complete</span>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon">
              <Calendar size={20} />
            </div>
            <h4 className="metric-title">Project Timeline</h4>
          </div>
          <div className="metric-value">76</div>
          <div className="metric-subtitle">Days remaining</div>
          <div className="metric-trend trend-down">
            <TrendingUp size={16} />
            <span>On track</span>
          </div>
        </div>
      </div>
      
      <div className="charts-grid">
        <div className="chart-container">
          <div className="chart-header">
            <h4>Funding Trend</h4>
            <div className="chart-actions">
              <button>
                <Filter size={16} />
              </button>
              <button>
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="chart-wrapper">
            <div className="chart-placeholder">
              <LineChart size={48} />
              <p>Funding trend visualization</p>
              <p className="text-sm text-gray-500">Data will be displayed here</p>
            </div>
          </div>
        </div>
        
        <div className="chart-container">
          <div className="chart-header">
            <h4>Impact Distribution</h4>
            <div className="chart-actions">
              <button>
                <Filter size={16} />
              </button>
              <button>
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="chart-wrapper">
            <div className="chart-placeholder">
              <PieChart size={48} />
              <p>Impact distribution by category</p>
              <p className="text-sm text-gray-500">Data will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="progress-section">
        <div className="progress-header">
          <h4>Project Milestones</h4>
        </div>
        
        <div className="milestones-list">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="milestone-item">
              <div className="milestone-icon">
                {getStatusIcon(milestone.status)}
              </div>
              <div className="milestone-content">
                <h5>{milestone.title}</h5>
                <p>{milestone.description}</p>
              </div>
              <div className="milestone-progress">
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${milestone.progress}%` }}
                  ></div>
                </div>
                <div className="progress-text">{milestone.progress}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="risk-section">
        <div className="risk-header">
          <h4>Risk Assessment</h4>
        </div>
        
        <div className="risk-grid">
          {risks.map((risk) => (
            <div key={risk.id} className={`risk-card ${getRiskClass(risk.level)}`}>
              <div className="risk-icon">
                {getRiskIcon(risk.level)}
              </div>
              <h5 className="risk-title">{risk.category}</h5>
              <div className={`risk-value risk-${risk.level}`}>
                {risk.score}
              </div>
              <p className="risk-description">{risk.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalytics;