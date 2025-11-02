import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatsCard from './StatsCard';
import AnalyticsCard from './AnalyticsCard';
import ProjectCard from './ProjectCard';
import ImpactChart from './ImpactChart';
import DataMap from './DataMap';
import UserCard from './UserCard';
import LoadingSpinner from './LoadingSpinner';
import * as analyticsService from '../../services/analyticsService';
import usePortfolio from '../../hooks/usePortfolio';
import useUserConnections from '../../hooks/useUserConnections';
import useEvents from '../../hooks/useEvents';
import useDocuments from '../../hooks/useDocuments';

const UserDashboard = ({ userId, className = '' }) => {
  const { projects, stats: portfolioStats } = usePortfolio(userId);
  const { connections, counts: connectionCounts } = useUserConnections(userId);
  const { upcomingEvents } = useEvents(userId);
  const { documents } = useDocuments(userId);
  
  const [platformMetrics, setPlatformMetrics] = useState(null);
  const [impactData, setImpactData] = useState(null);
  const [geographicData, setGeographicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch analytics data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [metrics, impact, geographic] = await Promise.all([
          analyticsService.getPlatformMetrics(),
          analyticsService.getImpactData(),
          analyticsService.getGeographicData()
        ]);
        
        setPlatformMetrics(metrics);
        setImpactData(impact);
        setGeographicData(geographic);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get recent projects
  const recentProjects = projects.slice(0, 3);

  // Get suggested connections
  const suggestedConnections = connections.followers?.slice(0, 3) || [];

  // Get upcoming events
  const nextEvents = upcomingEvents.slice(0, 3);

  // Get recent documents
  const recentDocuments = documents.slice(0, 3);

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-96 ${className}`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-xl p-6 text-center ${className}`}>
        <div className="text-red-600 dark:text-red-400 font-medium mb-2">
          Error loading dashboard
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

  return (
    <div className={className}>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl shadow-lg p-6 mb-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
            <p className="text-indigo-100">
              Here's what's happening with your projects and impact today.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Create New Project
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Donations"
          value={platformMetrics ? formatCurrency(platformMetrics.totalDonations) : '₹0'}
          description="Funds raised for impact projects"
          trend={12.5}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        
        <StatsCard
          title="Active Projects"
          value={platformMetrics ? platformMetrics.activeProjects : 0}
          description="Projects currently running"
          trend={5.2}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
        />
        
        <StatsCard
          title="Verified Impact"
          value={platformMetrics ? `${platformMetrics.verifiedImpact}%` : '0%'}
          description="Transparency rating"
          trend={2.1}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          }
        />
        
        <StatsCard
          title="Global Reach"
          value={platformMetrics ? platformMetrics.countriesReached : 0}
          description="Countries impacted"
          trend={8.7}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Impact Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Impact Over Time
            </h2>
            {impactData && (
              <ImpactChart 
                title="Monthly Impact Growth" 
                data={impactData.map(item => ({
                  label: item.month,
                  value: item.impact
                }))}
              />
            )}
          </div>
          
          {/* Recent Projects */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Projects
              </h2>
              <button className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">
                View All
              </button>
            </div>
            
            {recentProjects.length === 0 ? (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  No projects yet. Create your first project to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Geographic Impact */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Geographic Impact
            </h2>
            {geographicData && (
              <DataMap 
                title="Global Impact Distribution" 
                locations={geographicData.map((item, index) => ({
                  name: item.country,
                  x: 20 + (index * 20),
                  y: 30 + (index * 15),
                  impact: item.impact
                }))}
              />
            )}
          </div>
          
          {/* Suggested Connections */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Suggested Connections
              </h2>
              <button className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">
                View All
              </button>
            </div>
            
            {suggestedConnections.length === 0 ? (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  No connection suggestions available.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {suggestedConnections.map((user) => (
                  <UserCard 
                    key={user.id} 
                    user={user} 
                    variant="compact" 
                    showActions={true} 
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Upcoming Events */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Upcoming Events
              </h2>
              <button className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">
                View Calendar
              </button>
            </div>
            
            {nextEvents.length === 0 ? (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  No upcoming events scheduled.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {nextEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="w-3 h-3 rounded-full bg-indigo-500 mr-3"></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {new Date(event.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;