import React, { useState } from 'react';
import { Users, MessageCircle, Calendar, BookOpen, BarChart2, Plus, Filter, Search, Star, ThumbsUp, MapPin, Clock } from 'lucide-react';
import './CommunityEngagement.css';

/**
 * Community Engagement Component
 * Displays community engagement metrics and activities
 */
const CommunityEngagement = ({ projectId, className = '' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Mock data for demonstration
  const engagementData = {
    metrics: {
      totalParticipants: 1240,
      activeVolunteers: 86,
      communityEvents: 24,
      feedbackCount: 156
    },
    recentFeedback: [
      {
        id: 1,
        author: 'Priya Sharma',
        role: 'Community Leader',
        content: 'The water purification project has significantly improved our community health. Children are getting sick less often now.',
        rating: 5,
        date: '2024-03-15',
        likes: 24
      },
      {
        id: 2,
        author: 'Raj Kumar',
        role: 'Local Resident',
        content: 'The training sessions on disaster preparedness were very informative. We now feel more confident about handling emergencies.',
        rating: 4,
        date: '2024-03-12',
        likes: 18
      },
      {
        id: 3,
        author: 'Anita Desai',
        role: 'Community Volunteer',
        content: 'The solar panel installation has reduced our electricity costs by 60%. This project has truly transformed our lives.',
        rating: 5,
        date: '2024-03-10',
        likes: 32
      }
    ],
    upcomingEvents: [
      {
        id: 1,
        title: 'Community Health Checkup Camp',
        date: '2024-03-25',
        time: '09:00 AM',
        location: 'Community Center',
        attendees: 42,
        maxAttendees: 100
      },
      {
        id: 2,
        title: 'Disaster Preparedness Workshop',
        date: '2024-03-28',
        time: '02:00 PM',
        location: 'School Grounds',
        attendees: 28,
        maxAttendees: 50
      },
      {
        id: 3,
        title: 'Monthly Community Meeting',
        date: '2024-04-05',
        time: '06:00 PM',
        location: 'Town Hall',
        attendees: 65,
        maxAttendees: 150
      }
    ],
    communityStories: [
      {
        id: 1,
        title: 'How Clean Water Changed Our Village',
        author: 'Meera Patel',
        date: '2024-03-01',
        excerpt: 'Three years ago, our village faced a severe water crisis. Today, thanks to the water purification project, we have access to clean drinking water...',
        image: '/placeholder-story-1.jpg',
        likes: 127,
        comments: 24
      },
      {
        id: 2,
        title: 'Empowering Women Through Solar Energy',
        author: 'Sunita Reddy',
        date: '2024-02-15',
        excerpt: 'The solar panel installation project has not only reduced our electricity bills but also created new opportunities for women in our community...',
        image: '/placeholder-story-2.jpg',
        likes: 89,
        comments: 17
      }
    ]
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

  // Render overview tab
  const renderOverview = () => (
    <div className="engagement-overview">
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">
            <Users size={24} />
          </div>
          <div className="metric-content">
            <h3>{engagementData.metrics.totalParticipants.toLocaleString()}</h3>
            <p>Total Participants</p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">
            <Star size={24} />
          </div>
          <div className="metric-content">
            <h3>{engagementData.metrics.activeVolunteers}</h3>
            <p>Active Volunteers</p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">
            <Calendar size={24} />
          </div>
          <div className="metric-content">
            <h3>{engagementData.metrics.communityEvents}</h3>
            <p>Community Events</p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">
            <MessageCircle size={24} />
          </div>
          <div className="metric-content">
            <h3>{engagementData.metrics.feedbackCount}</h3>
            <p>Feedback Received</p>
          </div>
        </div>
      </div>
      
      <div className="recent-activities">
        <div className="activity-section">
          <div className="section-header">
            <h3>Recent Community Feedback</h3>
            <button className="btn-view-all">View All</button>
          </div>
          
          <div className="feedback-list">
            {engagementData.recentFeedback.map((feedback) => (
              <div key={feedback.id} className="feedback-item">
                <div className="feedback-header">
                  <div className="author-info">
                    <div className="author-avatar">
                      {feedback.author.charAt(0)}
                    </div>
                    <div className="author-details">
                      <h4>{feedback.author}</h4>
                      <p>{feedback.role}</p>
                    </div>
                  </div>
                  <div className="feedback-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < feedback.rating ? 'filled' : 'empty'} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="feedback-content">
                  <p>{feedback.content}</p>
                </div>
                
                <div className="feedback-meta">
                  <span className="feedback-date">{formatDate(feedback.date)}</span>
                  <div className="feedback-actions">
                    <button className="action-btn">
                      <ThumbsUp size={16} />
                      <span>{feedback.likes}</span>
                    </button>
                    <button className="action-btn">
                      <MessageCircle size={16} />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="activity-section">
          <div className="section-header">
            <h3>Upcoming Events</h3>
            <button className="btn-view-all">View All</button>
          </div>
          
          <div className="events-list">
            {engagementData.upcomingEvents.map((event) => (
              <div key={event.id} className="event-item">
                <div className="event-date">
                  <div className="date-day">{new Date(event.date).getDate()}</div>
                  <div className="date-month">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</div>
                </div>
                
                <div className="event-content">
                  <h4>{event.title}</h4>
                  <div className="event-details">
                    <div className="event-meta">
                      <Clock size={16} />
                      <span>{event.time}</span>
                    </div>
                    <div className="event-meta">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="event-attendance">
                    <div className="attendance-bar">
                      <div 
                        className="attendance-fill" 
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      ></div>
                    </div>
                    <span>{event.attendees}/{event.maxAttendees} registered</span>
                  </div>
                </div>
                
                <div className="event-actions">
                  <button className="btn-register">Register</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render feedback tab
  const renderFeedback = () => (
    <div className="engagement-feedback">
      <div className="feedback-header">
        <div className="search-controls">
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search feedback..."
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
              <option value="all">All Feedback</option>
              <option value="positive">Positive (4-5 stars)</option>
              <option value="neutral">Neutral (3 stars)</option>
              <option value="negative">Negative (1-2 stars)</option>
            </select>
          </div>
        </div>
        
        <button className="btn-add-feedback">
          <Plus size={16} />
          Add Feedback
        </button>
      </div>
      
      <div className="feedback-list">
        {engagementData.recentFeedback.map((feedback) => (
          <div key={feedback.id} className="feedback-item">
            <div className="feedback-header">
              <div className="author-info">
                <div className="author-avatar">
                  {feedback.author.charAt(0)}
                </div>
                <div className="author-details">
                  <h4>{feedback.author}</h4>
                  <p>{feedback.role}</p>
                </div>
              </div>
              <div className="feedback-rating">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < feedback.rating ? 'filled' : 'empty'} 
                  />
                ))}
              </div>
            </div>
            
            <div className="feedback-content">
              <p>{feedback.content}</p>
            </div>
            
            <div className="feedback-meta">
              <span className="feedback-date">{formatDate(feedback.date)}</span>
              <div className="feedback-actions">
                <button className="action-btn">
                  <ThumbsUp size={16} />
                  <span>{feedback.likes}</span>
                </button>
                <button className="action-btn">
                  <MessageCircle size={16} />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render events tab
  const renderEvents = () => (
    <div className="engagement-events">
      <div className="events-header">
        <div className="search-controls">
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search events..."
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
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past Events</option>
            </select>
          </div>
        </div>
        
        <button className="btn-add-event">
          <Plus size={16} />
          Create Event
        </button>
      </div>
      
      <div className="events-list">
        {engagementData.upcomingEvents.map((event) => (
          <div key={event.id} className="event-item">
            <div className="event-date">
              <div className="date-day">{new Date(event.date).getDate()}</div>
              <div className="date-month">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</div>
            </div>
            
            <div className="event-content">
              <h4>{event.title}</h4>
              <div className="event-details">
                <div className="event-meta">
                  <Clock size={16} />
                  <span>{event.time}</span>
                </div>
                <div className="event-meta">
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="event-attendance">
                <div className="attendance-bar">
                  <div 
                    className="attendance-fill" 
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  ></div>
                </div>
                <span>{event.attendees}/{event.maxAttendees} registered</span>
              </div>
            </div>
            
            <div className="event-actions">
              <button className="btn-register">Register</button>
              <button className="btn-edit">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render stories tab
  const renderStories = () => (
    <div className="engagement-stories">
      <div className="stories-header">
        <div className="search-controls">
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <button className="btn-add-story">
          <Plus size={16} />
          Share Story
        </button>
      </div>
      
      <div className="stories-grid">
        {engagementData.communityStories.map((story) => (
          <div key={story.id} className="story-card">
            <div className="story-image">
              <img src={story.image} alt={story.title} />
            </div>
            
            <div className="story-content">
              <h3>{story.title}</h3>
              <div className="story-meta">
                <span className="author">By {story.author}</span>
                <span className="date">{formatDate(story.date)}</span>
              </div>
              <p className="excerpt">{story.excerpt}</p>
              
              <div className="story-actions">
                <button className="action-btn">
                  <ThumbsUp size={16} />
                  <span>{story.likes}</span>
                </button>
                <button className="action-btn">
                  <MessageCircle size={16} />
                  <span>{story.comments}</span>
                </button>
                <button className="action-btn">
                  <Share size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`community-engagement ${className}`}>
      <div className="engagement-header">
        <h2>Community Engagement</h2>
        
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart2 size={16} />
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'feedback' ? 'active' : ''}`}
            onClick={() => setActiveTab('feedback')}
          >
            <MessageCircle size={16} />
            Feedback
          </button>
          <button 
            className={`tab ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <Calendar size={16} />
            Events
          </button>
          <button 
            className={`tab ${activeTab === 'stories' ? 'active' : ''}`}
            onClick={() => setActiveTab('stories')}
          >
            <BookOpen size={16} />
            Stories
          </button>
        </div>
      </div>
      
      <div className="engagement-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'feedback' && renderFeedback()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'stories' && renderStories()}
      </div>
    </div>
  );
};

export default CommunityEngagement;