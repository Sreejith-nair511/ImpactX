import React, { useState } from 'react';
import { Package, Plus, Edit, Trash2, TrendingUp, Calendar, Filter, Search } from 'lucide-react';
import './ResourceManagement.css';

/**
 * Resource Management Component
 * Displays and manages project resources
 */
const ResourceManagement = ({ projectId, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  
  // Mock data for demonstration
  const resources = [
    {
      id: '1',
      name: 'Water Purification Units',
      type: 'Equipment',
      quantity: 50,
      unit: 'units',
      allocated: 35,
      status: 'available',
      lastUpdated: '2024-03-15'
    },
    {
      id: '2',
      name: 'Medical Supplies',
      type: 'Supplies',
      quantity: 200,
      unit: 'kits',
      allocated: 150,
      status: 'low',
      lastUpdated: '2024-03-14'
    },
    {
      id: '3',
      name: 'Construction Materials',
      type: 'Materials',
      quantity: 1000,
      unit: 'units',
      allocated: 750,
      status: 'available',
      lastUpdated: '2024-03-10'
    },
    {
      id: '4',
      name: 'Emergency Food Rations',
      type: 'Supplies',
      quantity: 5000,
      unit: 'packets',
      allocated: 4200,
      status: 'critical',
      lastUpdated: '2024-03-12'
    }
  ];
  
  const utilizationData = {
    overall: 68,
    byType: [
      { type: 'Equipment', utilization: 70 },
      { type: 'Supplies', utilization: 82 },
      { type: 'Materials', utilization: 55 }
    ]
  };
  
  const handleCreateResource = () => {
    // Implementation for creating a new resource
    console.log('Create new resource');
  };
  
  const handleEditResource = (resourceId) => {
    // Implementation for editing a resource
    console.log('Edit resource', resourceId);
  };
  
  const handleDeleteResource = (resourceId) => {
    // Implementation for deleting a resource
    console.log('Delete resource', resourceId);
  };
  
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || resource.status === filter;
    return matchesSearch && matchesFilter;
  });
  
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'quantity') {
      return b.quantity - a.quantity;
    } else if (sortBy === 'allocated') {
      return b.allocated - a.allocated;
    } else {
      return a.lastUpdated.localeCompare(b.lastUpdated);
    }
  });
  
  return (
    <div className={`resource-management ${className}`}>
      <div className="resource-management__header">
        <h3>Resource Management</h3>
        <div className="resource-controls">
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search resources..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-container">
            <Filter size={16} />
            <select 
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="low">Low Stock</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div className="sort-container">
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="quantity">Sort by Quantity</option>
              <option value="allocated">Sort by Allocated</option>
              <option value="lastUpdated">Sort by Updated</option>
            </select>
          </div>
          <button className="create-button" onClick={handleCreateResource}>
            <Plus size={16} />
            Add Resource
          </button>
        </div>
      </div>
      
      <div className="resource-summary">
        <div className="summary-card">
          <div className="summary-icon">
            <Package size={24} />
          </div>
          <div className="summary-content">
            <h4>Total Resources</h4>
            <p className="summary-value">{resources.length}</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">
            <TrendingUp size={24} />
          </div>
          <div className="summary-content">
            <h4>Utilization</h4>
            <p className="summary-value">{utilizationData.overall}%</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">
            <Calendar size={24} />
          </div>
          <div className="summary-content">
            <h4>Resources Low</h4>
            <p className="summary-value">
              {resources.filter(r => r.status === 'low' || r.status === 'critical').length}
            </p>
          </div>
        </div>
      </div>
      
      <div className="resource-list">
        <table className="resources-table">
          <thead>
            <tr>
              <th>Resource</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Allocated</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedResources.map(resource => (
              <tr key={resource.id}>
                <td className="resource-name">{resource.name}</td>
                <td>{resource.type}</td>
                <td>{resource.quantity} {resource.unit}</td>
                <td>{resource.allocated} {resource.unit}</td>
                <td>
                  <span className={`status-badge ${resource.status}`}>
                    {resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
                  </span>
                </td>
                <td>{new Date(resource.lastUpdated).toLocaleDateString()}</td>
                <td className="actions">
                  <button 
                    className="action-button edit"
                    onClick={() => handleEditResource(resource.id)}
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="action-button delete"
                    onClick={() => handleDeleteResource(resource.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="utilization-chart">
        <h4>Resource Utilization by Type</h4>
        <div className="chart-container">
          {utilizationData.byType.map((item, index) => (
            <div key={index} className="chart-bar">
              <div className="chart-label">{item.type}</div>
              <div className="chart-bar-container">
                <div 
                  className="chart-bar-fill"
                  style={{ width: `${item.utilization}%` }}
                ></div>
              </div>
              <div className="chart-value">{item.utilization}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceManagement;