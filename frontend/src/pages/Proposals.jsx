import React from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/ui/StatsCard';
import Breadcrumbs from '../components/ui/Breadcrumbs';

const Proposals = () => {
  // Mock data
  const statsData = [
    { title: "Active Proposals", value: "24", description: "Currently under review", trend: 5 },
    { title: "Total Votes", value: "15.2K", description: "Community participation", trend: 12 },
    { title: "Funded Projects", value: "89", description: "Successfully approved", trend: 8 },
    { title: "Total Funding", value: "₹42.7M", description: "Allocated to projects", trend: 15 }
  ];

  const proposals = [
    {
      id: "PROP-2025-001",
      title: "Kerala Flood Recovery Initiative",
      description: "Comprehensive rebuilding program for flood-affected communities in Kerala",
      funding: "₹2.5M",
      votes: "1,248",
      status: "Active",
      progress: 78,
      category: "Disaster Relief"
    },
    {
      id: "PROP-2025-002",
      title: "Assam School Infrastructure",
      description: "Construction and renovation of educational facilities in rural Assam",
      funding: "₹1.8M",
      votes: "987",
      status: "Active",
      progress: 65,
      category: "Education"
    },
    {
      id: "PROP-2025-003",
      title: "Tamil Nadu Medical Supplies",
      description: "Procurement and distribution of essential medical equipment",
      funding: "₹950K",
      votes: "756",
      status: "Pending",
      progress: 42,
      category: "Healthcare"
    },
    {
      id: "PROP-2025-004",
      title: "Mangrove Restoration Project",
      description: "Coastal ecosystem restoration to combat climate change effects",
      funding: "₹750K",
      votes: "632",
      status: "Pending",
      progress: 35,
      category: "Climate Action"
    }
  ];

  const categories = [
    { name: "Disaster Relief", count: 12, color: "bg-blue-500" },
    { name: "Education", count: 8, color: "bg-green-500" },
    { name: "Healthcare", count: 6, color: "bg-purple-500" },
    { name: "Climate Action", count: 4, color: "bg-yellow-500" },
    { name: "Community Development", count: 2, color: "bg-red-500" }
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
          Community Proposals
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
        >
          Participate in democratic decision-making for humanitarian fund allocation and project priorities.
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            />
          </motion.div>
        ))}
      </div>

      {/* Proposal Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Proposal Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.4 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-center cursor-pointer"
            >
              <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <span className="text-white font-bold">{category.count}</span>
              </div>
              <h3 className="text-gray-900 dark:text-white font-medium">{category.name}</h3>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Active Proposals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Active Proposals</h2>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg text-sm hover:from-blue-700 hover:to-indigo-800 transition-all">
            Submit Proposal
          </button>
        </div>
        
        <div className="space-y-6">
          {proposals.map((proposal, index) => (
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
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-3">{proposal.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      proposal.category === "Disaster Relief" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                      proposal.category === "Education" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                      proposal.category === "Healthcare" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" :
                      proposal.category === "Climate Action" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" :
                      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }`}>
                      {proposal.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{proposal.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{proposal.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  proposal.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                }`}>
                  {proposal.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Requested Funding</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{proposal.funding}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Community Votes</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{proposal.votes}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Approval Progress</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{proposal.progress}%</div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" 
                  style={{ width: `${proposal.progress}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center">
                <button className="px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                  View Details
                </button>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-lg text-sm hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
                    Vote Yes
                  </button>
                  <button className="px-4 py-2 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-lg text-sm hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
                    Vote No
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Governance Process */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How Proposal Voting Works</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Submit Proposal</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Community members submit detailed proposals with funding requests and impact metrics.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Verification</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Our AI systems verify proposal details and check for consistency with impact goals.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Community Voting</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Token holders vote on proposals during a 7-day voting period.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 dark:text-yellow-400 font-bold">4</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fund Distribution</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Approved proposals receive automatic fund distribution via smart contracts.</p>
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Voting Power & Governance</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your voting power is determined by your token holdings and participation in the ecosystem.
          </p>
          
          <div className="space-y-4 mb-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700 dark:text-gray-300">Token Holder Voting Power</span>
                <span className="text-gray-700 dark:text-gray-300">60%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700 dark:text-gray-300">Community Expert Voting Power</span>
                <span className="text-gray-700 dark:text-gray-300">25%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700 dark:text-gray-300">NGO Partner Voting Power</span>
                <span className="text-gray-700 dark:text-gray-300">15%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Current Voting Period</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              Proposal: Kerala Flood Recovery Initiative (PROP-2025-001)
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Time Remaining</span>
              <span className="text-gray-900 dark:text-white font-medium">3 days 14 hours</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Transparency */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Transparent Governance</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          All proposal submissions, votes, and outcomes are permanently recorded on the blockchain for complete transparency.
        </p>
        <div className="bg-gray-800 dark:bg-gray-900 rounded-lg p-6 font-mono text-green-400 text-sm overflow-x-auto">
          <div className="mb-2">Proposal ID: PROP-2025-001</div>
          <div className="mb-2">Blockchain Hash: 0x7f8a9b4c2e1d5f6a8b3c0d9e7f1a4b6c8d2e5f9a0b3c7d1e4f8a6b9c0d5e3f7</div>
          <div className="mb-2">Submission Time: 2025-10-15 14:32:45 UTC</div>
          <div className="mb-2">Verification Status: ✅ Verified by AI Systems</div>
          <div>Voting Status: 🗳️ Active (3 days remaining)</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Proposals;