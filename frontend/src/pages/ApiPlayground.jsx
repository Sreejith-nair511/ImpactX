import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/ui/StatsCard';
import Breadcrumbs from '../components/ui/Breadcrumbs';

const ApiPlayground = () => {
  // Mock data
  const statsData = [
    { title: "API Calls Today", value: "12.4K", description: "Requests processed", trend: 8 },
    { title: "Active Developers", value: "1,248", description: "Building with our API", trend: 15 },
    { title: "Uptime", value: "99.98%", description: "Service reliability", trend: 0.1 },
    { title: "Documentation Views", value: "42.7K", description: "This month", trend: 12 }
  ];

  const apiEndpoints = [
    {
      method: "GET",
      path: "/api/v1/campaigns",
      description: "Retrieve a list of active humanitarian campaigns",
      category: "Campaigns"
    },
    {
      method: "POST",
      path: "/api/v1/donations",
      description: "Create a new donation transaction",
      category: "Donations"
    },
    {
      method: "GET",
      path: "/api/v1/impact/data",
      description: "Access verified impact data and metrics",
      category: "Impact"
    },
    {
      method: "GET",
      path: "/api/v1/ngos",
      description: "List verified NGO partners and their projects",
      category: "NGOs"
    },
    {
      method: "POST",
      path: "/api/v1/verification",
      description: "Submit data for AI-powered verification",
      category: "Verification"
    },
    {
      method: "GET",
      path: "/api/v1/reports",
      description: "Generate transparency reports and analytics",
      category: "Reporting"
    }
  ];

  const [activeEndpoint, setActiveEndpoint] = useState(apiEndpoints[0]);
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');

  const handleEndpointSelect = (endpoint) => {
    setActiveEndpoint(endpoint);
    setRequestBody('');
    setResponse('');
  };

  const handleExecute = () => {
    // Mock API response
    const mockResponses = {
      "GET/api/v1/campaigns": `{
  "status": "success",
  "data": [
    {
      "id": "CAMPAIGN-001",
      "name": "Kerala Flood Relief",
      "description": "Emergency response for flood-affected communities",
      "target_amount": 5000000,
      "raised_amount": 3250000,
      "active": true,
      "start_date": "2025-10-01",
      "end_date": "2025-12-31"
    },
    {
      "id": "CAMPAIGN-002",
      "name": "Assam Education Initiative",
      "description": "Building schools and training teachers",
      "target_amount": 2500000,
      "raised_amount": 1875000,
      "active": true,
      "start_date": "2025-09-15",
      "end_date": "2026-03-15"
    }
  ],
  "count": 2
}`,
      "POST/api/v1/donations": `{
  "status": "success",
  "data": {
    "transaction_id": "TX-20251031-001",
    "amount": 5000,
    "currency": "INR",
    "donor_id": "DONOR-12345",
    "campaign_id": "CAMPAIGN-001",
    "timestamp": "2025-10-31T14:30:00Z",
    "blockchain_hash": "0x7f8a9b4c2e1d5f6a8b3c0d9e7f1a4b6c8d2e5f9a0b3c7d1e4f8a6b9c0d5e3f7"
  }
}`,
      "GET/api/v1/impact/data": `{
  "status": "success",
  "data": {
    "campaign_id": "CAMPAIGN-001",
    "beneficiaries": 12500,
    "funds_utilized": 3125000,
    "verification_score": 98.7,
    "last_updated": "2025-10-30T09:15:00Z",
    "metrics": {
      "shelter_provided": 3200,
      "food_distributed": 25000,
      "medical_assistance": 4500,
      "children_educated": 0
    }
  }
}`,
      "GET/api/v1/ngos": `{
  "status": "success",
  "data": [
    {
      "id": "NGO-001",
      "name": "Kerala Relief Foundation",
      "verified": true,
      "projects_count": 12,
      "funds_managed": 15000000,
      "verification_score": 99.2
    },
    {
      "id": "NGO-002",
      "name": "Assam Humanitarian Aid",
      "verified": true,
      "projects_count": 8,
      "funds_managed": 8500000,
      "verification_score": 97.8
    }
  ],
  "count": 2
}`,
      "POST/api/v1/verification": `{
  "status": "processing",
  "request_id": "VERIFY-20251031-001",
  "estimated_completion": "2025-10-31T15:00:00Z",
  "verification_tier": "premium"
}`,
      "GET/api/v1/reports": `{
  "status": "success",
  "data": {
    "report_id": "REPORT-2025-Q3",
    "period": "2025-Q3",
    "total_funds": 42750000,
    "total_beneficiaries": 156000,
    "verification_rate": 98.7,
    "top_campaigns": [
      {
        "name": "Kerala Flood Relief",
        "funds": 12500000,
        "beneficiaries": 42000
      },
      {
        "name": "Assam Education Initiative",
        "funds": 8750000,
        "beneficiaries": 28000
      }
    ]
  }
}`
    };

    const key = `${activeEndpoint.method}${activeEndpoint.path}`;
    setResponse(mockResponses[key] || '{\n  "status": "success"\n}');
  };

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
          API Playground
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
        >
          Explore and test our transparent, blockchain-verified API for humanitarian data and operations.
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              }
            />
          </motion.div>
        ))}
      </div>

      {/* API Documentation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">API Endpoints</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Browse our available API endpoints and test them directly in the playground.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Available Endpoints</h3>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-96 overflow-y-auto">
                {apiEndpoints.map((endpoint, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index + 0.4 }}
                    onClick={() => handleEndpointSelect(endpoint)}
                    className={`p-4 cursor-pointer transition-colors ${
                      activeEndpoint === endpoint 
                        ? 'bg-blue-50 dark:bg-blue-900/20' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium mr-2 ${
                        endpoint.method === 'GET' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      }`}>
                        {endpoint.method}
                      </span>
                      <span className="text-sm font-mono text-gray-900 dark:text-white">{endpoint.path}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{endpoint.description}</p>
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400">
                      {endpoint.category}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 h-full">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium mr-2 ${
                    activeEndpoint.method === 'GET' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {activeEndpoint.method}
                  </span>
                  <span className="font-mono text-gray-900 dark:text-white">{activeEndpoint.path}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{activeEndpoint.description}</p>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Request Body</h3>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="w-full h-32 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-mono text-gray-900 dark:text-white"
                  placeholder={`{
  // Enter your request body here
}`}
                ></textarea>
                
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Authentication</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">API Key required in Authorization header</p>
                  </div>
                  <button 
                    onClick={handleExecute}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg text-sm hover:from-blue-700 hover:to-indigo-800 transition-all"
                  >
                    Execute Request
                  </button>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Response</h3>
                <pre className="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 text-green-400 text-sm font-mono overflow-x-auto max-h-64">
                  {response || '// Response will appear here after execution'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* API Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">API Features</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Blockchain Verification</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">All data is immutably recorded on the Algorand blockchain for complete transparency.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Real-time Data</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Access live updates on campaigns, donations, and verified impact metrics.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Secure Authentication</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Enterprise-grade security with API key authentication and rate limiting.</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Getting Started</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Integrate our API into your applications with these simple steps.
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">1. Obtain API Credentials</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Sign up for an API key through your developer dashboard.
              </p>
              <button className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-lg text-sm">
                Get API Key
              </button>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">2. Make Your First Request</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Use any HTTP client to access our endpoints with your API key.
              </p>
              <pre className="bg-gray-800 dark:bg-gray-900 rounded-lg p-3 text-green-400 text-xs font-mono overflow-x-auto">
                {`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.impactx.org/v1/campaigns`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">3. Explore Documentation</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Comprehensive guides and examples for all endpoints.
              </p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  API Reference
                </button>
                <button className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Code Examples
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Rate Limits & Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">API Plans & Rate Limits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Starter</h3>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Free</div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                1,000 requests/day
              </li>
              <li className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Basic endpoints
              </li>
              <li className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Community support
              </li>
            </ul>
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              Get Started
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-500 relative p-6">
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg">
              Most Popular
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Professional</h3>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">₹4,999<span className="text-lg">/month</span></div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                50,000 requests/day
              </li>
              <li className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                All endpoints
              </li>
              <li className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Priority support
              </li>
              <li className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Webhook integration
              </li>
            </ul>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg text-sm hover:from-blue-700 hover:to-indigo-800 transition-all">
              Start Free Trial
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Enterprise</h3>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Custom</div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited requests
              </li>
              <li className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Custom endpoints
              </li>
              <li className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Dedicated support
              </li>
              <li className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                SLA guarantee
              </li>
            </ul>
            <button className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ApiPlayground;