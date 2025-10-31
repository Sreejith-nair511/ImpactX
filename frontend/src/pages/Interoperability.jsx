import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/ui/StatsCard';

const Interoperability = () => {
  const [activeTab, setActiveTab] = useState('integrations');

  // Mock data
  const statsData = [
    { title: "Connected Platforms", value: "24", description: "Third-party systems integrated", trend: 5 },
    { title: "Daily Data Sync", value: "1.2M", description: "Records synchronized daily", trend: 12 },
    { title: "API Requests", value: "42.8M", description: "Monthly API calls processed", trend: 8 },
    { title: "Integration Success", value: "99.2%", description: "Successful data exchanges", trend: 0.5 }
  ];

  const integrations = [
    {
      name: "Algorand Blockchain",
      type: "Blockchain",
      status: "Active",
      description: "Smart contract execution and fund management",
      lastSync: "2025-10-31 14:30:22"
    },
    {
      name: "Satellite API",
      type: "Data Source",
      status: "Active",
      description: "High-resolution imagery for impact verification",
      lastSync: "2025-10-31 13:45:18"
    },
    {
      name: "IPFS Network",
      type: "Storage",
      status: "Active",
      description: "Decentralized storage for documents and reports",
      lastSync: "2025-10-31 12:15:44"
    },
    {
      name: "Google Maps",
      type: "Mapping",
      status: "Active",
      description: "Geospatial visualization and location services",
      lastSync: "2025-10-31 11:30:12"
    },
    {
      name: "IoT Sensor Network",
      type: "Data Source",
      status: "Active",
      description: "Real-time environmental and infrastructure data",
      lastSync: "2025-10-31 10:45:33"
    },
    {
      name: "NGO Management System",
      type: "Partner Platform",
      status: "Active",
      description: "Seamless NGO onboarding and campaign management",
      lastSync: "2025-10-31 09:20:15"
    }
  ];

  const protocols = [
    {
      name: "RESTful API",
      description: "Standard HTTP-based interface for data exchange",
      version: "v2.1",
      status: "Stable"
    },
    {
      name: "GraphQL",
      description: "Flexible query language for precise data retrieval",
      version: "v1.0",
      status: "Beta"
    },
    {
      name: "Webhooks",
      description: "Real-time event notifications and updates",
      version: "v1.2",
      status: "Stable"
    },
    {
      name: "Blockchain Bridge",
      description: "Cross-chain communication protocols",
      version: "v0.9",
      status: "Development"
    }
  ];

  const dataStandards = [
    {
      name: "ISO 20022",
      description: "Financial messaging standards for transactions",
      adoption: "100%"
    },
    {
      name: "OpenAPI 3.0",
      description: "API specification and documentation standard",
      adoption: "100%"
    },
    {
      name: "JSON-LD",
      description: "Structured data representation for semantic web",
      adoption: "85%"
    },
    {
      name: "GDPR Compliance",
      description: "Data privacy and protection standards",
      adoption: "100%"
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
          Interoperability Hub
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
        >
          Seamless integration with global systems to create a connected humanitarian ecosystem.
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

      {/* Integration Controls */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('integrations')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'integrations'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Active Integrations
          </button>
          <button
            onClick={() => setActiveTab('protocols')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'protocols'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Protocols
          </button>
          <button
            onClick={() => setActiveTab('standards')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'standards'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Data Standards
          </button>
        </div>
      </div>

      {/* Integration Content */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        {activeTab === 'integrations' && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Connected Platforms</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((integration, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{integration.name}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{integration.type}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      integration.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}>
                      {integration.status}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{integration.description}</p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Last sync: {integration.lastSync}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
        
        {activeTab === 'protocols' && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Communication Protocols</h2>
            
            <div className="space-y-4">
              {protocols.map((protocol, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{protocol.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">{protocol.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Version {protocol.version}</span>
                      <span className={`block px-2 py-1 text-xs rounded-full mt-2 ${
                        protocol.status === 'Stable' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : protocol.status === 'Beta' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      }`}>
                        {protocol.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-3 mt-4">
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      View Documentation
                    </button>
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      API Reference
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
        
        {activeTab === 'standards' && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Data Standards & Compliance</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dataStandards.map((standard, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{standard.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{standard.description}</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      {standard.adoption}
                    </span>
                  </div>
                  <div className="flex space-x-3 mt-4">
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      View Standard
                    </button>
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      Compliance Report
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Partner Integration */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Partner Integration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Connect Your Platform</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Integrate your humanitarian platform with ImpactX to share data, synchronize campaigns, and collaborate on impact measurement.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Real-time data synchronization</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Unified donor experience</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Shared verification infrastructure</span>
              </li>
            </ul>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300">
              Partner With Us
            </button>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Integration Process</h3>
            
            <div className="relative">
              {/* Connecting lines */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900/50 transform translate-x-1/2"></div>
              
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative flex items-start"
                >
                  <div className="absolute left-0 w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center z-10">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                  </div>
                  <div className="ml-24">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Application</h4>
                    <p className="text-gray-600 dark:text-gray-300">Submit partnership application with platform details</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative flex items-start"
                >
                  <div className="absolute left-0 w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center z-10">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                  </div>
                  <div className="ml-24">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Technical Review</h4>
                    <p className="text-gray-600 dark:text-gray-300">Our team evaluates technical compatibility and requirements</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative flex items-start"
                >
                  <div className="absolute left-0 w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center z-10">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
                  </div>
                  <div className="ml-24">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Integration Development</h4>
                    <p className="text-gray-600 dark:text-gray-300">Implement API connections and data synchronization</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative flex items-start"
                >
                  <div className="absolute left-0 w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center z-10">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">4</span>
                  </div>
                  <div className="ml-24">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Testing & Deployment</h4>
                    <p className="text-gray-600 dark:text-gray-300">Conduct thorough testing and deploy integration</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Interoperability;