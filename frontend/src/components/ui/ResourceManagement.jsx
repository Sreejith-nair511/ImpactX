import React, { useState } from 'react';
import { Package, Plus, Search, Filter, Edit, Trash2, Check, X, AlertCircle, TrendingUp, BarChart2, List, Grid } from 'lucide-react';
import './ResourceManagement.css';

/**
 * Resource Management Component
 * Allows users to manage project resources, allocations, and requests
 */
const ResourceManagement = ({ projectId, className = '' }) => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  
  // Mock data for demonstration
  const resourceData = {
    inventory: [
      {
        id: 1,
        name: 'Water Purification Units',
        category: 'Equipment',
        quantity: 50,
        available: 32,
        allocated: 18,
        unit: 'units',
        status: 'active'
      },
      {
        id: 2,
        name: 'Emergency Food Kits',
        category: 'Supplies',
        quantity: 1000,
        available: 750,
        allocated: 250,
        unit: 'kits',
        status: 'active'
      },
      {
        id: 3,
        name: 'Medical Supplies',
        category: 'Healthcare',
        quantity: 200,
        available: 50,
        allocated: 150,
        unit: 'boxes',
        status: 'low-stock'
      },
      {
        id: 4,
        name: 'Construction Materials',
        category: 'Materials',
        quantity: 5000,
        available: 4200,
        allocated: 800,
        unit: 'items',
        status: 'active'
      }
    ],
    categories: [
      { id: 1, name: 'Equipment', count: 12 },
      { id: 2, name: 'Supplies', count: 24 },
      { id: 3, name: 'Healthcare', count: 8 },
      { id: 4, name: 'Materials', count: 16 },
      { id: 5, name: 'Transportation', count: 6 }
    ],
    requests: [
      {
        id: 1,
        resourceName: 'Water Purification Units',
        requestedBy: 'Alex Johnson',
        quantity: 15,
        status: 'approved',
        date: '2024-03-15',
        priority: 'high'
      },
      {
        id: 2,
        resourceName: 'Emergency Food Kits',
        requestedBy: 'Taylor Kim',
        quantity: 200,
        status: 'pending',
        date: '2024-03-16',
        priority: 'medium'
      },
      {
        id: 3,
        resourceName: 'Medical Supplies',
        requestedBy: 'Jordan Lee',
        quantity: 75,
        status: 'rejected',
        date: '2024-03-14',
        priority: 'high'
      }
    ],
    stats: {
      totalResources: 156,
      totalCategories: 12,
      pendingRequests: 8,
      lowStockItems: 3
    }
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

  // Get status class
  const getStatusClass = (status) => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'low-stock':
        return 'status-low';
      case 'out-of-stock':
        return 'status-out';
      case 'approved':
        return 'status-approved';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  // Get priority class
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  // Render inventory tab
  const renderInventory = () => (
    <div className="inventory-view">
      <div className="inventory-header">
        <div className="view-controls">
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-container">
            <Filter size={16} />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Resources</option>
              <option value="active">Active</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
          
          <div className="view-mode">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </button>
          </div>
        </div>
        
        <button 
          className="btn-add-resource"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={16} />
          Add Resource
        </button>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="resources-grid">
          {resourceData.inventory.map((resource) => (
            <div key={resource.id} className="resource-card">
              <div className="resource-header">
                <div className="resource-icon">
                  <Package size={24} />
                </div>
                <div className="resource-actions">
                  <button className="btn-edit">
                    <Edit size={16} />
                  </button>
                  <button className="btn-delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="resource-content">
                <h3>{resource.name}</h3>
                <div className="resource-category">
                  {resource.category}
                </div>
                
                <div className="resource-quantity">
                  <div className="quantity-info">
                    <span className="label">Total:</span>
                    <span className="value">{resource.quantity} {resource.unit}</span>
                  </div>
                  <div className="quantity-info">
                    <span className="label">Available:</span>
                    <span className="value">{resource.available} {resource.unit}</span>
                  </div>
                  <div className="quantity-info">
                    <span className="label">Allocated:</span>
                    <span className="value">{resource.allocated} {resource.unit}</span>
                  </div>
                </div>
                
                <div className="resource-status">
                  <span className={`status-badge ${getStatusClass(resource.status)}`}>
                    {resource.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="resources-list">
          <div className="list-header">
            <div className="list-col">Resource</div>
            <div className="list-col">Category</div>
            <div className="list-col">Quantity</div>
            <div className="list-col">Available</div>
            <div className="list-col">Allocated</div>
            <div className="list-col">Status</div>
            <div className="list-col actions">Actions</div>
          </div>
          
          {resourceData.inventory.map((resource) => (
            <div key={resource.id} className="list-row">
              <div className="list-col">{resource.name}</div>
              <div className="list-col">{resource.category}</div>
              <div className="list-col">{resource.quantity} {resource.unit}</div>
              <div className="list-col">{resource.available} {resource.unit}</div>
              <div className="list-col">{resource.allocated} {resource.unit}</div>
              <div className="list-col">
                <span className={`status-badge ${getStatusClass(resource.status)}`}>
                  {resource.status.replace('-', ' ')}
                </span>
              </div>
              <div className="list-col actions">
                <button className="btn-edit">
                  <Edit size={16} />
                </button>
                <button className="btn-delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Render requests tab
  const renderRequests = () => (
    <div className="requests-view">
      <div className="requests-header">
        <div className="search-controls">
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-container">
            <Filter size={16} />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        
        <button 
          className="btn-request-resource"
          onClick={() => setShowRequestModal(true)}
        >
          <Plus size={16} />
          Request Resource
        </button>
      </div>
      
      <div className="requests-list">
        <div className="list-header">
          <div className="list-col">Resource</div>
          <div className="list-col">Requested By</div>
          <div className="list-col">Quantity</div>
          <div className="list-col">Date</div>
          <div className="list-col">Priority</div>
          <div className="list-col">Status</div>
          <div className="list-col actions">Actions</div>
        </div>
        
        {resourceData.requests.map((request) => (
          <div key={request.id} className="list-row">
            <div className="list-col">{request.resourceName}</div>
            <div className="list-col">{request.requestedBy}</div>
            <div className="list-col">{request.quantity}</div>
            <div className="list-col">{formatDate(request.date)}</div>
            <div className="list-col">
              <span className={`priority-badge ${getPriorityClass(request.priority)}`}>
                {request.priority}
              </span>
            </div>
            <div className="list-col">
              <span className={`status-badge ${getStatusClass(request.status)}`}>
                {request.status}
              </span>
            </div>
            <div className="list-col actions">
              {request.status === 'pending' && (
                <>
                  <button className="btn-approve">
                    <Check size={16} />
                  </button>
                  <button className="btn-reject">
                    <X size={16} />
                  </button>
                </>
              )}
              {request.status === 'approved' && (
                <button className="btn-view">
                  <Package size={16} />
                </button>
              )}
              {request.status === 'rejected' && (
                <button className="btn-view">
                  <AlertCircle size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render categories tab
  const renderCategories = () => (
    <div className="categories-view">
      <div className="categories-header">
        <div className="search-controls">
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <button className="btn-add-category">
          <Plus size={16} />
          Add Category
        </button>
      </div>
      
      <div className="categories-grid">
        {resourceData.categories.map((category) => (
          <div key={category.id} className="category-card">
            <div className="category-header">
              <h3>{category.name}</h3>
              <div className="category-actions">
                <button className="btn-edit">
                  <Edit size={16} />
                </button>
                <button className="btn-delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="category-content">
              <div className="category-stats">
                <div className="stat-item">
                  <Package size={20} />
                  <span>{category.count} resources</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render statistics tab
  const renderStatistics = () => (
    <div className="statistics-view">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Package size={24} />
          </div>
          <div className="stat-content">
            <h3>{resourceData.stats.totalResources}</h3>
            <p>Total Resources</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <BarChart2 size={24} />
          </div>
          <div className="stat-content">
            <h3>{resourceData.stats.totalCategories}</h3>
            <p>Categories</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <AlertCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>{resourceData.stats.pendingRequests}</h3>
            <p>Pending Requests</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{resourceData.stats.lowStockItems}</h3>
            <p>Low Stock Items</p>
          </div>
        </div>
      </div>
      
      <div className="chart-container">
        <div className="chart-header">
          <h3>Resource Utilization</h3>
        </div>
        <div className="chart-placeholder">
          <BarChart2 size={48} />
          <p>Resource utilization chart will be displayed here</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`resource-management ${className}`}>
      <div className="management-header">
        <h2>Resource Management</h2>
        
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <Package size={16} />
            Inventory
          </button>
          <button 
            className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            <AlertCircle size={16} />
            Requests
          </button>
          <button 
            className={`tab ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <BarChart2 size={16} />
            Categories
          </button>
          <button 
            className={`tab ${activeTab === 'statistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('statistics')}
          >
            <TrendingUp size={16} />
            Statistics
          </button>
        </div>
      </div>
      
      <div className="management-content">
        {activeTab === 'inventory' && renderInventory()}
        {activeTab === 'requests' && renderRequests()}
        {activeTab === 'categories' && renderCategories()}
        {activeTab === 'statistics' && renderStatistics()}
      </div>
      
      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Resource</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <form className="resource-form">
                <div className="form-group">
                  <label htmlFor="resourceName">Resource Name</label>
                  <input
                    type="text"
                    id="resourceName"
                    placeholder="Enter resource name"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="category">
                      <option value="">Select category</option>
                      {resourceData.categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="number"
                      id="quantity"
                      placeholder="Enter quantity"
                      min="1"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="unit">Unit of Measurement</label>
                  <input
                    type="text"
                    id="unit"
                    placeholder="e.g., units, kits, boxes"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    placeholder="Enter resource description"
                    rows="3"
                  />
                </div>
              </form>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-cancel"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-save"
                onClick={() => setShowAddModal(false)}
              >
                Save Resource
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Request Resource Modal */}
      {showRequestModal && (
        <div className="modal-overlay" onClick={() => setShowRequestModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Request Resource</h3>
              <button 
                className="modal-close"
                onClick={() => setShowRequestModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <form className="request-form">
                <div className="form-group">
                  <label htmlFor="requestResource">Resource</label>
                  <select id="requestResource">
                    <option value="">Select resource</option>
                    {resourceData.inventory.map((resource) => (
                      <option key={resource.id} value={resource.id}>
                        {resource.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="requestQuantity">Quantity</label>
                    <input
                      type="number"
                      id="requestQuantity"
                      placeholder="Enter quantity"
                      min="1"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select id="priority">
                      <option value="low">Low</option>
                      <option value="medium" selected>Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="requestReason">Reason for Request</label>
                  <textarea
                    id="requestReason"
                    placeholder="Explain why you need this resource"
                    rows="3"
                  />
                </div>
              </form>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-cancel"
                onClick={() => setShowRequestModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-submit"
                onClick={() => setShowRequestModal(false)}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceManagement;