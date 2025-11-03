import React, { useState } from 'react';
import { Users, Plus, Search, Filter, Edit, Trash2, Check, X, Clock, Award, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import './VolunteerManagement.css';

/**
 * Volunteer Management Component
 * Allows users to manage project volunteers, roles, and assignments
 */
const VolunteerManagement = ({ projectId, className = '' }) => {
  const [activeTab, setActiveTab] = useState('volunteers');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  
  // Mock data for demonstration
  const volunteerData = {
    volunteers: [
      {
        id: 1,
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        phone: '+1 (555) 123-4567',
        role: 'Project Manager',
        status: 'active',
        hours: 120,
        skills: ['Project Management', 'Leadership', 'Communication'],
        certifications: ['PMP', 'First Aid'],
        availability: 'full-time',
        joinDate: '2024-01-15'
      },
      {
        id: 2,
        name: 'Taylor Kim',
        email: 'taylor.kim@example.com',
        phone: '+1 (555) 987-6543',
        role: 'Medical Coordinator',
        status: 'active',
        hours: 85,
        skills: ['Medical Care', 'Emergency Response', 'Training'],
        certifications: ['Medical License', 'CPR'],
        availability: 'part-time',
        joinDate: '2024-01-20'
      },
      {
        id: 3,
        name: 'Jordan Lee',
        email: 'jordan.lee@example.com',
        phone: '+1 (555) 456-7890',
        role: 'Logistics Specialist',
        status: 'active',
        hours: 95,
        skills: ['Supply Chain', 'Transportation', 'Inventory Management'],
        certifications: ['Logistics Certification'],
        availability: 'full-time',
        joinDate: '2024-02-01'
      },
      {
        id: 4,
        name: 'Casey Smith',
        email: 'casey.smith@example.com',
        phone: '+1 (555) 234-5678',
        role: 'Community Liaison',
        status: 'on-leave',
        hours: 60,
        skills: ['Community Outreach', 'Translation', 'Conflict Resolution'],
        certifications: ['Community Development'],
        availability: 'part-time',
        joinDate: '2024-02-15'
      }
    ],
    roles: [
      { id: 1, name: 'Project Manager', volunteers: 1, description: 'Oversees project execution and team coordination' },
      { id: 2, name: 'Medical Coordinator', volunteers: 1, description: 'Manages medical resources and healthcare delivery' },
      { id: 3, name: 'Logistics Specialist', volunteers: 1, description: 'Handles supply chain and transportation' },
      { id: 4, name: 'Community Liaison', volunteers: 1, description: 'Facilitates community engagement and communication' },
      { id: 5, name: 'Field Coordinator', volunteers: 0, description: 'Manages field operations and site supervision' }
    ],
    stats: {
      totalVolunteers: 32,
      activeVolunteers: 28,
      pendingApplications: 5,
      averageHours: 75
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
      case 'on-leave':
        return 'status-leave';
      case 'inactive':
        return 'status-inactive';
      default:
        return '';
    }
  };

  // Render volunteers tab
  const renderVolunteers = () => (
    <div className="volunteers-view">
      <div className="volunteers-header">
        <div className="view-controls">
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search volunteers..."
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
              <option value="all">All Volunteers</option>
              <option value="active">Active</option>
              <option value="on-leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="view-mode">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              <Users size={16} />
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              <Users size={16} />
            </button>
          </div>
        </div>
        
        <button 
          className="btn-add-volunteer"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={16} />
          Add Volunteer
        </button>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="volunteers-grid">
          {volunteerData.volunteers.map((volunteer) => (
            <div key={volunteer.id} className="volunteer-card">
              <div className="volunteer-header">
                <div className="volunteer-avatar">
                  {volunteer.name.charAt(0)}
                </div>
                <div className="volunteer-actions">
                  <button className="btn-edit">
                    <Edit size={16} />
                  </button>
                  <button className="btn-delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="volunteer-content">
                <h3>{volunteer.name}</h3>
                <div className="volunteer-role">
                  {volunteer.role}
                </div>
                
                <div className="volunteer-contact">
                  <div className="contact-item">
                    <Mail size={16} />
                    <span>{volunteer.email}</span>
                  </div>
                  <div className="contact-item">
                    <Phone size={16} />
                    <span>{volunteer.phone}</span>
                  </div>
                </div>
                
                <div className="volunteer-details">
                  <div className="detail-item">
                    <Clock size={16} />
                    <span>{volunteer.hours} hours</span>
                  </div>
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>Joined {formatDate(volunteer.joinDate)}</span>
                  </div>
                </div>
                
                <div className="volunteer-skills">
                  {volunteer.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                  {volunteer.skills.length > 3 && (
                    <span className="skill-tag more">
                      +{volunteer.skills.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="volunteer-status">
                  <span className={`status-badge ${getStatusClass(volunteer.status)}`}>
                    {volunteer.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="volunteers-list">
          <div className="list-header">
            <div className="list-col">Volunteer</div>
            <div className="list-col">Role</div>
            <div className="list-col">Contact</div>
            <div className="list-col">Hours</div>
            <div className="list-col">Joined</div>
            <div className="list-col">Status</div>
            <div className="list-col actions">Actions</div>
          </div>
          
          {volunteerData.volunteers.map((volunteer) => (
            <div key={volunteer.id} className="list-row">
              <div className="list-col">
                <div className="volunteer-info">
                  <div className="volunteer-avatar small">
                    {volunteer.name.charAt(0)}
                  </div>
                  <div>
                    <div className="volunteer-name">{volunteer.name}</div>
                    <div className="volunteer-email">{volunteer.email}</div>
                  </div>
                </div>
              </div>
              <div className="list-col">{volunteer.role}</div>
              <div className="list-col">{volunteer.phone}</div>
              <div className="list-col">{volunteer.hours}</div>
              <div className="list-col">{formatDate(volunteer.joinDate)}</div>
              <div className="list-col">
                <span className={`status-badge ${getStatusClass(volunteer.status)}`}>
                  {volunteer.status.replace('-', ' ')}
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

  // Render roles tab
  const renderRoles = () => (
    <div className="roles-view">
      <div className="roles-header">
        <div className="search-controls">
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <button 
          className="btn-add-role"
          onClick={() => setShowRoleModal(true)}
        >
          <Plus size={16} />
          Add Role
        </button>
      </div>
      
      <div className="roles-grid">
        {volunteerData.roles.map((role) => (
          <div key={role.id} className="role-card">
            <div className="role-header">
              <h3>{role.name}</h3>
              <div className="role-actions">
                <button className="btn-edit">
                  <Edit size={16} />
                </button>
                <button className="btn-delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="role-content">
              <p className="role-description">{role.description}</p>
              
              <div className="role-stats">
                <div className="stat-item">
                  <Users size={16} />
                  <span>{role.volunteers} volunteers</span>
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
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>{volunteerData.stats.totalVolunteers}</h3>
            <p>Total Volunteers</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Check size={24} />
          </div>
          <div className="stat-content">
            <h3>{volunteerData.stats.activeVolunteers}</h3>
            <p>Active Volunteers</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>{volunteerData.stats.averageHours}</h3>
            <p>Avg. Hours/Volunteer</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Award size={24} />
          </div>
          <div className="stat-content">
            <h3>{volunteerData.stats.pendingApplications}</h3>
            <p>Pending Applications</p>
          </div>
        </div>
      </div>
      
      <div className="chart-container">
        <div className="chart-header">
          <h3>Volunteer Hours Distribution</h3>
        </div>
        <div className="chart-placeholder">
          <Users size={48} />
          <p>Volunteer hours distribution chart will be displayed here</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`volunteer-management ${className}`}>
      <div className="management-header">
        <h2>Volunteer Management</h2>
        
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'volunteers' ? 'active' : ''}`}
            onClick={() => setActiveTab('volunteers')}
          >
            <Users size={16} />
            Volunteers
          </button>
          <button 
            className={`tab ${activeTab === 'roles' ? 'active' : ''}`}
            onClick={() => setActiveTab('roles')}
          >
            <Award size={16} />
            Roles
          </button>
          <button 
            className={`tab ${activeTab === 'statistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('statistics')}
          >
            <Users size={16} />
            Statistics
          </button>
        </div>
      </div>
      
      <div className="management-content">
        {activeTab === 'volunteers' && renderVolunteers()}
        {activeTab === 'roles' && renderRoles()}
        {activeTab === 'statistics' && renderStatistics()}
      </div>
      
      {/* Add Volunteer Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Volunteer</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <form className="volunteer-form">
                <div className="form-group">
                  <label htmlFor="volunteerName">Full Name</label>
                  <input
                    type="text"
                    id="volunteerName"
                    placeholder="Enter volunteer's full name"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="volunteerEmail">Email</label>
                    <input
                      type="email"
                      id="volunteerEmail"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="volunteerPhone">Phone</label>
                    <input
                      type="tel"
                      id="volunteerPhone"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="volunteerRole">Role</label>
                  <select id="volunteerRole">
                    <option value="">Select role</option>
                    {volunteerData.roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="volunteerAvailability">Availability</label>
                  <select id="volunteerAvailability">
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="occasional">Occasional</option>
                    <option value="on-call">On-call</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="volunteerSkills">Skills (comma separated)</label>
                  <input
                    type="text"
                    id="volunteerSkills"
                    placeholder="e.g., Medical Care, Translation, Logistics"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="volunteerNotes">Additional Notes</label>
                  <textarea
                    id="volunteerNotes"
                    placeholder="Any additional information about this volunteer"
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
                Add Volunteer
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Role Modal */}
      {showRoleModal && (
        <div className="modal-overlay" onClick={() => setShowRoleModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Role</h3>
              <button 
                className="modal-close"
                onClick={() => setShowRoleModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <form className="role-form">
                <div className="form-group">
                  <label htmlFor="roleName">Role Name</label>
                  <input
                    type="text"
                    id="roleName"
                    placeholder="Enter role name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="roleDescription">Description</label>
                  <textarea
                    id="roleDescription"
                    placeholder="Describe the responsibilities of this role"
                    rows="4"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="roleRequirements">Requirements</label>
                  <textarea
                    id="roleRequirements"
                    placeholder="List any specific requirements for this role"
                    rows="3"
                  />
                </div>
              </form>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-cancel"
                onClick={() => setShowRoleModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-save"
                onClick={() => setShowRoleModal(false)}
              >
                Add Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerManagement;