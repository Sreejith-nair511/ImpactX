import React from 'react';
import GoalTracker from '../components/ui/GoalTracker';
import useGoals from '../hooks/useGoals';
import './GoalTracking.css';

/**
 * Goal Tracking Page
 * Comprehensive page for setting, tracking, and managing goals
 */
const GoalTrackingPage = () => {
  // In a real application, this would come from auth context
  const userId = 'user-123'; // Mock user ID
  
  const {
    goals,
    stats,
    loading,
    error
  } = useGoals(userId);
  
  // Mock goals data for demonstration
  const mockGoals = [
    {
      id: 1,
      title: 'Complete 50 Tasks',
      description: 'Finish 50 tasks in the project management system',
      targetValue: 50,
      currentValue: 32,
      deadline: '2024-12-31',
      category: 'tasks'
    },
    {
      id: 2,
      title: 'Learn React Hooks',
      description: 'Master advanced React hooks concepts',
      targetValue: 100,
      currentValue: 75,
      deadline: '2024-11-30',
      category: 'learning'
    },
    {
      id: 3,
      title: 'Raise $10,000 for Charity',
      description: 'Fundraising goal for local community project',
      targetValue: 10000,
      currentValue: 7500,
      deadline: '2024-10-15',
      category: 'finance'
    },
    {
      id: 4,
      title: 'Run 100 Miles',
      description: 'Complete 100 miles of running this month',
      targetValue: 100,
      currentValue: 100,
      deadline: '2024-09-30',
      category: 'health',
      completed: true
    }
  ];
  
  return (
    <div className="goal-tracking-page">
      <div className="page-header">
        <h1>Goal Tracking</h1>
        <p>Set, track, and achieve your personal and professional goals</p>
      </div>
      
      <div className="goal-stats">
        <div className="stat-card">
          <span className="stat-value">{stats.total || 4}</span>
          <span className="stat-label">Total Goals</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.completed || 1}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.inProgress || 2}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.overdue || 1}</span>
          <span className="stat-label">Overdue</span>
        </div>
      </div>
      
      {loading && (
        <div className="goal-tracking-loading">
          <p>Loading goals...</p>
        </div>
      )}
      
      {error && (
        <div className="goal-tracking-error">
          <p>Error loading goals: {error}</p>
        </div>
      )}
      
      <GoalTracker 
        userId={userId} 
        goals={goals.length > 0 ? goals : mockGoals} 
      />
      
      <div className="goal-insights">
        <h2>Goal Insights</h2>
        <div className="insights-content">
          <div className="insight-card">
            <h3>Completion Rate</h3>
            <p className="insight-value">75%</p>
            <p>You're on track to complete all goals by the end of the year.</p>
          </div>
          <div className="insight-card">
            <h3>Most Active Category</h3>
            <p className="insight-value">Tasks</p>
            <p>You've made the most progress in task completion goals.</p>
          </div>
          <div className="insight-card">
            <h3>Upcoming Deadlines</h3>
            <p className="insight-value">2 goals</p>
            <p>Due within the next 30 days. Stay focused!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalTrackingPage;