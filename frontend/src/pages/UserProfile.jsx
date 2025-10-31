import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserCircleIcon, 
  MapPinIcon, 
  CalendarIcon, 
  CurrencyDollarIcon,
  HeartIcon,
  ChartBarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import StatsCard from '../components/ui/StatsCard';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'Total Donations', value: '$12,450', change: '+12%', icon: CurrencyDollarIcon },
    { title: 'Projects Supported', value: '24', change: '+3', icon: HeartIcon },
    { title: 'Impact Score', value: '8.7/10', change: '+0.3', icon: ChartBarIcon },
    { title: 'Achievements', value: '12', change: '+2', icon: TrophyIcon }
  ];

  const donationHistory = [
    { project: 'School Construction', amount: '$2,500', date: '2023-06-15', status: 'Completed' },
    { project: 'Water Wells', amount: '$1,200', date: '2023-06-10', status: 'Completed' },
    { project: 'Medical Camps', amount: '$3,000', date: '2023-06-05', status: 'Processing' },
    { project: 'Food Distribution', amount: '$800', date: '2023-05-28', status: 'Completed' },
    { project: 'Disaster Relief', amount: '$4,950', date: '2023-05-20', status: 'Completed' }
  ];

  const achievements = [
    { title: 'First Donation', description: 'Made your first donation', date: '2023-05-20', icon: HeartIcon },
    { title: 'Supporter', description: 'Supported 5 projects', date: '2023-05-25', icon: TrophyIcon },
    { title: 'Impact Maker', description: 'Donated over $5,000', date: '2023-06-01', icon: ChartBarIcon },
    { title: 'Champion', description: 'Supported 10 projects', date: '2023-06-10', icon: TrophyIcon },
    { title: 'Humanitarian Hero', description: 'Donated over $10,000', date: '2023-06-15', icon: HeartIcon }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'donations', label: 'Donation History' },
    { id: 'achievements', label: 'Achievements' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          paths={[
            { name: 'Home', path: '/' },
            { name: 'Profile', path: '/profile' }
          ]} 
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <UserCircleIcon className="h-24 w-24 text-white" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">John Doe</h1>
              <p className="text-gray-400 mb-2">Impact Donor since May 2023</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1 text-gray-500" />
                  <span>New York, USA</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                  <span>Member since May 20, 2023</span>
                </div>
              </div>
            </div>
            <div className="ml-auto">
              <button className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex border-b border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'text-indigo-400 border-b-2 border-indigo-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {donationHistory.slice(0, 3).map((donation, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                        <div>
                          <p className="font-medium">{donation.project}</p>
                          <p className="text-sm text-gray-400">{donation.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{donation.amount}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            donation.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                            donation.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {donation.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm">
                    View all donations →
                  </button>
                </div>
              </div>
              
              <div>
                <div className="bg-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4">Top Projects</h2>
                  <div className="space-y-4">
                    {[
                      { name: 'School Construction', progress: 85, impact: 'Education' },
                      { name: 'Water Wells', progress: 92, impact: 'Health' },
                      { name: 'Disaster Relief', progress: 65, impact: 'Emergency' }
                    ].map((project, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{project.name}</span>
                          <span className="text-sm text-gray-400">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-indigo-500 h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{project.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'donations' && (
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {donationHistory.map((donation, index) => (
                    <tr key={index} className="hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{donation.project}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{donation.amount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                        {donation.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          donation.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                          donation.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {donation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-800 rounded-xl p-6 flex items-start"
                >
                  <div className="p-3 bg-indigo-500/10 rounded-lg mr-4">
                    <achievement.icon className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{achievement.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{achievement.description}</p>
                    <p className="text-xs text-gray-500">{achievement.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;