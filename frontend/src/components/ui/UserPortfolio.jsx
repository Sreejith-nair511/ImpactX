import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

const UserPortfolio = ({ 
  user, 
  projects = [], 
  showFilters = true, 
  showStats = true,
  className = '' 
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Filter projects based on active filter
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return project.status === 'active';
    if (activeFilter === 'completed') return project.status === 'completed';
    if (activeFilter === 'funded') return project.fundingProgress >= 100;
    return true;
  });

  // Sort projects based on sortBy value
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === 'impact') {
      return b.impactScore - a.impactScore;
    }
    if (sortBy === 'funding') {
      return b.currentFunding - a.currentFunding;
    }
    return 0;
  });

  // Calculate portfolio stats
  const portfolioStats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    totalFunding: projects.reduce((sum, project) => sum + (project.currentFunding || 0), 0),
    totalImpact: projects.reduce((sum, project) => sum + (project.impactScore || 0), 0)
  };

  // Filter options
  const filterOptions = [
    { key: 'all', label: 'All Projects', count: projects.length },
    { key: 'active', label: 'Active', count: portfolioStats.activeProjects },
    { key: 'completed', label: 'Completed', count: portfolioStats.completedProjects },
    { key: 'funded', label: 'Fully Funded', count: projects.filter(p => p.fundingProgress >= 100).length }
  ];

  // Sort options
  const sortOptions = [
    { key: 'date', label: 'Most Recent' },
    { key: 'impact', label: 'Highest Impact' },
    { key: 'funding', label: 'Most Funded' }
  ];

  return (
    <div className={className}>
      {/* Header with user info */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 mb-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{user?.name || 'User'}'s Portfolio</h2>
            <p className="text-blue-100 mt-1">
              {user?.role || 'Impact Creator'} • {portfolioStats.totalProjects} projects
            </p>
          </div>
          {user?.location && (
            <div className="flex items-center mt-3 md:mt-0">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{user.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      {showStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {portfolioStats.totalProjects}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Total Projects
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {portfolioStats.activeProjects}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Active Projects
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ₹{portfolioStats.totalFunding.toLocaleString()}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Total Funding
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {portfolioStats.totalImpact.toLocaleString()}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Impact Score
            </div>
          </div>
        </div>
      )}

      {/* Filters and Sorting */}
      {showFilters && (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.key
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {filter.label} {filter.count > 0 && `(${filter.count})`}
              </button>
            ))}
          </div>
          
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 mr-2 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {sortOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {sortedProjects.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sortedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No projects found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {activeFilter === 'all' 
              ? 'This user hasn\'t created any projects yet.' 
              : `No projects match the "${filterOptions.find(f => f.key === activeFilter)?.label}" filter.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserPortfolio;