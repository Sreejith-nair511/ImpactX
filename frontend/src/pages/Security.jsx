import React from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/ui/StatsCard';

const Security = () => {
  // Mock data
  const statsData = [
    { title: "Security Score", value: "98.7%", description: "Overall platform security rating", trend: 1.2 },
    { title: "Audits Completed", value: "12", description: "Third-party security audits", trend: 3 },
    { title: "Vulnerabilities Fixed", value: "100%", description: "Critical issues resolved", trend: null },
    { title: "Compliance", value: "SOC 2 Type II", description: "Security compliance certification", trend: null }
  ];

  const securityMeasures = [
    {
      title: "End-to-End Encryption",
      description: "All data transmission and storage encrypted with industry-standard protocols",
      status: "Active",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "Multi-Factor Authentication",
      description: "Enhanced account security with MFA for all user roles",
      status: "Active",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Regular Security Audits",
      description: "Comprehensive third-party audits conducted quarterly",
      status: "Active",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Zero-Knowledge Architecture",
      description: "Sensitive data processed without exposing underlying information",
      status: "Active",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      )
    }
  ];

  const complianceStandards = [
    {
      title: "SOC 2 Type II",
      description: "Security, availability, and confidentiality compliance",
      status: "Certified",
      validity: "Valid until 2026-12-31"
    },
    {
      title: "GDPR",
      description: "General Data Protection Regulation compliance",
      status: "Compliant",
      validity: "Ongoing"
    },
    {
      title: "ISO 27001",
      description: "Information security management systems",
      status: "In Progress",
      validity: "Expected Q2 2026"
    }
  ];

  const recentIncidents = [
    {
      date: "2025-10-15",
      type: "Attempted Brute Force",
      severity: "Low",
      resolution: "Blocked IP address and notified user"
    },
    {
      date: "2025-09-22",
      type: "Phishing Attempt",
      severity: "Medium",
      resolution: "User education and email filtering enhancement"
    },
    {
      date: "2025-08-30",
      type: "Unusual Login Pattern",
      severity: "Low",
      resolution: "Additional verification required for similar attempts"
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
          Platform Security
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
        >
          Enterprise-grade security protecting donor funds, personal data, and platform integrity.
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

      {/* Security Measures */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Security Measures</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityMeasures.map((measure, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                  {measure.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{measure.title}</h3>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      {measure.status}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{measure.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Compliance & Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Compliance & Certifications</h2>
          
          <div className="space-y-4">
            {complianceStandards.map((standard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{standard.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{standard.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    standard.status === 'Certified' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : standard.status === 'Compliant' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  }`}>
                    {standard.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{standard.validity}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Recent Security Incidents */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Security Events</h2>
          
          <div className="space-y-4">
            {recentIncidents.map((incident, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{incident.type}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{incident.date}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    incident.severity === 'Low' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : incident.severity === 'Medium' 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {incident.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{incident.resolution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Resources */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Security Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Security Whitepaper</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Detailed technical documentation of our security architecture.</p>
            <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
              Download PDF
            </button>
          </div>
          
          <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Bug Bounty Program</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Report vulnerabilities and earn rewards for helping us improve.</p>
            <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
              Learn More
            </button>
          </div>
          
          <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Security Training</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Educational resources for users to protect their accounts.</p>
            <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
              Access Training
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Security;