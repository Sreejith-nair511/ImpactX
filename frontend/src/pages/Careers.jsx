import React from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/ui/StatsCard';

const Careers = () => {
  // Mock data
  const statsData = [
    { title: "Team Members", value: "42", description: "Dedicated professionals worldwide", trend: 5 },
    { title: "Office Locations", value: "5", description: "Global presence", trend: 1 },
    { title: "Employee Satisfaction", value: "4.8/5", description: "Based on internal surveys", trend: 0.2 },
    { title: "Diversity Index", value: "87%", description: "Of team from underrepresented groups", trend: 3 }
  ];

  const departments = [
    {
      title: "Engineering",
      description: "Build the technology that powers transparent humanitarian aid",
      openPositions: 8,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Product & Design",
      description: "Create intuitive experiences for donors, NGOs, and beneficiaries",
      openPositions: 5,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: "Humanitarian Programs",
      description: "Design and manage programs that create real-world impact",
      openPositions: 3,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Operations & Partnerships",
      description: "Manage relationships and ensure smooth platform operations",
      openPositions: 4,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    }
  ];

  const openPositions = [
    {
      title: "Senior Blockchain Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "5+ years",
      description: "Lead the development of our blockchain infrastructure and smart contracts."
    },
    {
      title: "Product Designer",
      department: "Product & Design",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "3+ years",
      description: "Design intuitive user experiences for our humanitarian platform."
    },
    {
      title: "Impact Measurement Specialist",
      department: "Humanitarian Programs",
      location: "Remote",
      type: "Full-time",
      experience: "4+ years",
      description: "Develop frameworks for measuring and verifying humanitarian impact."
    },
    {
      title: "Partnership Manager",
      department: "Operations & Partnerships",
      location: "New York, USA",
      type: "Full-time",
      experience: "5+ years",
      description: "Build and maintain relationships with NGO partners and stakeholders."
    },
    {
      title: "Data Scientist",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Apply machine learning to improve fraud detection and impact prediction."
    }
  ];

  const benefits = [
    {
      title: "Mission-Driven Work",
      description: "Contribute to technology that creates measurable humanitarian impact",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Competitive Compensation",
      description: "Market-rate salaries with equity participation for all employees",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Flexible Work",
      description: "Remote work options and flexible schedules to support work-life balance",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Professional Growth",
      description: "Learning budget, conferences, and mentorship opportunities",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
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
      <div className="mb-12 text-center">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4"
        >
          Join Our Team
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
        >
          Help us build technology that creates transparent, accountable, and effective humanitarian aid.
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

      {/* Company Culture */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Culture</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Mission-First Mindset</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're building technology that directly impacts humanitarian outcomes. Every line of code, every design decision, 
              and every partnership we forge contributes to creating a more transparent and accountable aid ecosystem.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Collaborative Environment</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We believe the best solutions emerge from diverse perspectives working together. Our team includes engineers, 
              humanitarian experts, designers, and data scientists who collaborate closely on every project.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center p-6">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">🤝</div>
                  <p className="font-semibold">Diverse & Inclusive Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Departments */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Teams</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((department, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                  {department.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{department.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{department.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{department.openPositions} open positions</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Open Positions</h2>
        
        <div className="space-y-6">
          {openPositions.map((position, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{position.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{position.department} • {position.experience}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded-full">
                    {position.location}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs rounded-full">
                    {position.type}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{position.description}</p>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300">
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Employee Benefits */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Employee Benefits</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Careers;