import React from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/ui/StatsCard';

const About = () => {
  // Mock data
  const statsData = [
    { title: "Years Active", value: "3", description: "Since our founding in 2023", trend: null },
    { title: "Countries Served", value: "12", description: "Global humanitarian reach", trend: 5 },
    { title: "Total Donations", value: "₹142M", description: "Funds processed transparently", trend: 25 },
    { title: "Lives Impacted", value: "2.4M", description: "People helped through our platform", trend: 32 }
  ];

  const teamMembers = [
    {
      name: "Goodwell Sreejith S",
      role: "Co-Founder & CEO",
      bio: "Blockchain expert with a passion for humanitarian technology. Leading ImpactX's mission to create transparent aid systems.",
      avatar: "GS"
    },
    {
      name: "Vasudha",
      role: "Co-Founder & CTO",
      bio: "Former tech lead at major fintech companies. Driving innovation in humanitarian data systems and verification.",
      avatar: "V"
    },
    {
      name: "Nikhil",
      role: "Co-Founder & Head of Product",
      bio: "UX specialist focused on making humanitarian technology accessible to all users regardless of technical expertise.",
      avatar: "N"
    }
  ];

  const values = [
    {
      title: "Transparency",
      description: "Every transaction and decision is publicly verifiable on the blockchain",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: "Accountability",
      description: "We are responsible for the impact of our actions and measure what matters",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Innovation",
      description: "We embrace technology to solve humanitarian challenges more effectively",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Collaboration",
      description: "We work with diverse stakeholders to maximize humanitarian impact",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const milestones = [
    { year: "2023", event: "Company founded with mission to create transparent humanitarian aid" },
    { year: "2023", event: "First blockchain-based escrow contracts deployed on Algorand" },
    { year: "2024", event: "Platform launched with initial NGO partners in India" },
    { year: "2024", event: "Reached ₹50M in transparent donations processed" },
    { year: "2025", event: "Expanded to 8 countries with local language support" },
    { year: "2025", event: "Launched AI-powered verification engine" }
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
          About ImpactX
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
        >
          Creating transparent, accountable, and effective humanitarian aid through blockchain technology and data science.
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

      {/* Mission Statement */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              To leverage blockchain technology and data science to create transparent, accountable, and effective humanitarian aid systems that empower communities and protect human dignity.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We believe that technology can transform humanitarian work by ensuring that every donation reaches its intended beneficiaries and that every impact is measurable and verifiable.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm">
                Blockchain Technology
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-sm">
                Data Science
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 rounded-full text-sm">
                AI Verification
              </span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 rounded-full text-sm">
                Global Impact
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                <div className="text-5xl font-bold text-white">₹</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Core Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Leadership Team</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="text-center"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6">
                {member.avatar}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-3">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Company Milestones */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Journey</h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900/50 transform translate-x-1/2"></div>
          
          <div className="space-y-12 pl-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="relative"
              >
                <div className="absolute -left-12 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {milestone.year}
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;