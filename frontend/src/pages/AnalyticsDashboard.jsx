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
import AnalyticsCard from '../components/ui/AnalyticsCard';
import ImpactChart from '../components/ui/ImpactChart';
import DataMap from '../components/ui/DataMap';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { getPlatformMetrics, getImpactData, getGeographicData } from '../services/analyticsService';
import { formatNumber, formatCurrency } from '../utils/dataFormatter';

const AnalyticsDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [impactData, setImpactData] = useState([]);
  const [geoData, setGeoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsData, impactData, geoData] = await Promise.all([
          getPlatformMetrics(),
          getImpactData(),
          getGeographicData()
        ]);
        
        setMetrics(metricsData);
        setImpactData(impactData);
        setGeoData(geoData);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const analyticsCards = metrics ? [
    {
      title: 'Total Donations',
      value: metrics.totalDonations,
      change: 12.5,
      icon: CurrencyDollarIcon,
      format: 'currency'
    },
    {
      title: 'Active Projects',
      value: metrics.activeProjects,
      change: 8.2,
      icon: ChartBarIcon,
      format: 'number'
    },
    {
      title: 'Verified Impact',
      value: metrics.verifiedImpact,
      change: 2.1,
      icon: ArrowTrendingUpIcon,
      format: 'percentage'
    },
    {
      title: 'Global Donors',
      value: metrics.donorCount,
      change: 15.7,
      icon: UserGroupIcon,
      format: 'number'
    }
  ] : [];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          paths={[
            { name: 'Home', path: '/' },
            { name: 'Analytics', path: '/analytics' }
          ]} 
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">
            Real-time insights into platform performance and humanitarian impact
          </p>
        </motion.div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <AnalyticsCard key={index} isLoading={true} />
            ))
          ) : (
            analyticsCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AnalyticsCard {...card} />
              </motion.div>
            ))
          )}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Impact Over Time</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-indigo-600 rounded-lg">Donations</button>
                <button className="px-3 py-1 text-sm bg-gray-700 rounded-lg">Impact</button>
              </div>
            </div>
            <ImpactChart data={impactData} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Global Distribution</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-indigo-600 rounded-lg">Projects</button>
                <button className="px-3 py-1 text-sm bg-gray-700 rounded-lg">Donations</button>
              </div>
            </div>
            <DataMap data={geoData} />
          </motion.div>
        </div>

        {/* Additional Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-800 rounded-xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold mb-6">Platform Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-500/10 rounded-lg mr-4">
                  <GlobeAltIcon className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Countries Reached</p>
                  <p className="text-2xl font-bold">{loading ? '--' : metrics?.countriesReached}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-500/10 rounded-lg mr-4">
                  <UserGroupIcon className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">NGO Partners</p>
                  <p className="text-2xl font-bold">{loading ? '--' : metrics?.ngoPartners}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-500/10 rounded-lg mr-4">
                  <ClockIcon className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Last Updated</p>
                  <p className="text-lg font-bold">
                    {loading ? '--' : new Date(metrics?.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;