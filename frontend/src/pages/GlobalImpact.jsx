import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/ui/StatsCard';
import ImpactChart from '../components/ui/ImpactChart';
import DataMap from '../components/ui/DataMap';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SearchBar from '../components/ui/SearchBar';
import Tabs from '../components/ui/Tabs';

const GlobalImpact = () => {
  // Mock data
  const statsData = [
    { title: "Total Donations", value: "₹2.4M", description: "Funds distributed to verified NGOs", trend: 12.5 },
    { title: "Active Campaigns", value: "42", description: "Ongoing relief efforts", trend: 5.2 },
    { title: "Verified NGOs", value: "128", description: "Trusted partners worldwide", trend: 8.1 },
    { title: "Beneficiaries", value: "125K", description: "People helped this year", trend: 15.3 }
  ];

  const chartData = [
    { label: "Jan", value: 42 },
    { label: "Feb", value: 38 },
    { label: "Mar", value: 55 },
    { label: "Apr", value: 67 },
    { label: "May", value: 89 },
    { label: "Jun", value: 78 }
  ];

  const locations = [
    { name: "Kerala Floods", x: 70, y: 60 },
    { name: "Assam Floods", x: 72, y: 55 },
    { name: "Uttarakhand", x: 75, y: 45 },
    { name: "Chennai", x: 80, y: 70 }
  ];

  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  const tabs = [
    {
      title: "Overview",
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <ImpactChart title="Monthly Impact Growth" data={chartData} />
            <DataMap title="Global Relief Efforts" locations={locations} />
          </div>
          
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How We Ensure Transparency</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Blockchain Verification</h3>
                <p className="text-gray-600 dark:text-gray-300">All transactions are recorded on the Algorand blockchain for immutable proof.</p>
              </div>
              
              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Multi-Source Verification</h3>
                <p className="text-gray-600 dark:text-gray-300">NGO reports, satellite imagery, and IoT sensors validate impact claims.</p>
              </div>
              
              <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Community Oversight</h3>
                <p className="text-gray-600 dark:text-gray-300">DAO governance allows donors to vote on fund allocation and campaign priorities.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Campaigns",
      count: 42,
      content: (
        <div>
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} placeholder="Search campaigns..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Campaign {item}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Description of the campaign and its impact goals.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">₹250K raised</span>
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-lg text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "NGOs",
      count: 128,
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Kerala Relief Foundation", campaigns: 12 },
              { name: "Assam Humanitarian Aid", campaigns: 8 },
              { name: "Mountain Development Trust", campaigns: 15 },
              { name: "Tamil Nadu Water Initiative", campaigns: 6 }
            ].map((ngo, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold mx-auto mb-4">
                  {ngo.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{ngo.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{ngo.campaigns} active campaigns</p>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg text-sm hover:from-blue-700 hover:to-indigo-800 transition-all">
                  Partner
                </button>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <Breadcrumbs />
      
      <div className="mb-8">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4"
        >
          Global Impact Dashboard
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
        >
          Real-time visualization of humanitarian impact across the globe. Transparent, verifiable, and data-driven relief efforts.
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

      {/* Tabs */}
      <Tabs tabs={tabs} />
    </motion.div>
  );
};

export default GlobalImpact;