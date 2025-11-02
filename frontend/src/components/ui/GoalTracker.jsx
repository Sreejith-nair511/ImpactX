import React, { useState } from 'react';
import { Target, CheckCircle, Clock, TrendingUp, Plus, Edit, Trash2 } from 'lucide-react';
import './GoalTracker.css';

/**
 * Goal Tracker Component
 * Allows users to set, track, and manage their goals
 */
const GoalTracker = ({ userId, goals = [], className = '' }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetValue: '',
    currentValue: 0,
    deadline: '',
    category: 'general'
  });
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Calculate progress percentage
  const calculateProgress = (current, target) => {
    if (target === 0) return 0;
    return Math.min(100, Math.max(0, (current / target) * 100));
  };
  
  // Get progress status
  const getProgressStatus = (progress, deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    
    if (progress >= 100) return 'completed';
    if (deadlineDate < today) return 'overdue';
    if (progress >= 75) return 'near-completion';
    if (progress >= 50) return 'in-progress';
    return 'not-started';
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal(prev => ({
      ...prev,
      [name]: name === 'targetValue' || name === 'currentValue' ? Number(value) : value
    }));
  };
  
  // Handle add goal
  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoal.title.trim()) return;
    
    // In a real app, this would call an API
    console.log('Adding goal:', newGoal);
    
    // Reset form
    setNewGoal({
      title: '',
      description: '',
      targetValue: '',
      currentValue: 0,
      deadline: '',
      category: 'general'
    });
    setShowAddForm(false);
  };
  
  // Handle edit goal
  const handleEditGoal = (goal) => {
    setEditingGoal(goal.id);
    setNewGoal({
      title: goal.title,
      description: goal.description || '',
      targetValue: goal.targetValue,
      currentValue: goal.currentValue || 0,
      deadline: goal.deadline || '',
      category: goal.category || 'general'
    });
  };
  
  // Handle update goal
  const handleUpdateGoal = (e) => {
    e.preventDefault();
    if (!newGoal.title.trim()) return;
    
    // In a real app, this would call an API
    console.log('Updating goal:', editingGoal, newGoal);
    
    // Reset form
    setEditingGoal(null);
    setNewGoal({
      title: '',
      description: '',
      targetValue: '',
      currentValue: 0,
      deadline: '',
      category: 'general'
    });
  };
  
  // Handle delete goal
  const handleDeleteGoal = (goalId) => {
    // In a real app, this would call an API
    console.log('Deleting goal:', goalId);
  };
  
  // Handle progress update
  const handleProgressUpdate = (goalId, newValue) => {
    // In a real app, this would call an API
    console.log('Updating progress:', goalId, newValue);
  };
  
  return (
    <div className={`goal-tracker ${className}`}>
      <div className="goal-tracker__header">
        <h3>
          <Target size={20} />
          Goal Tracker
        </h3>
        
        <button 
          className="btn-add-goal"
          onClick={() => {
            setShowAddForm(true);
            setEditingGoal(null);
            setNewGoal({
              title: '',
              description: '',
              targetValue: '',
              currentValue: 0,
              deadline: '',
              category: 'general'
            });
          }}
        >
          <Plus size={16} />
          Add Goal
        </button>
      </div>
      
      {showAddForm && (
        <div className="goal-form">
          <h4>{editingGoal ? 'Edit Goal' : 'Add New Goal'}</h4>
          
          <form onSubmit={editingGoal ? handleUpdateGoal : handleAddGoal}>
            <div className="form-group">
              <label htmlFor="title">Goal Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newGoal.title}
                onChange={handleInputChange}
                required
                placeholder="Enter goal title"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={newGoal.description}
                onChange={handleInputChange}
                placeholder="Enter goal description"
                rows={3}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="targetValue">Target Value</label>
                <input
                  type="number"
                  id="targetValue"
                  name="targetValue"
                  value={newGoal.targetValue}
                  onChange={handleInputChange}
                  required
                  min="1"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="currentValue">Current Value</label>
                <input
                  type="number"
                  id="currentValue"
                  name="currentValue"
                  value={newGoal.currentValue}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="deadline">Deadline</label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={newGoal.deadline}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={newGoal.category}
                  onChange={handleInputChange}
                >
                  <option value="general">General</option>
                  <option value="projects">Projects</option>
                  <option value="tasks">Tasks</option>
                  <option value="learning">Learning</option>
                  <option value="health">Health</option>
                  <option value="finance">Finance</option>
                </select>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                {editingGoal ? 'Update Goal' : 'Add Goal'}
              </button>
              <button 
                type="button" 
                className="btn-cancel"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingGoal(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {goals.length === 0 ? (
        <div className="goal-tracker__empty">
          <Target size={48} />
          <p>No goals set yet. Add your first goal to get started!</p>
        </div>
      ) : (
        <div className="goals-list">
          {goals.map((goal) => {
            const progress = calculateProgress(goal.currentValue || 0, goal.targetValue);
            const status = getProgressStatus(progress, goal.deadline);
            
            return (
              <div key={goal.id} className={`goal-card ${status}`}>
                <div className="goal-card__header">
                  <h4>{goal.title}</h4>
                  <div className="goal-card__actions">
                    <button 
                      className="btn-edit"
                      onClick={() => handleEditGoal(goal)}
                      aria-label={`Edit goal: ${goal.title}`}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteGoal(goal.id)}
                      aria-label={`Delete goal: ${goal.title}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                {goal.description && (
                  <p className="goal-card__description">{goal.description}</p>
                )}
                
                <div className="goal-card__progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="progress-info">
                    <span className="progress-text">
                      {goal.currentValue || 0} / {goal.targetValue}
                    </span>
                    <span className="progress-percent">{Math.round(progress)}%</span>
                  </div>
                </div>
                
                <div className="goal-card__footer">
                  <div className="goal-card__meta">
                    <span className={`status-indicator ${status}`}>
                      {status === 'completed' && <CheckCircle size={14} />}
                      {status === 'overdue' && <Clock size={14} />}
                      {status === 'near-completion' && <TrendingUp size={14} />}
                      {status === 'in-progress' && <TrendingUp size={14} />}
                      {status === 'not-started' && <Clock size={14} />}
                      {status.replace('-', ' ')}
                    </span>
                    
                    {goal.deadline && (
                      <span className="deadline">
                        Due: {formatDate(goal.deadline)}
                      </span>
                    )}
                  </div>
                  
                  <div className="goal-card__update">
                    <input
                      type="number"
                      min="0"
                      max={goal.targetValue}
                      value={goal.currentValue || 0}
                      onChange={(e) => handleProgressUpdate(goal.id, Number(e.target.value))}
                      className="progress-input"
                    />
                    <button 
                      className="btn-update"
                      onClick={() => handleProgressUpdate(goal.id, (goal.currentValue || 0) + 1)}
                    >
                      Update
                    </button>
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

export default GoalTracker;