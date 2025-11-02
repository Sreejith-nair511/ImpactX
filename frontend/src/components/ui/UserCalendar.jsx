import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useEvents from '../../hooks/useEvents';

const UserCalendar = ({ userId, showCreateButton = true, className = '' }) => {
  const {
    events,
    upcomingEvents,
    pastEvents,
    eventTypes,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    addParticipant,
    removeParticipant,
    getInvitations,
    acceptInvitation,
    declineInvitation
  } = useEvents(userId);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    type: 'meeting',
    location: '',
    isAllDay: false
  });
  const [invitations, setInvitations] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Fetch invitations on mount
  useEffect(() => {
    const fetchInvitations = async () => {
      if (userId) {
        try {
          const data = await getInvitations();
          setInvitations(data);
        } catch (err) {
          console.error('Error fetching invitations:', err);
        }
      }
    };
    
    fetchInvitations();
  }, [userId, getInvitations]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setNewEvent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newEvent.title.trim() || !newEvent.startDate) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      const eventData = {
        ...newEvent,
        startDate: new Date(newEvent.startDate).toISOString(),
        endDate: newEvent.endDate ? new Date(newEvent.endDate).toISOString() : null
      };
      
      await createEvent(eventData);
      setNewEvent({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        type: 'meeting',
        location: '',
        isAllDay: false
      });
      setShowEventForm(false);
    } catch (err) {
      console.error('Error creating event:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle invitation response
  const handleInvitationResponse = async (invitationId, response) => {
    try {
      if (response === 'accept') {
        await acceptInvitation(invitationId);
      } else {
        await declineInvitation(invitationId);
      }
      
      // Remove invitation from list
      setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
    } catch (err) {
      console.error('Error responding to invitation:', err);
    }
  };

  // Navigate to previous month/week/day
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    
    setCurrentDate(newDate);
  };

  // Navigate to next month/week/day
  const navigateNext = () => {
    const newDate = new Date(currentDate);
    
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    
    setCurrentDate(newDate);
  };

  // Navigate to today
  const navigateToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Get event type color
  const getEventTypeColor = (type) => {
    const colors = {
      meeting: 'bg-blue-500',
      deadline: 'bg-red-500',
      milestone: 'bg-green-500',
      workshop: 'bg-purple-500',
      conference: 'bg-indigo-500',
      other: 'bg-gray-500'
    };
    
    return colors[type] || colors.other;
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-96 ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-xl p-6 text-center ${className}`}>
        <div className="text-red-600 dark:text-red-400 font-medium mb-2">
          Error loading calendar
        </div>
        <div className="text-red-500 dark:text-red-300 text-sm mb-4">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Generate calendar days
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  
  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    days.push(date);
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center">
            <button
              onClick={navigatePrevious}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mx-4">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            
            <button
              onClick={navigateNext}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <button
              onClick={navigateToday}
              className="ml-4 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Today
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setView('month')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  view === 'month' 
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  view === 'week' 
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView('day')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  view === 'day' 
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Day
              </button>
            </div>
            
            {showCreateButton && (
              <button
                onClick={() => setShowEventForm(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Event
              </button>
            )}
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            if (!date) {
              return (
                <div key={index} className="h-24 bg-gray-50 dark:bg-gray-900/50 rounded-lg"></div>
              );
            }
            
            const dayEvents = getEventsForDate(date);
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected = date.toDateString() === selectedDate.toDateString();
            
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedDate(date)}
                className={`h-24 bg-white dark:bg-gray-800 rounded-lg border p-2 cursor-pointer transition-colors ${
                  isToday 
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                    : isSelected 
                      ? 'border-indigo-300 dark:border-indigo-700' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className={`text-sm font-medium ${
                  isToday 
                    ? 'text-indigo-700 dark:text-indigo-300' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {date.getDate()}
                </div>
                
                <div className="mt-1 space-y-1 max-h-16 overflow-y-auto">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowEventDetails(event);
                      }}
                      className={`text-xs px-2 py-1 rounded truncate ${getEventTypeColor(event.type)} text-white`}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 px-2">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Upcoming Events */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Upcoming Events
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {upcomingEvents.length} events
          </span>
        </div>
        
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              No upcoming events
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.slice(0, 5).map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ x: 5 }}
                onClick={() => setShowEventDetails(event)}
                className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)} mr-3`}></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white truncate">
                    {event.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {new Date(event.startDate).toLocaleDateString()} • {event.location || 'No location'}
                  </p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg mx-4"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Create New Event
                </h3>
                <button
                  onClick={() => setShowEventForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      Event Title
                    </label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter event title"
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      Event Type
                    </label>
                    <select
                      value={newEvent.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="meeting">Meeting</option>
                      <option value="deadline">Deadline</option>
                      <option value="milestone">Milestone</option>
                      <option value="workshop">Workshop</option>
                      <option value="conference">Conference</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      Start Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={newEvent.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      End Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={newEvent.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Enter event location"
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      value={newEvent.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Enter event description"
                      rows={3}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isAllDay"
                      checked={newEvent.isAllDay}
                      onChange={(e) => handleInputChange('isAllDay', e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isAllDay" className="ml-2 block text-sm text-gray-900 dark:text-white">
                      All day event
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEventForm(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Creating...' : 'Create Event'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Event Details Modal */}
      {showEventDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg mx-4"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {showEventDetails.title}
                </h3>
                <button
                  onClick={() => setShowEventDetails(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-gray-900 dark:text-white">
                      {formatDate(new Date(showEventDetails.startDate))}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(showEventDetails.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                      {showEventDetails.endDate && ` ${new Date(showEventDetails.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                    </p>
                  </div>
                </div>
                
                {showEventDetails.location && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-900 dark:text-white">
                      {showEventDetails.location}
                    </p>
                  </div>
                )}
                
                {showEventDetails.description && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Description
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {showEventDetails.description}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    showEventDetails.type === 'meeting' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' :
                    showEventDetails.type === 'deadline' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' :
                    showEventDetails.type === 'milestone' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                    showEventDetails.type === 'workshop' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200' :
                    showEventDetails.type === 'conference' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {showEventDetails.type.charAt(0).toUpperCase() + showEventDetails.type.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEventDetails(null)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Event Invitations */}
      {invitations.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Event Invitations
          </h3>
          
          <div className="space-y-3">
            {invitations.map((invitation) => (
              <div key={invitation.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {invitation.event.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(invitation.event.startDate).toLocaleDateString()} • {invitation.event.location || 'No location'}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleInvitationResponse(invitation.id, 'decline')}
                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => handleInvitationResponse(invitation.id, 'accept')}
                    className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCalendar;