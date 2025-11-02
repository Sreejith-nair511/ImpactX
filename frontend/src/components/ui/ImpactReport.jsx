import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnalyticsCard from './AnalyticsCard';
import ImpactChart from './ImpactChart';
import DataMap from './DataMap';
import LoadingSpinner from './LoadingSpinner';
import * as analyticsService from '../../services/analyticsService';

const ImpactReport = ({ projectId, userId, className = '' }) => {
  const [reportData, setReportData] = useState(null);
  const [impactData, setImpactData] = useState(null);
  const [geographicData, setGeographicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('monthly');

  // Fetch report data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [metrics, impact, geographic] = await Promise.all([
          analyticsService.getPlatformMetrics(),
          analyticsService.getImpactData(),
          analyticsService.getGeographicData()
        ]);
        
        setReportData(metrics);
        setImpactData(impact);
        setGeographicData(geographic);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load report data');
        console.error('Error fetching report data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId, userId, timeRange]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  // Format number
  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-IN').format(value);
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-96 ${className}`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-xl p-6 text-center ${className}`}>
        <div className="text-red-600 dark:text-red-400 font-medium mb-2">
          Error loading impact report
        </div>
        <div className="text-red-500 dark:text-red-300 text-sm mb-4">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Impact Report
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Comprehensive analysis of your impact and performance
            </p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-gray-700 dark:text-gray-300 mr-3 text-sm">
              Time Range:
            </span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            
            <button className="ml-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Report
            </button>
          </div>
        </div>
        
        {/* Report Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnalyticsCard
            title="Total Funds Raised"
            value={reportData ? formatCurrency(reportData.totalDonations) : '₹0'}
            description="Funds collected for impact projects"
            change={12.5}
            format="currency"
          />
          
          <AnalyticsCard
            title="Projects Impacted"
            value={reportData ? formatNumber(reportData.activeProjects) : '0'}
            description="Active projects making a difference"
            change={5.2}
            format="number"
          />
          
          <AnalyticsCard
            title="Verification Rate"
            value={reportData ? formatPercentage(reportData.verifiedImpact) : '0%'}
            description="Transparency and accountability rating"
            change={2.1}
            format="percentage"
          />
          
          <AnalyticsCard
            title="Global Reach"
            value={reportData ? formatNumber(reportData.countriesReached) : '0'}
            description="Countries benefiting from projects"
            change={8.7}
            format="number"
          />
        </div>
      </div>
      
      {/* Impact Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Impact Over Time Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Impact Growth Over Time
          </h2>
          {impactData && (
            <ImpactChart 
              title="Monthly Impact Trends" 
              data={impactData.map(item => ({
                label: item.month,
                value: item.impact
              }))}
            />
          )}
        </div>
        
        {/* Geographic Impact Map */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Geographic Impact Distribution
          </h2>
          {geographicData && (
            <DataMap 
              title="Global Impact Reach" 
              locations={geographicData.map((item, index) => ({
                name: item.country,
                x: 20 + (index * 20),
                y: 30 + (index * 15),
                impact: item.impact
              }))}
            />
          )}
        </div>
      </div>
      
      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Donor Engagement */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Donor Engagement
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Total Donors
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {reportData ? formatNumber(reportData.donorCount) : '0'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: '75%' }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Repeat Donors
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  68%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: '68%' }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Average Donation
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {reportData ? formatCurrency(reportData.totalDonations / reportData.donorCount) : '₹0'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: '82%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Project Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Project Performance
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  On Track
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Meeting milestones
                </p>
              </div>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                85%
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Needs Attention
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Require intervention
                </p>
              </div>
              <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                12%
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  At Risk
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Potential delays
                </p>
              </div>
              <span className="text-lg font-bold text-red-600 dark:text-red-400">
                3%
              </span>
            </div>
          </div>
        </div>
        
        {/* Partnership Impact */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Partnership Impact
          </h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mr-3">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">NGO</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  NGO Partners
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {reportData ? formatNumber(reportData.ngoPartners) : '0'} active partnerships
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600 dark:text-green-400 font-bold">CORP</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Corporate Sponsors
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  24 active sponsorships
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600 dark:text-purple-400 font-bold">GOV</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Government Support
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  8 active collaborations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recommendations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Actionable Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/30">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-blue-800 dark:text-blue-200">
                  Increase Donor Engagement
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Consider implementing a donor recognition program to increase repeat donations by an estimated 15%.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900/30">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-green-800 dark:text-green-200">
                  Expand Geographic Reach
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  Target 3 new countries for expansion to increase global impact by approximately 25%.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-900/30">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-purple-800 dark:text-purple-200">
                  Strengthen Partnerships
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                  Develop 2 new corporate partnerships to diversify funding sources and increase sustainability.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-900/30">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200">
                  Improve Verification Process
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  Streamline documentation requirements to increase verification rate by 8-10 percentage points.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactReport;