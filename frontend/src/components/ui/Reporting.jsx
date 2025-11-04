import React, { useState } from 'react';
import { BarChart, PieChart, Download, Filter, Calendar, FileText, TrendingUp, Users, MapPin, Award } from 'lucide-react';
import './Reporting.css';

/**
 * Reporting Component
 * Displays project reports and analytics
 */
const Reporting = ({ projectId, className = '' }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('30d');
  const [exportFormat, setExportFormat] = useState('pdf');
  
  // Mock data for demonstration
  const dashboardData = {
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
    }
  };
  
  const impactMetrics = [
    {
      id: '1',
      title: 'People Reached',
      value: '2,450',
      change: '+12%',
      icon: Users
    },
    {
      id: '2',
      title: 'Homes Rebuilt',
      value: '127',
      change: '+8%',
      icon: MapPin
    },
    {
      id: '3',
      title: 'Volunteer Hours',
      value: '1,240',
      change: '+15%',
      icon: Award
    },
    {
      id: '4',
      title: 'Community Programs',
      value: '24',
      change: '+5%',
      icon: TrendingUp
    }
  ];
  
  const handleExport = () => {
    // Implementation for exporting report
    console.log('Export report in', exportFormat, 'format');
  };
  
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // Implementation for fetching data for new time range
    console.log('Change time range to', range);
  };
  
  return (
    <div className={`reporting ${className}`}>
      <div className="reporting__header">
        <h3>Project Reporting</h3>
        <div className="reporting-controls">
          <div className="time-range-selector">
            <button 
              className={timeRange === '7d' ? 'active' : ''}
              onClick={() => handleTimeRangeChange('7d')}
            >
              7D
            </button>
            <button 
              className={timeRange === '30d' ? 'active' : ''}
              onClick={() => handleTimeRangeChange('30d')}
            >
              30D
            </button>
            <button 
              className={timeRange === '90d' ? 'active' : ''}
              onClick={() => handleTimeRangeChange('90d')}
            >
              90D
            </button>
            <button 
              className={timeRange === '1y' ? 'active' : ''}
              onClick={() => handleTimeRangeChange('1y')}
            >
              1Y
            </button>
          </div>
          <div className="export-controls">
            <select 
              className="format-select"
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
            >
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
              <option value="xlsx">Excel</option>
              <option value="json">JSON</option>
            </select>
            <button className="export-button" onClick={handleExport}>
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <BarChart size={16} />
          Dashboard
        </button>
        <button 
          className={`tab ${activeTab === 'impact' ? 'active' : ''}`}
          onClick={() => setActiveTab('impact')}
        >
          <TrendingUp size={16} />
          Impact Metrics
        </button>
        <button 
          className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <FileText size={16} />
          Reports
        </button>
      </div>
      
      <div className="reporting-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-view">
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-header">
                  <h4>Funding Progress</h4>
                  <TrendingUp size={20} className="trend-icon up" />
                </div>
                <div className="metric-value">₹{dashboardData.funding.total.toLocaleString()}</div>
                <div className="metric-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${dashboardData.funding.percentage}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    {dashboardData.funding.percentage}% of ₹{dashboardData.funding.goal.toLocaleString()} goal
                  </div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-header">
                  <h4>Impact Achieved</h4>
                  <TrendingUp size={20} className="trend-icon up" />
                </div>
                <div className="metric-value">{dashboardData.impact.beneficiaries.toLocaleString()}</div>
                <div className="metric-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${dashboardData.impact.percentage}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    {dashboardData.impact.completed} of {dashboardData.impact.goals} goals completed
                  </div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-header">
                  <h4>Community Engagement</h4>
                  <TrendingUp size={20} className="trend-icon up" />
                </div>
                <div className="metric-value">{dashboardData.engagement.donors + dashboardData.engagement.volunteers}</div>
                <div className="metric-details">
                  <div className="detail-item">
                    <Users size={16} />
                    <span>{dashboardData.engagement.donors} Donors</span>
                  </div>
                  <div className="detail-item">
                    <Award size={16} />
                    <span>{dashboardData.engagement.volunteers} Volunteers</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="charts-grid">
              <div className="chart-card">
                <h4>Funding Over Time</h4>
                <div className="chart-placeholder">
                  <BarChart size={48} />
                  <p>Funding trend chart</p>
                </div>
              </div>
              <div className="chart-card">
                <h4>Impact Distribution</h4>
                <div className="chart-placeholder">
                  <PieChart size={48} />
                  <p>Impact metrics pie chart</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'impact' && (
          <div className="impact-view">
            <div className="impact-grid">
              {impactMetrics.map(metric => {
                const IconComponent = metric.icon;
                return (
                  <div key={metric.id} className="impact-card">
                    <div className="impact-icon">
                      <IconComponent size={24} />
                    </div>
                    <div className="impact-content">
                      <h4>{metric.title}</h4>
                      <div className="impact-value">{metric.value}</div>
                      <div className="impact-change positive">{metric.change}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="detailed-metrics">
              <h4>Detailed Impact Analysis</h4>
              <div className="metrics-table">
                <table>
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Current Value</th>
                      <th>Target</th>
                      <th>Progress</th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>People Reached</td>
                      <td>2,450</td>
                      <td>3,000</td>
                      <td>81.7%</td>
                      <td className="trend positive">↑ 12%</td>
                    </tr>
                    <tr>
                      <td>Homes Rebuilt</td>
                      <td>127</td>
                      <td>150</td>
                      <td>84.7%</td>
                      <td className="trend positive">↑ 8%</td>
                    </tr>
                    <tr>
                      <td>Water Wells Installed</td>
                      <td>8</td>
                      <td>10</td>
                      <td>80.0%</td>
                      <td className="trend positive">↑ 5%</td>
                    </tr>
                    <tr>
                      <td>Schools Rehabilitated</td>
                      <td>3</td>
                      <td>5</td>
                      <td>60.0%</td>
                      <td className="trend positive">↑ 3%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reports' && (
          <div className="reports-view">
            <div className="reports-list">
              <div className="report-item">
                <div className="report-info">
                  <FileText size={24} />
                  <div>
                    <h4>Monthly Impact Report - March 2024</h4>
                    <p>Generated on March 31, 2024</p>
                  </div>
                </div>
                <div className="report-actions">
                  <button className="action-button">
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
              <div className="report-item">
                <div className="report-info">
                  <FileText size={24} />
                  <div>
                    <h4>Quarterly Financial Report - Q1 2024</h4>
                    <p>Generated on April 5, 2024</p>
                  </div>
                </div>
                <div className="report-actions">
                  <button className="action-button">
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
              <div className="report-item">
                <div className="report-info">
                  <FileText size={24} />
                  <div>
                    <h4>Annual Impact Assessment - 2023</h4>
                    <p>Generated on January 15, 2024</p>
                  </div>
                </div>
                <div className="report-actions">
                  <button className="action-button">
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            </div>
            
            <div className="generate-report">
              <h4>Generate Custom Report</h4>
              <div className="report-form">
                <div className="form-group">
                  <label>Report Title</label>
                  <input type="text" placeholder="Enter report title" />
                </div>
                <div className="form-group">
                  <label>Date Range</label>
                  <div className="date-range">
                    <input type="date" />
                    <span>to</span>
                    <input type="date" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Metrics to Include</label>
                  <div className="checkbox-group">
                    <label>
                      <input type="checkbox" defaultChecked />
                      Funding Progress
                    </label>
                    <label>
                      <input type="checkbox" defaultChecked />
                      Impact Metrics
                    </label>
                    <label>
                      <input type="checkbox" />
                      Community Engagement
                    </label>
                    <label>
                      <input type="checkbox" defaultChecked />
                      Volunteer Statistics
                    </label>
                  </div>
                </div>
                <button className="generate-button">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reporting;