import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Calendar, MapPin, Award, Filter, Search, Phone, Mail } from 'lucide-react';
import './VolunteerManagement.css';

/**
 * Volunteer Management Component
 * Displays and manages project volunteers
 */
const VolunteerManagement = ({ projectId, className = '' }) => {
  const [activeTab, setActiveTab] = useState('volunteers');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  
  // Mock data for demonstration
  const volunteers = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 98765 43210',
      role: 'Medical Volunteer',
      skills: ['First Aid', 'Emergency Response'],
      availability: 'full-time',
      status: 'active',
      hoursContributed: 120,
      lastActive: '2024-03-15',
      location: 'Mumbai'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 98765 43211',
      role: 'Logistics Coordinator',
      skills: ['Supply Chain', 'Inventory Management'],
      availability: 'part-time',
      status: 'active',
      hoursContributed: 85,
      lastActive: '2024-03-14',
      location: 'Delhi'
    },
    {
      id: '3',
      name: 'Amit Patel',
      email: 'amit@example.com',
      phone: '+91 98765 43212',
      role: 'Construction Specialist',
      skills: ['Building', 'Engineering'],
      availability: 'full-time',
      status: 'on-leave',
      hoursContributed: 210,
      lastActive: '2024-03-10',
      location: 'Ahmedabad'
    },
    {
      id: '4',
      name: 'Sneha Reddy',
      email: 'sneha@example.com',
      phone: '+91 98765 43213',
      role: 'Community Liaison',
      skills: ['Communication', 'Translation'],
      availability: 'part-time',
      status: 'active',
      hoursContributed: 95,
      lastActive: '2024-03-12',
      location: 'Hyderabad'
    }
  ];
  
  const availabilityData = {
    total: 142,
    active: 118,
    onLeave: 12,
    unavailable: 12
  };
  
  const handleCreateVolunteer = () => {
    // Implementation for creating a new volunteer
    console.log('Create new volunteer');
  };
  
  const handleEditVolunteer = (volunteerId) => {
    // Implementation for editing a volunteer
    console.log('Edit volunteer', volunteerId);
  };
  
  const handleDeleteVolunteer = (volunteerId) => {
    // Implementation for deleting a volunteer
    console.log('Delete volunteer', volunteerId);
  };
  
  const handleContactVolunteer = (volunteerId, method) => {
    // Implementation for contacting a volunteer
    console.log('Contact volunteer', volunteerId, 'via', method);
  };
  
  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          volunteer.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          volunteer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filter === 'all' || volunteer.status === filter;
    return matchesSearch && matchesFilter;
  });
  
  const sortedVolunteers = [...filteredVolunteers].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'hours') {
      return b.hoursContributed - a.hoursContributed;
    } else if (sortBy === 'lastActive') {
      return new Date(b.lastActive) - new Date(a.lastActive);
    } else {
      return a.role.localeCompare(b.role);
    }
  });
  
  return (
    <div className={`volunteer-management ${className}`}>
      <div className="volunteer-management__header">
        <h3>Volunteer Management</h3>
        <div className="volunteer-controls">
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search volunteers..."
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
              <option value="active">Active</option>
              <option value="on-leave">On Leave</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          <div className="sort-container">
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="role">Sort by Role</option>
              <option value="hours">Sort by Hours</option>
              <option value="lastActive">Sort by Last Active</option>
            </select>
          </div>
          <button className="create-button" onClick={handleCreateVolunteer}>
            <Plus size={16} />
            Add Volunteer
          </button>
        </div>
      </div>
      
      <div className="volunteer-summary">
        <div className="summary-card">
          <div className="summary-icon">
            <Users size={24} />
          </div>
          <div className="summary-content">
            <h4>Total Volunteers</h4>
            <p className="summary-value">{availabilityData.total}</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">
            <Calendar size={24} />
          </div>
          <div className="summary-content">
            <h4>Active Volunteers</h4>
            <p className="summary-value">{availabilityData.active}</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">
            <Award size={24} />
          </div>
          <div className="summary-content">
            <h4>Top Contributor</h4>
            <p className="summary-value">Amit Patel (210 hrs)</p>
          </div>
        </div>
      </div>
      
      <div className="volunteer-list">
        <table className="volunteers-table">
          <thead>
            <tr>
              <th>Volunteer</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Skills</th>
              <th>Availability</th>
              <th>Status</th>
              <th>Hours</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedVolunteers.map(volunteer => (
              <tr key={volunteer.id}>
                <td className="volunteer-info">
                  <div className="volunteer-name">{volunteer.name}</div>
                  <div className="volunteer-location">
                    <MapPin size={14} />
                    {volunteer.location}
                  </div>
                </td>
                <td className="volunteer-contact">
                  <div className="contact-item">
                    <Mail size={14} />
                    <button 
                      className="contact-link"
                      onClick={() => handleContactVolunteer(volunteer.id, 'email')}
                    >
                      Email
                    </button>
                  </div>
                  <div className="contact-item">
                    <Phone size={14} />
                    <button 
                      className="contact-link"
                      onClick={() => handleContactVolunteer(volunteer.id, 'phone')}
                    >
                      Call
                    </button>
                  </div>
                </td>
                <td>{volunteer.role}</td>
                <td>
                  <div className="skills-list">
                    {volunteer.skills.map((skill, index) => (
                      <span key={index} className="skill-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <span className={`availability-badge ${volunteer.availability}`}>
                    {volunteer.availability === 'full-time' ? 'Full-time' : 'Part-time'}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${volunteer.status}`}>
                    {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
                  </span>
                </td>
                <td>{volunteer.hoursContributed} hrs</td>
                <td>{new Date(volunteer.lastActive).toLocaleDateString()}</td>
                <td className="actions">
                  <button 
                    className="action-button edit"
                    onClick={() => handleEditVolunteer(volunteer.id)}
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="action-button delete"
                    onClick={() => handleDeleteVolunteer(volunteer.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="availability-chart">
        <h4>Volunteer Availability</h4>
        <div className="chart-container">
          <div className="chart-bar">
            <div className="chart-label">Active</div>
            <div className="chart-bar-container">
              <div 
                className="chart-bar-fill active"
                style={{ width: `${(availabilityData.active / availabilityData.total) * 100}%` }}
              ></div>
            </div>
            <div className="chart-value">{availabilityData.active}</div>
          </div>
          <div className="chart-bar">
            <div className="chart-label">On Leave</div>
            <div className="chart-bar-container">
              <div 
                className="chart-bar-fill on-leave"
                style={{ width: `${(availabilityData.onLeave / availabilityData.total) * 100}%` }}
              ></div>
            </div>
            <div className="chart-value">{availabilityData.onLeave}</div>
          </div>
          <div className="chart-bar">
            <div className="chart-label">Unavailable</div>
            <div className="chart-bar-container">
              <div 
                className="chart-bar-fill unavailable"
                style={{ width: `${(availabilityData.unavailable / availabilityData.total) * 100}%` }}
              ></div>
            </div>
            <div className="chart-value">{availabilityData.unavailable}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerManagement;