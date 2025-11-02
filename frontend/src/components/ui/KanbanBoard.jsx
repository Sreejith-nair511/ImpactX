import React, { useState } from 'react';
import { Plus, MoreHorizontal, User, Calendar, Paperclip, MessageCircle } from 'lucide-react';
import './KanbanBoard.css';

/**
 * Kanban Board Component
 * Visual task management board with drag and drop functionality
 */
const KanbanBoard = ({ tasks = [], onTaskUpdate, onTaskCreate, className = '' }) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [showAddCard, setShowAddCard] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  
  // Group tasks by status
  const columns = [
    { id: 'todo', title: 'To Do', color: 'blue' },
    { id: 'in-progress', title: 'In Progress', color: 'yellow' },
    { id: 'review', title: 'Review', color: 'purple' },
    { id: 'completed', title: 'Completed', color: 'green' }
  ];
  
  const groupedTasks = columns.map(column => ({
    ...column,
    tasks: tasks.filter(task => task.status === column.id)
  }));
  
  // Handle drag start
  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };
  
  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  // Handle drop
  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    
    if (draggedTask && onTaskUpdate) {
      onTaskUpdate(draggedTask.id, { ...draggedTask, status: newStatus });
    }
    
    setDraggedTask(null);
  };
  
  // Handle add card
  const handleAddCard = (columnId) => {
    if (!newCardTitle.trim()) return;
    
    if (onTaskCreate) {
      onTaskCreate({
        title: newCardTitle,
        status: columnId,
        priority: 'medium',
        createdAt: new Date().toISOString()
      });
    }
    
    setNewCardTitle('');
    setShowAddCard(null);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
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
  
  return (
    <div className={`kanban-board ${className}`}>
      <div className="kanban-columns">
        {groupedTasks.map((column) => (
          <div 
            key={column.id}
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="kanban-column-header">
              <h3 className={`column-title ${column.color}`}>
                {column.title} <span className="task-count">({column.tasks.length})</span>
              </h3>
              <button 
                className="add-card-btn"
                onClick={() => setShowAddCard(column.id)}
                aria-label={`Add card to ${column.title}`}
              >
                <Plus size={16} />
              </button>
            </div>
            
            <div className="kanban-cards">
              {showAddCard === column.id && (
                <div className="add-card-form">
                  <input
                    type="text"
                    placeholder="Enter a title for this card..."
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddCard(column.id);
                      if (e.key === 'Escape') setShowAddCard(null);
                    }}
                    autoFocus
                  />
                  <div className="add-card-actions">
                    <button 
                      className="btn-primary"
                      onClick={() => handleAddCard(column.id)}
                    >
                      Add Card
                    </button>
                    <button 
                      className="btn-secondary"
                      onClick={() => setShowAddCard(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              
              {column.tasks.map((task) => {
                const priorityInfo = getPriorityInfo(task.priority);
                
                return (
                  <div
                    key={task.id}
                    className="kanban-card"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                  >
                    <div className="card-header">
                      <h4 className="card-title">{task.title}</h4>
                      <button className="card-menu" aria-label={`Menu for ${task.title}`}>
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    
                    {task.description && (
                      <p className="card-description">{task.description}</p>
                    )}
                    
                    <div className="card-meta">
                      {task.dueDate && (
                        <span className="card-due-date">
                          <Calendar size={14} />
                          {formatDate(task.dueDate)}
                        </span>
                      )}
                      
                      {task.assignee && (
                        <span className="card-assignee">
                          <User size={14} />
                          {task.assignee.name}
                        </span>
                      )}
                    </div>
                    
                    <div className="card-footer">
                      <div className="card-tags">
                        <span className={`priority-tag ${priorityInfo.className}`}>
                          {priorityInfo.label}
                        </span>
                      </div>
                      
                      <div className="card-actions">
                        {task.attachmentsCount > 0 && (
                          <span className="attachment-count">
                            <Paperclip size={14} />
                            {task.attachmentsCount}
                          </span>
                        )}
                        
                        {task.commentsCount > 0 && (
                          <span className="comment-count">
                            <MessageCircle size={14} />
                            {task.commentsCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;