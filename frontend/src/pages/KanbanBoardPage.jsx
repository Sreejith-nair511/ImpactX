import React, { useState } from 'react';
import KanbanBoard from '../components/ui/KanbanBoard';
import useTasks from '../hooks/useTasks';
import './KanbanBoardPage.css';

/**
 * Kanban Board Page
 * Dedicated page for visual task management with drag and drop functionality
 */
const KanbanBoardPage = () => {
  // In a real application, this would come from auth context
  const userId = 'user-123'; // Mock user ID
  
  const {
    tasks,
    createTask,
    updateTask
  } = useTasks(userId);
  
  // Mock tasks data for demonstration
  const mockTasks = [
    {
      id: 1,
      title: 'Design new dashboard layout',
      description: 'Create wireframes and mockups for the new dashboard',
      status: 'todo',
      priority: 'high',
      dueDate: '2024-12-15',
      assignee: { name: 'Alex Johnson' },
      attachmentsCount: 2,
      commentsCount: 5,
      createdAt: '2024-12-01'
    },
    {
      id: 2,
      title: 'Implement user authentication',
      description: 'Set up JWT-based authentication for the application',
      status: 'in-progress',
      priority: 'urgent',
      dueDate: '2024-12-10',
      assignee: { name: 'Sam Wilson' },
      attachmentsCount: 0,
      commentsCount: 3,
      createdAt: '2024-12-01'
    },
    {
      id: 3,
      title: 'Write API documentation',
      description: 'Document all REST endpoints with examples',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '2024-12-20',
      assignee: { name: 'Taylor Kim' },
      attachmentsCount: 1,
      commentsCount: 2,
      createdAt: '2024-12-02'
    },
    {
      id: 4,
      title: 'Fix responsive layout issues',
      description: 'Address mobile layout problems in the project view',
      status: 'review',
      priority: 'medium',
      dueDate: '2024-12-05',
      assignee: { name: 'Jordan Lee' },
      attachmentsCount: 0,
      commentsCount: 1,
      createdAt: '2024-12-03'
    },
    {
      id: 5,
      title: 'Update dependencies',
      description: 'Upgrade all npm packages to their latest versions',
      status: 'completed',
      priority: 'low',
      dueDate: '2024-11-30',
      assignee: { name: 'Casey Smith' },
      attachmentsCount: 0,
      commentsCount: 0,
      createdAt: '2024-11-28'
    }
  ];
  
  return (
    <div className="kanban-board-page">
      <div className="page-header">
        <h1>Kanban Board</h1>
        <p>Visual task management with drag and drop functionality</p>
      </div>
      
      <div className="kanban-controls">
        <div className="view-options">
          <button className="btn-view active">Board View</button>
          <button className="btn-view">List View</button>
          <button className="btn-view">Calendar View</button>
        </div>
        
        <div className="board-actions">
          <button className="btn-primary">Add Task</button>
          <button className="btn-secondary">Filter</button>
        </div>
      </div>
      
      <KanbanBoard 
        tasks={tasks.length > 0 ? tasks : mockTasks}
        onTaskUpdate={updateTask}
        onTaskCreate={createTask}
      />
      
      <div className="board-info">
        <div className="info-card">
          <h3>Board Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">5</span>
              <span className="stat-label">Total Tasks</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">2</span>
              <span className="stat-label">In Progress</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">1</span>
              <span className="stat-label">In Review</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">1</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>
        
        <div className="info-card">
          <h3>Quick Tips</h3>
          <ul className="tips-list">
            <li>Drag and drop cards to move them between columns</li>
            <li>Click the + button to add new cards to any column</li>
            <li>Use the filter button to narrow down tasks</li>
            <li>Press Escape to cancel adding a new card</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoardPage;