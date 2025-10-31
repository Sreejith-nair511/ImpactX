import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/ui/StatsCard';

const Lab = () => {
  const [activeExperiment, setActiveExperiment] = useState('ai-verification');
  const [experimentStatus, setExperimentStatus] = useState('running');

  // Mock data
  const statsData = [
    { title: "Active Experiments", value: "12", description: "Ongoing research initiatives", trend: 3 },
    { title: "Research Partners", value: "8", description: "Academic and industry collaborators", trend: 2 },
    { title: "Patent Applications", value: "5", description: "Intellectual property filings", trend: 1 },
    { title: "Research Publications", value: "24", description: "Peer-reviewed papers and articles", trend: 5 }
  ];

  const experiments = [
    {
      id: 'ai-verification',
      title: 'AI-Powered Verification',
      description: 'Machine learning models for automated impact verification',
      status: 'Running',
      progress: 75,
      researchers: 5,
      eta: 'Q2 2026'
    },
    {
      id: 'blockchain-scaling',
      title: 'Blockchain Scaling Solutions',
      description: 'Layer 2 solutions for increased transaction throughput',
      status: 'Running',
      progress: 60,
      researchers: 3,
      eta: 'Q3 2026'
    },
    {
      id: 'predictive-analytics',
      title: 'Predictive Analytics Engine',
      description: 'Forecasting models for disaster preparedness',
      status: 'Planning',
      progress: 20,
      researchers: 4,
      eta: 'Q4 2026'
    },
    {
      id: 'iot-integration',
      title: 'IoT Sensor Integration',
      description: 'Real-time data collection from ground-level sensors',
      status: 'Completed',
      progress: 100,
      researchers: 6,
      eta: 'Deployed'
    }
  ];

  const researchAreas = [
    {
      title: "Machine Learning",
      description: "AI models for fraud detection and impact measurement",
      projects: 4,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Blockchain Innovation",
      description: "Next-generation consensus mechanisms and smart contracts",
      projects: 3,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Data Science",
      description: "Advanced analytics for humanitarian impact optimization",
      projects: 5,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Human-Computer Interaction",
      description: "User experience research for diverse populations",
      projects: 2,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const publications = [
    {
      title: "Decentralized Verification in Humanitarian Aid",
      authors: "Sreejith, Vasudha, Nikhil",
      journal: "Journal of Blockchain for Social Impact",
      date: "2025-09-15",
      status: "Published"
    },
    {
      title: "AI Models for Fraud Detection in NGO Reporting",
      authors: "Vasudha, Sreejith",
      journal: "IEEE Transactions on Humanitarian Technology",
      date: "2025-08-22",
      status: "Published"
    },
    {
      title: "Scalable Smart Contracts for Transparent Fund Management",
      authors: "Nikhil, Sreejith",
      journal: "ACM Transactions on Humanitarian Computing",
      date: "2025-07-30",
      status: "Published"
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
          Innovation Lab
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
        >
          Advancing humanitarian technology through cutting-edge research and experimentation.
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

      {/* Research Areas */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Research Focus Areas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {researchAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                  {area.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{area.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{area.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{area.projects} active projects</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Active Experiments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Active Experiments</h2>
          
          <div className="space-y-4">
            {experiments.map((experiment, index) => (
              <motion.div
                key={experiment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                  activeExperiment === experiment.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white'
                }`}
                onClick={() => setActiveExperiment(experiment.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{experiment.title}</h3>
                    <p className="text-sm mt-1 opacity-80">{experiment.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    experiment.status === 'Running' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : experiment.status === 'Planning' 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {experiment.status}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {experiment.researchers} researchers
                  </div>
                  <div className="text-sm">ETA: {experiment.eta}</div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" 
                    style={{ width: `${experiment.progress}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Experiment Details */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Experiment Details</h2>
          
          {experiments.map((experiment) => (
            activeExperiment === experiment.id && (
              <motion.div
                key={experiment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{experiment.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{experiment.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{experiment.status}</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{experiment.progress}%</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Researchers</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{experiment.researchers}</p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Completion</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{experiment.eta}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Research Objectives</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Develop advanced algorithms for automated verification</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Validate accuracy against human verification processes</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Optimize for real-time processing capabilities</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300">
                    View Research Paper
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Join Research Team
                  </button>
                </div>
              </motion.div>
            )
          ))}
        </div>
      </div>

      {/* Recent Publications */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Publications</h2>
        
        <div className="space-y-4">
          {publications.map((publication, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{publication.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{publication.authors}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{publication.journal} • {publication.date}</p>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  {publication.status}
                </span>
              </div>
              <div className="flex space-x-3 mt-3">
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Read Paper
                </button>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  View Citation
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Lab;