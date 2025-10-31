import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowTrendingUpIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  GlobeAltIcon,
  ChartBarIcon,
  MapIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import DataTable from '../components/ui/DataTable';
import Tabs from '../components/ui/Tabs';
import { useDataFetch } from '../hooks/useDataFetch';
import { formatCurrency, formatNumber, formatDate } from '../utils/dataFormatter';

const DetailedAnalytics = () => {
  // Mock data for demonstration
  const [donationData] = useState([
    { id: 1, donor: 'John Smith', amount: 5000, date: '2023-06-15', project: 'School Construction', status: 'Completed' },
    { id: 2, donor: 'Sarah Johnson', amount: 2500, date: '2023-06-18', project: 'Water Wells', status: 'Completed' },
    { id: 3, donor: 'Tech Corp Foundation', amount: 15000, date: '2023-06-20', project: 'Medical Camps', status: 'Processing' },
    { id: 4, donor: 'Maria Garcia', amount: 1000, date: '2023-06-22', project: 'Food Distribution', status: 'Completed' },
    { id: 5, donor: 'Global Aid Network', amount: 25000, date: '2023-06-25', project: 'Disaster Relief', status: 'Pending' },
    { id: 6, donor: 'Robert Wilson', amount: 750, date: '2023-06-28', project: 'Educational Kits', status: 'Completed' },
    { id: 7, donor: 'Green Earth Initiative', amount: 8000, date: '2023-07-01', project: 'Reforestation', status: 'Processing' },
    { id: 8, donor: 'Emma Thompson', amount: 3000, date: '2023-07-03', project: 'Solar Panels', status: 'Completed' },
  ]);

  const [projectData] = useState([
    { id: 1, name: 'School Construction', location: 'Rural Kenya', budget: 50000, spent: 35000, progress: 70, donors: 42 },
    { id: 2, name: 'Water Wells', location: 'Desert Region, India', budget: 30000, spent: 28000, progress: 93, donors: 28 },
    { id: 3, name: 'Medical Camps', location: 'Amazon Basin, Brazil', budget: 45000, spent: 15000, progress: 33, donors: 15 },
    { id: 4, name: 'Food Distribution', location: 'Urban Slums, Philippines', budget: 20000, spent: 18000, progress: 90, donors: 37 },
    { id: 5, name: 'Disaster Relief', location: 'Coastal Region, Indonesia', budget: 100000, spent: 25000, progress: 25, donors: 8 },
  ]);

  const donationColumns = [
    { key: 'id', label: 'ID' },
    { key: 'donor', label: 'Donor' },
    { key: 'amount', label: 'Amount', render: (value) => formatCurrency(value) },
    { key: 'date', label: 'Date', render: (value) => formatDate(value) },
    { key: 'project', label: 'Project' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Completed' ? 'bg-green-500/20 text-green-400' :
          value === 'Processing' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-blue-500/20 text-blue-400'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const projectColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Project Name' },
    { key: 'location', label: 'Location' },
    { key: 'budget', label: 'Budget', render: (value) => formatCurrency(value) },
    { key: 'spent', label: 'Spent', render: (value) => formatCurrency(value) },
    { 
      key: 'progress', 
      label: 'Progress',
      render: (value) => (
        <div className="flex items-center">
          <div className="w-24 bg-gray-700 rounded-full h-2 mr-2">
            <div 
              className="bg-indigo-500 h-2 rounded-full" 
              style={{ width: `${value}%` }}
            ></div>
          </div>
          <span>{value}%</span>
        </div>
      )
    },
    { key: 'donors', label: 'Donors', render: (value) => formatNumber(value) }
  ];

  const tabs = [
    { id: 'donations', label: 'Donation Records' },
    { id: 'projects', label: 'Project Tracking' },
    { id: 'impact', label: 'Impact Metrics' }
  ];

  const [activeTab, setActiveTab] = useState('donations');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          paths={[
            { name: 'Home', path: '/' },
            { name: 'Analytics', path: '/analytics' },
            { name: 'Detailed Analytics', path: '/analytics/detailed' }
          ]} 
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Detailed Analytics</h1>
          <p className="text-gray-400">
            Comprehensive view of donations, projects, and impact metrics
          </p>
        </motion.div>

        <div className="mb-8">
          <Tabs 
            tabs={tabs} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'donations' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Donation Records</h2>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                    Export CSV
                  </button>
                </div>
              </div>
              <DataTable 
                data={donationData} 
                columns={donationColumns} 
                searchable={true} 
                sortable={true} 
                pagination={true} 
              />
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Project Tracking</h2>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                    Export Report
                  </button>
                </div>
              </div>
              <DataTable 
                data={projectData} 
                columns={projectColumns} 
                searchable={true} 
                sortable={true} 
                pagination={true} 
              />
            </div>
          )}

          {activeTab === 'impact' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Impact Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">People Helped</h3>
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <UserGroupIcon className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mt-4">12,458</p>
                  <p className="text-green-400 text-sm mt-2">↑ 12.5% from last month</p>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Projects Completed</h3>
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <ChartBarIcon className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mt-4">42</p>
                  <p className="text-green-400 text-sm mt-2">↑ 8.2% from last month</p>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Funds Distributed</h3>
                    <div className="p-3 bg-purple-500/10 rounded-lg">
                      <CurrencyDollarIcon className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mt-4">$1.2M</p>
                  <p className="text-green-400 text-sm mt-2">↑ 15.7% from last month</p>
                </div>
              </div>

              <div className="mt-8 bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Impact by Region</h3>
                <div className="space-y-4">
                  {[
                    { region: 'Africa', impact: 35, projects: 18 },
                    { region: 'Asia', impact: 42, projects: 22 },
                    { region: 'South America', impact: 15, projects: 8 },
                    { region: 'Other', impact: 8, projects: 4 }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{item.region}</span>
                        <span className="text-white">{item.impact}% ({item.projects} projects)</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-indigo-500 h-2 rounded-full" 
                          style={{ width: `${item.impact}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DetailedAnalytics;