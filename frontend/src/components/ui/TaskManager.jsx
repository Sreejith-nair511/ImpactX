import React, { useState } from 'react';
import { Plus, Filter, Search, Calendar, User, Paperclip, MessageCircle } from 'lucide-react';
import useTasks from '../../hooks/useTasks';
import './TaskManager.css';

/**
 * Task Manager Component
 * Comprehensive task management interface
 */
const TaskManager = ({ userId, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  
  const {
    tasks,
    stats,
    loading,
    error,
    filter,
    fetchTasks,
    createTask,
    changeTaskStatus,
    setTaskFilter
  } = useTasks(userId);
  
  // Filter tasks based on search term and filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filter.status === 'all' || task.status === filter.status;
    const matchesPriority = filter.priority === 'all' || task.priority === filter.priority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });
  
  // Handle adding a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    try {
      await createTask({
        title: newTaskTitle,
        description: '',
        status: 'todo',
        priority: 'medium',
        assigneeId: userId
      });
      
      setNewTaskTitle('');
      setShowAddTask(false);
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };
  
  // Handle changing task status
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await changeTaskStatus(taskId, newStatus);
    } catch (err) {
      console.error('Error changing task status:', err);
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Get status display info
  const getStatusInfo = (status) => {
    switch (status) {
      case 'todo':
        return { label: 'To Do', className: 'status-todo' };
      case 'in-progress':
        return { label: 'In Progress', className: 'status-in-progress' };
      case 'review':
        return { label: 'Review', className: 'status-review' };
      case 'completed':
        return { label: 'Completed', className: 'status-completed' };
      default:
        return { label: status, className: 'status-default' };
    }
  };
  
  // Get priority display info
  const getPriorityInfo = (priority) => {
    switch (priority) {
      case 'low':
        return { label: 'Low', className: 'priority-low' };
      case 'medium':
        return { label: 'Medium', className: 'priority-medium' };
      case 'high':
        return { label: 'High', className: 'priority-high' };
      case 'urgent':
        return { label: 'Urgent', className: 'priority-urgent' };
      default:
        return { label: priority, className: 'priority-default' };
    }
  };
  
  if (!userId) {
    return <div className="task-manager__error">User ID is required</div>;
  }
  
  return (
    <div className={`task-manager ${className}`}>
      <div className="task-manager__header">
        <h2>Task Manager</h2>
        
        <div className="task-manager__controls">
          <div className="task-manager__search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search tasks"
            />
          </div>
          
          <button
            className="task-manager__filter-btn"
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Toggle filters"
          >
            <Filter size={16} />
            Filters
          </button>
          
          <button
            className="task-manager__add-btn"
            onClick={() => setShowAddTask(true)}
            aria-label="Add new task"
          >
            <Plus size={16} />
            Add Task
          </button>
        </div>
      </div>
      
      {showFilters && (
        <div className="task-manager__filters">
          <div className="filter-group">
            <label>Status:</label>
            <select
              value={filter.status}
              onChange={(e) => setTaskFilter({ status: e.target.value })}
              aria-label="Filter by status"
            >
              <option value="all">All</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Priority:</label>
            <select
              value={filter.priority}
              onChange={(e) => setTaskFilter({ priority: e.target.value })}
              aria-label="Filter by priority"
            >
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>
      )}
      
      {showAddTask && (
        <div className="task-manager__add-form">
          <form onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="Task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              autoFocus
              required
              aria-label="Enter task title"
            />
            <div className="task-manager__form-actions">
              <button type="submit">Add</button>
              <button type="button" onClick={() => setShowAddTask(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      
      <div className="task-manager__stats">
        <div className="stat-card">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.overdue}</span>
          <span className="stat-label">Overdue</span>
        </div>
      </div>
      
      {loading && (
        <div className="task-manager__loading">
          Loading tasks...
        </div>
      )}
      
      {error && (
        <div className="task-manager__error">
          Error loading tasks: {error}
        </div>
      )}
      
      {!loading && !error && (
        <div className="task-manager__list">
          {filteredTasks.length === 0 ? (
            <div className="task-manager__empty">
              {searchTerm ? 'No tasks match your search' : 'No tasks found'}
            </div>
          ) : (
            <ul className="task-list">
              {filteredTasks.map((task) => {
                const statusInfo = getStatusInfo(task.status);
                const priorityInfo = getPriorityInfo(task.priority);
                
                return (
                  <li key={task.id} className="task-item">
                    <div className="task-item__header">
                      <h3 className="task-item__title">{task.title}</h3>
                      
                      <div className="task-item__meta">
                        {task.dueDate && (
                          <span className="task-item__due-date">
                            <Calendar size={14} />
                            {formatDate(task.dueDate)}
                          </span>
                        )}
                        
                        {task.assignee && (
                          <span className="task-item__assignee">
                            <User size={14} />
                            {task.assignee.name}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {task.description && (
                      <p className="task-item__description">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="task-item__footer">
                      <div className="task-item__tags">
                        <span className={`task-status ${statusInfo.className}`}>
                          {statusInfo.label}
                        </span>
                        <span className={`task-priority ${priorityInfo.className}`}>
                          {priorityInfo.label}
                        </span>
                      </div>
                      
                      <div className="task-item__actions">
                        {task.attachmentsCount > 0 && (
                          <span className="task-item__attachment-count">
                            <Paperclip size={14} />
                            {task.attachmentsCount}
                          </span>
                        )}
                        
                        {task.commentsCount > 0 && (
                          <span className="task-item__comment-count">
                            <MessageCircle size={14} />
                            {task.commentsCount}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="task-item__status-controls">
                      <button
                        className={`status-btn ${task.status === 'todo' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(task.id, 'todo')}
                        aria-label="Mark as To Do"
                      >
                        To Do
                      </button>
                      <button
                        className={`status-btn ${task.status === 'in-progress' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(task.id, 'in-progress')}
                        aria-label="Mark as In Progress"
                      >
                        In Progress
                      </button>
                      <button
                        className={`status-btn ${task.status === 'completed' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(task.id, 'completed')}
                        aria-label="Mark as Completed"
                      >
                        Completed
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskManager;