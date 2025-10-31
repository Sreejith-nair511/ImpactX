import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/ui/StatsCard';

const Accessibility = () => {
  const [fontSize, setFontSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);

  // Mock data
  const statsData = [
    { title: "WCAG Compliance", value: "AA", description: "Web Content Accessibility Guidelines", trend: null },
    { title: "Accessibility Score", value: "94%", description: "Automated accessibility testing", trend: 3 },
    { title: "Manual Testing", value: "100%", description: "Human review of key features", trend: null },
    { title: "User Feedback", value: "4.8/5", description: "Accessibility user satisfaction", trend: 0.2 }
  ];

  const accessibilityFeatures = [
    {
      title: "Keyboard Navigation",
      description: "Full functionality available through keyboard shortcuts",
      status: "Implemented",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V7a4 4 0 118 0m-8 4v1a4 4 0 004 4m-4-4H7a4 4 0 00-4 4v1h14v-1a4 4 0 00-4-4m-4 0h4" />
        </svg>
      )
    },
    {
      title: "Screen Reader Support",
      description: "Comprehensive support for assistive technologies",
      status: "Implemented",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: "High Contrast Mode",
      description: "Enhanced visibility for users with visual impairments",
      status: "Implemented",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )
    },
    {
      title: "Customizable Text Size",
      description: "Adjustable font sizes for improved readability",
      status: "Implemented",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    }
  ];

  const wcagStandards = [
    {
      level: "Level A",
      description: "Minimum level of accessibility",
      status: "Compliant",
      requirements: 30
    },
    {
      level: "Level AA",
      description: "Standard level of accessibility",
      status: "Compliant",
      requirements: 25
    },
    {
      level: "Level AAA",
      description: "Enhanced level of accessibility",
      status: "In Progress",
      requirements: 15
    }
  ];

  const assistiveTechnologies = [
    {
      name: "JAWS",
      compatibility: "Full",
      description: "Screen reader for Windows"
    },
    {
      name: "NVDA",
      compatibility: "Full",
      description: "Free screen reader for Windows"
    },
    {
      name: "VoiceOver",
      compatibility: "Full",
      description: "Built-in screen reader for macOS/iOS"
    },
    {
      name: "ChromeVox",
      compatibility: "Full",
      description: "Screen reader for Chrome OS"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen ${highContrast ? 'bg-black text-white' : ''}`}
    >
      <div className="mb-12 text-center">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4 ${highContrast ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : ''}`}
        >
          Accessibility Commitment
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg ${highContrast ? 'text-gray-300' : ''}`}
        >
          Ensuring our platform is accessible to all users, regardless of abilities or assistive technology needs.
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

      {/* Accessibility Controls */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Accessibility Controls</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Text Size</h3>
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => setFontSize('small')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  fontSize === 'small' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                Small Text
              </button>
              <button 
                onClick={() => setFontSize('medium')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  fontSize === 'medium' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                Medium Text
              </button>
              <button 
                onClick={() => setFontSize('large')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  fontSize === 'large' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                Large Text
              </button>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Visual Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">High Contrast</span>
                <button 
                  onClick={() => setHighContrast(!highContrast)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    highContrast ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span 
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      highContrast ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Screen Reader</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Enable Reader</span>
                <button 
                  onClick={() => setScreenReader(!screenReader)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    screenReader ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span 
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      screenReader ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300">
                Test with Reader
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Features */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Accessibility Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accessibilityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      {feature.status}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* WCAG Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">WCAG Compliance</h2>
          
          <div className="space-y-4">
            {wcagStandards.map((standard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{standard.level}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{standard.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    standard.status === 'Compliant' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  }`}>
                    {standard.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{standard.requirements} requirements</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Assistive Technologies */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Assistive Technology Support</h2>
          
          <div className="space-y-4">
            {assistiveTechnologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{tech.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{tech.description}</p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    {tech.compatibility}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Accessibility Feedback */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Accessibility Feedback</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Report Accessibility Issues</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Help us improve by reporting any accessibility barriers you encounter on our platform.
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Issue Description</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Describe the accessibility issue you encountered..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assistive Technology Used</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  placeholder="e.g., JAWS, NVDA, VoiceOver"
                />
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300">
                Submit Feedback
              </button>
            </form>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Accessibility Resources</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Learn more about digital accessibility and how we're working to make our platform inclusive.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Accessibility Statement</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Our commitment to accessibility and ongoing improvements</p>
                <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium mt-2">
                  Read Statement
                </button>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Accessibility Training</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Resources for developers and content creators</p>
                <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium mt-2">
                  Access Training
                </button>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">User Testing Program</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Participate in accessibility user testing</p>
                <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium mt-2">
                  Join Program
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Accessibility;