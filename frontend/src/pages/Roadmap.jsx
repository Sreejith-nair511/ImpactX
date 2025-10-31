import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/ui/StatsCard';

const Roadmap = () => {
  const [activeQuarter, setActiveQuarter] = useState('q4-2025');

  // Mock data
  const statsData = [
    { title: "Milestones Completed", value: "24", description: "Key objectives achieved", trend: 5 },
    { title: "Upcoming Features", value: "18", description: "Planned enhancements", trend: 3 },
    { title: "Community Contributors", value: "142", description: "Volunteers and partners", trend: 12 },
    { title: "Adoption Rate", value: "32%", description: "Quarterly user growth", trend: 8 }
  ];

  const quarters = [
    { id: 'q4-2025', name: 'Q4 2025', status: 'current' },
    { id: 'q1-2026', name: 'Q1 2026', status: 'upcoming' },
    { id: 'q2-2026', name: 'Q2 2026', status: 'upcoming' },
    { id: 'q3-2026', name: 'Q3 2026', status: 'upcoming' },
    { id: 'q4-2026', name: 'Q4 2026', status: 'planned' }
  ];

  const roadmapItems = {
    'q4-2025': [
      {
        title: 'Global Expansion',
        description: 'Launch platform in 5 additional countries with local language support',
        status: 'In Progress',
        progress: 75,
        priority: 'High'
      },
      {
        title: 'Mobile App Release',
        description: 'Native iOS and Android applications for donors and NGOs',
        status: 'Completed',
        progress: 100,
        priority: 'High'
      },
      {
        title: 'Advanced Analytics Dashboard',
        description: 'Real-time impact visualization and reporting tools',
        status: 'In Progress',
        progress: 60,
        priority: 'Medium'
      }
    ],
    'q1-2026': [
      {
        title: 'DAO Governance Implementation',
        description: 'Decentralized autonomous organization for community decision-making',
        status: 'Planned',
        progress: 0,
        priority: 'High'
      },
      {
        title: 'AI Verification Engine',
        description: 'Machine learning models for automated impact verification',
        status: 'Planned',
        progress: 0,
        priority: 'High'
      },
      {
        title: 'Multi-Chain Support',
        description: 'Integration with additional blockchain networks',
        status: 'Planned',
        progress: 0,
        priority: 'Medium'
      }
    ],
    'q2-2026': [
      {
        title: 'Impact Token Marketplace',
        description: 'Decentralized exchange for trading impact tokens',
        status: 'Planned',
        progress: 0,
        priority: 'High'
      },
      {
        title: 'IoT Integration',
        description: 'Real-time data collection from ground-level sensors',
        status: 'Planned',
        progress: 0,
        priority: 'Medium'
      }
    ],
    'q3-2026': [
      {
        title: 'Predictive Analytics',
        description: 'Disaster forecasting and resource allocation models',
        status: 'Planned',
        progress: 0,
        priority: 'High'
      }
    ],
    'q4-2026': [
      {
        title: 'Global Network',
        description: '50+ countries with localized platforms and partnerships',
        status: 'Planned',
        progress: 0,
        priority: 'High'
      }
    ]
  };

  const roadmapCategories = [
    {
      title: "Technology",
      description: "Platform infrastructure and blockchain integration",
      color: "from-blue-500 to-blue-600",
      count: 12
    },
    {
      title: "Community",
      description: "Governance, participation, and user experience",
      color: "from-green-500 to-green-600",
      count: 8
    },
    {
      title: "Impact",
      description: "Verification, measurement, and optimization",
      color: "from-purple-500 to-purple-600",
      count: 10
    },
    {
      title: "Partnerships",
      description: "NGO integrations and global expansion",
      color: "from-yellow-500 to-yellow-600",
      count: 6
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
          Strategic Roadmap
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
        >
          Our vision for creating a transparent, accountable, and globally accessible humanitarian platform.
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

      {/* Roadmap Categories */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Focus Areas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30"
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white font-bold mr-4`}>
                  {category.title.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{category.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{category.count} initiatives</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Development Timeline</h2>
        
        <div className="flex flex-wrap gap-4 mb-8">
          {quarters.map((quarter) => (
            <button
              key={quarter.id}
              onClick={() => setActiveQuarter(quarter.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeQuarter === quarter.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
                  : quarter.status === 'current'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    : quarter.status === 'upcoming'
                      ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      : 'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-500'
              }`}
            >
              {quarter.name}
              {quarter.status === 'current' && (
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-white text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                  Current
                </span>
              )}
            </button>
          ))}
        </div>
        
        <div className="space-y-6">
          {roadmapItems[activeQuarter]?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="flex items-center mb-3 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                    item.priority === 'High' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                      : item.priority === 'Medium' 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  }`}>
                    {item.priority} Priority
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 text-xs rounded-full mr-3 ${
                    item.status === 'Completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : item.status === 'In Progress' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.progress}%</span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    item.status === 'Completed' 
                      ? 'bg-gradient-to-r from-green-500 to-green-600' 
                      : item.status === 'In Progress' 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600' 
                        : 'bg-gradient-to-r from-gray-400 to-gray-500'
                  }`} 
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Community Involvement */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Community Involvement</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Shape Our Future</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your feedback and contributions help us prioritize features and improvements that matter most to our community.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Vote on feature priorities</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Contribute to development</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Join working groups</span>
              </li>
            </ul>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300">
              Get Involved
            </button>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quarterly Reviews</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We conduct transparent reviews of our progress and adjust our roadmap based on community feedback and changing needs.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white">Q3 2025 Review</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Completed 95% of planned objectives</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white">Q2 2025 Review</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Exceeded impact verification targets</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white">Q1 2025 Review</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Successfully launched in 3 new countries</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Feedback Channels</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Multiple ways to share your ideas and help guide our development priorities.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Community Forum</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Discuss ideas and vote on features</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Roadmap Proposals</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Submit detailed feature requests</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Working Groups</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Join specialized development teams</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Roadmap;