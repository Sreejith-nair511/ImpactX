import React from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/ui/StatsCard';

const Tools = () => {
  // Mock data
  const statsData = [
    { title: "Tools Available", value: "24", description: "Specialized tools for humanitarian work", trend: 5 },
    { title: "Active Users", value: "8.2K", description: "Professionals using our tools", trend: 18 },
    { title: "Integration Partners", value: "15", description: "Platforms integrated with our tools", trend: 3 },
    { title: "Tool Accuracy", value: "98.7%", description: "Average accuracy of tool outputs", trend: 1.2 }
  ];

  const toolCategories = [
    {
      title: "Data Analysis",
      description: "Advanced analytics tools for measuring impact and optimizing resource allocation",
      tools: 8,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Verification",
      description: "Tools for validating claims and ensuring transparent reporting",
      tools: 6,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Communication",
      description: "Platforms for coordinating relief efforts and community engagement",
      tools: 5,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
    },
    {
      title: "Resource Management",
      description: "Tools for tracking inventory, logistics, and supply chain optimization",
      tools: 5,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    }
  ];

  const featuredTools = [
    {
      title: "Impact Analyzer",
      description: "AI-powered tool for predicting the effectiveness of humanitarian interventions",
      category: "Data Analysis",
      users: "2,451",
      rating: 4.8
    },
    {
      title: "Verification Engine",
      description: "Multi-source verification system for validating impact claims",
      category: "Verification",
      users: "1,876",
      rating: 4.9
    },
    {
      title: "Crisis Communicator",
      description: "Real-time communication platform for coordinating relief efforts",
      category: "Communication",
      users: "1,243",
      rating: 4.7
    },
    {
      title: "Supply Tracker",
      description: "End-to-end tracking of humanitarian supplies and resources",
      category: "Resource Management",
      users: "987",
      rating: 4.6
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <div className="mb-12 text-center">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4"
        >
          Humanitarian Tools
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
        >
          Specialized tools and platforms designed to enhance the effectiveness of humanitarian work through technology.
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
              icon={stat.icon}
            />
          </motion.div>
        ))}
      </div>

      {/* Tool Categories */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tool Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {toolCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{category.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{category.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{category.tools} tools available</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Tools */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Tools</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredTools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tool.title}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{tool.category}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm text-gray-900 dark:text-white">{tool.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{tool.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">{tool.users} active users</span>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300">
                  Try Tool
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Integration Partners */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Integration Partners</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">A</span>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Algorand</span>
            </div>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 dark:text-green-400 font-bold">S</span>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Satellite API</span>
            </div>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 dark:text-purple-400 font-bold">I</span>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">IPFS</span>
            </div>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-yellow-600 dark:text-yellow-400 font-bold">G</span>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Google Maps</span>
            </div>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-red-600 dark:text-red-400 font-bold">N</span>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">NASA</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Tools;