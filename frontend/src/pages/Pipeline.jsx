import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/ui/StatsCard';

const Pipeline = () => {
  const [activeStage, setActiveStage] = useState('identification');

  // Mock data
  const statsData = [
    { title: "Pipeline Projects", value: "87", description: "Initiatives in various stages", trend: 12 },
    { title: "Funding Secured", value: "₹42.8M", description: "Committed funding for pipeline projects", trend: 18 },
    { title: "Implementation Rate", value: "78%", description: "Projects moving from planning to execution", trend: 5 },
    { title: "Success Rate", value: "92%", description: "Pipeline projects achieving objectives", trend: 3 }
  ];

  const pipelineStages = [
    {
      id: 'identification',
      title: 'Problem Identification',
      description: 'Recognizing humanitarian challenges and opportunities',
      projects: 24,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'planning',
      title: 'Project Planning',
      description: 'Developing detailed implementation strategies',
      projects: 18,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'funding',
      title: 'Funding & Escrow',
      description: 'Securing resources and setting up smart contracts',
      projects: 15,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'execution',
      title: 'Implementation',
      description: 'Executing projects with community partners',
      projects: 12,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'verification',
      title: 'Impact Verification',
      description: 'Measuring and validating outcomes',
      projects: 10,
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'completion',
      title: 'Project Completion',
      description: 'Final reporting and knowledge sharing',
      projects: 8,
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const projects = {
    identification: [
      {
        id: 1,
        title: "Urban Flooding Solutions",
        description: "Developing flood-resistant infrastructure for major cities",
        ngo: "Urban Resilience Initiative",
        region: "Mumbai, India",
        priority: "High"
      },
      {
        id: 2,
        title: "Drought Resilience Program",
        description: "Implementing water conservation and management systems",
        ngo: "Water Security Foundation",
        region: "Rajasthan, India",
        priority: "Medium"
      }
    ],
    planning: [
      {
        id: 3,
        title: "Education Technology Initiative",
        description: "Deploying digital learning platforms in underserved schools",
        ngo: "Education For All",
        region: "Bihar, India",
        priority: "High"
      }
    ],
    funding: [
      {
        id: 4,
        title: "Healthcare Access Program",
        description: "Mobile health clinics for remote communities",
        ngo: "Rural Health Foundation",
        region: "Odisha, India",
        priority: "High",
        fundingGoal: "₹2,400,000",
        fundingSecured: "₹1,800,000"
      }
    ],
    execution: [
      {
        id: 5,
        title: "Kerala Flood Relief",
        description: "Emergency relief and long-term rehabilitation",
        ngo: "Kerala Relief Foundation",
        region: "Kerala, India",
        priority: "High",
        progress: 65
      }
    ],
    verification: [
      {
        id: 6,
        title: "Assam Flood Response",
        description: "Disaster response and community recovery",
        ngo: "Assam Humanitarian Aid",
        region: "Assam, India",
        priority: "High",
        verificationStatus: "In Progress"
      }
    ],
    completion: [
      {
        id: 7,
        title: "Chennai Water Crisis",
        description: "Restoring clean water access to affected communities",
        ngo: "Tamil Nadu Water Initiative",
        region: "Chennai, India",
        priority: "High",
        impact: "12,500 people received clean water"
      }
    ]
  };

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
          Project Pipeline
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
        >
          Track humanitarian projects from identification to completion with transparent progress monitoring.
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
          </motion.div>
        ))}
      </div>

      {/* Pipeline Visualization */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pipeline Stages</h2>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          {pipelineStages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex flex-col items-center mb-6 md:mb-0"
            >
              <div 
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center text-white font-bold mb-3 cursor-pointer ${
                  activeStage === stage.id ? 'ring-4 ring-blue-300 dark:ring-blue-700' : ''
                }`}
                onClick={() => setActiveStage(stage.id)}
              >
                {index + 1}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white text-center">{stage.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">{stage.projects} projects</p>
            </motion.div>
          ))}
        </div>
        
        <div className="relative">
          {/* Connecting lines */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-purple-500 via-pink-500 to-indigo-500 transform -translate-y-1/2"></div>
        </div>
      </div>

      {/* Projects by Stage */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {pipelineStages.find(s => s.id === activeStage)?.title} Projects
          </h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm">
            {projects[activeStage]?.length || 0} projects
          </span>
        </div>
        
        <div className="space-y-6">
          {projects[activeStage]?.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                    <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                      project.priority === 'High' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                        : project.priority === 'Medium' 
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                          : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {project.priority} Priority
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">{project.description}</p>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {project.ngo}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {project.region}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  {project.fundingGoal && (
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Funding</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {project.fundingSecured} / {project.fundingGoal}
                      </p>
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" 
                          style={{ width: `${(parseInt(project.fundingSecured.replace(/[^0-9]/g, '')) / parseInt(project.fundingGoal.replace(/[^0-9]/g, ''))) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {project.progress !== undefined && (
                    <div className="text-right mt-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{project.progress}%</p>
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-teal-600 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {project.verificationStatus && (
                    <div className="text-right mt-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Verification</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{project.verificationStatus}</p>
                    </div>
                  )}
                  
                  {project.impact && (
                    <div className="text-right mt-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Impact</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{project.impact}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Pipeline;