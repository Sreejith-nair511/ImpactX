import React from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/ui/StatsCard';
import Breadcrumbs from '../components/ui/Breadcrumbs';

const Events = () => {
  // Mock data
  const statsData = [
    { title: "Upcoming Events", value: "12", description: "This quarter", trend: 5 },
    { title: "Registered Participants", value: "8.7K", description: "Confirmed attendance", trend: 12 },
    { title: "Global Reach", value: "42", description: "Countries represented", trend: 8 },
    { title: "Knowledge Shared", value: "156", description: "Sessions & workshops", trend: 15 }
  ];

  const upcomingEvents = [
    {
      id: "EVENT-2025-Q4-001",
      title: "Global Humanitarian Innovation Summit",
      date: "2025-11-15",
      time: "09:00 - 17:00 UTC",
      location: "Virtual & Geneva, Switzerland",
      type: "Conference",
      attendees: "1,200+",
      description: "Annual gathering of humanitarian leaders, technologists, and changemakers to explore innovative solutions for global challenges."
    },
    {
      id: "EVENT-2025-Q4-002",
      title: "Blockchain for Social Impact Workshop",
      date: "2025-11-22",
      time: "14:00 - 18:00 UTC",
      location: "Virtual",
      type: "Workshop",
      attendees: "250+",
      description: "Hands-on workshop exploring how blockchain technology can enhance transparency and accountability in humanitarian operations."
    },
    {
      id: "EVENT-2025-Q4-003",
      title: "AI Ethics in Humanitarian Work",
      date: "2025-12-05",
      time: "10:00 - 13:00 UTC",
      location: "Virtual",
      type: "Webinar",
      attendees: "500+",
      description: "Discussion on ethical considerations when implementing AI solutions in humanitarian contexts, with case studies from the field."
    }
  ];

  const eventTypes = [
    { name: "Conferences", count: 4, color: "bg-blue-500" },
    { name: "Workshops", count: 8, color: "bg-green-500" },
    { name: "Webinars", count: 12, color: "bg-purple-500" },
    { name: "Community Meetups", count: 6, color: "bg-yellow-500" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <Breadcrumbs />
      
      <div className="mb-12 text-center">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4"
        >
          Global Events
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
        >
          Connect with changemakers worldwide through conferences, workshops, and community gatherings focused on humanitarian innovation.
        </motion.p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <StatsCard 
              title={stat.title}
              value={stat.value}
              description={stat.description}
              trend={stat.trend}
              icon={
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />
          </motion.div>
        ))}
      </div>

      {/* Event Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Event Categories</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Explore different types of events to find opportunities that match your interests and expertise.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {eventTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.4 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-center cursor-pointer"
            >
              <div className={`w-12 h-12 ${type.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <span className="text-white font-bold">{type.count}</span>
              </div>
              <h3 className="text-gray-900 dark:text-white font-medium">{type.name}</h3>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upcoming Events</h2>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg text-sm hover:from-blue-700 hover:to-indigo-800 transition-all">
            View Calendar
          </button>
        </div>
        
        <div className="space-y-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-3">{event.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === "Conference" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                      event.type === "Workshop" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                      event.type === "Webinar" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" :
                      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-900 dark:text-white">{event.date}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-900 dark:text-white">{event.time}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-900 dark:text-white">{event.location}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="inline-flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {event.attendees} registered
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    Add to Calendar
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg text-sm hover:from-blue-700 hover:to-indigo-800 transition-all">
                    Register Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Event Experience */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Virtual & In-Person Experiences</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Participate from anywhere in the world with our hybrid event format.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Streaming</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Full HD video streaming with interactive Q&A sessions and real-time polling.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Networking Opportunities</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Virtual networking lounges and breakout rooms to connect with fellow participants.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resource Access</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Download presentation materials, research papers, and exclusive content from speakers.</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Event Highlights</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            What makes our events unique and valuable for participants.
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Expert Speakers</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Learn from leading experts in humanitarian innovation, technology, and social impact.
              </p>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs">SJ</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-xs">RK</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-xs">AP</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-white text-xs">+12</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Interactive Workshops</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Hands-on sessions where you can apply new skills and collaborate with peers on real challenges.
              </p>
              <div className="flex items-center text-sm">
                <span className="text-gray-900 dark:text-white font-medium">24 workshops</span>
                <span className="text-gray-500 dark:text-gray-400 mx-2">•</span>
                <span className="text-gray-500 dark:text-gray-400">15 practical projects</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Global Community</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Connect with changemakers from 40+ countries and build lasting professional relationships.
              </p>
              <div className="flex items-center">
                <div className="flex -space-x-1">
                  <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-yellow-500 border-2 border-white"></div>
                </div>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Participants from 42 countries</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Past Event Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Past Event Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Humanitarian Tech Summit 2025</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">April 2025 • 1,500+ attendees</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Explored how emerging technologies are transforming humanitarian response and service delivery.
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-green-500 to-teal-600"></div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Blockchain for Good Conference</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">March 2025 • 800+ attendees</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Showcased innovative blockchain applications for transparency and accountability in aid distribution.
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-600"></div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">AI for Social Impact Workshop</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">February 2025 • 350+ attendees</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Hands-on training in applying artificial intelligence to solve humanitarian challenges ethically.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Events;