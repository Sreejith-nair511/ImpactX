import React, { useState } from 'react';
import MetricsDashboard from '../components/ui/MetricsDashboard';
import useMetrics from '../hooks/useMetrics';
import './MetricsDashboardPage.css';

/**
 * Metrics Dashboard Page
 * Comprehensive dashboard for viewing key performance indicators
 */
const MetricsDashboardPage = () => {
  // In a real application, this would come from auth context
  const userId = 'user-123'; // Mock user ID
  
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  
  const {
    metrics,
    loading,
    error,
    timeframe,
    setTimeframe
  } = useMetrics(userId, { timeframe: selectedTimeframe });
  
  // Mock metrics data for demonstration
  const mockMetrics = [
    {
      title: 'Total Users',
      value: 12480,
      trend: 12.5,
      icon: 'users',
      description: 'Active users in the last 30 days'
    },
    {
      title: 'Projects Completed',
      value: 142,
      trend: 8.2,
      icon: 'projects',
      description: 'Projects successfully completed'
    },
    {
      title: 'Tasks Finished',
      value: 2847,
      trend: 15.7,
      icon: 'tasks',
      description: 'Tasks completed by the team'
    },
    {
      title: 'Total Funding',
      value: 2456000,
      trend: 22.3,
      icon: 'currency',
      prefix: '₹',
      description: 'Total funding raised for projects'
    }
  ];
  
  // Handle timeframe change
  const handleTimeframeChange = (newTimeframe) => {
    setSelectedTimeframe(newTimeframe);
    setTimeframe(newTimeframe);
  };
  
  return (
    <div className="metrics-dashboard-page">
      <div className="page-header">
        <h1>Metrics Dashboard</h1>
        <p>Track key performance indicators and metrics</p>
      </div>
      
      <div className="dashboard-controls">
        <div className="timeframe-selector">
          <label htmlFor="timeframe">Timeframe:</label>
          <select 
            id="timeframe"
            value={selectedTimeframe} 
            onChange={(e) => handleTimeframeChange(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
        
        <div className="dashboard-actions">
          <button className="btn-export">Export Data</button>
          <button className="btn-refresh">Refresh</button>
        </div>
      </div>
      
      {loading && (
        <div className="dashboard-loading">
          <p>Loading metrics...</p>
        </div>
      )}
      
      {error && (
        <div className="dashboard-error">
          <p>Error loading metrics: {error}</p>
        </div>
      )}
      
      {!loading && !error && (
        <MetricsDashboard 
          metrics={metrics.length > 0 ? metrics : mockMetrics} 
        />
      )}
      
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2>Performance Insights</h2>
          <div className="insights-content">
            <p>Based on your metrics, you're performing well above average in user engagement and project completion rates.</p>
            <ul>
              <li>User retention has increased by 15% compared to last month</li>
              <li>Project completion rate is 22% higher than industry benchmark</li>
              <li>Task completion efficiency improved by 18%</li>
            </ul>
          </div>
        </div>
        
        <div className="dashboard-section">
          <h2>Recommendations</h2>
          <div className="recommendations-content">
            <div className="recommendation-item">
              <h3>Increase User Engagement</h3>
              <p>Consider implementing a notification system to remind users of pending tasks.</p>
            </div>
            <div className="recommendation-item">
              <h3>Optimize Project Workflow</h3>
              <p>Streamline the project approval process to reduce delays.</p>
            </div>
            <div className="recommendation-item">
              <h3>Enhance Team Collaboration</h3>
              <p>Introduce weekly team sync meetings to improve communication.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboardPage;