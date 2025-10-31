import React from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/ui/StatsCard';
import Breadcrumbs from '../components/ui/Breadcrumbs';

const Volunteers = () => {
  // Mock data
  const statsData = [
    { title: "Active Volunteers", value: "8.7K", description: "Community contributors", trend: 15 },
    { title: "Volunteer Hours", value: "42.7K", description: "This month", trend: 12 },
    { title: "Projects Supported", value: "156", description: "Initiatives with volunteer help", trend: 8 },
    { title: "Skills Matched", value: "94%", description: "Efficient skill utilization", trend: 3 }
  ];

  const volunteerOpportunities = [
    {
      title: "Disaster Response Coordination",
      description: "Help coordinate relief efforts during emergency situations",
      skills: ["Communication", "Organization", "Crisis Management"],
      commitment: "Flexible",
      location: "Remote/On-site"
    },
    {
      title: "Data Verification Specialist",
      description: "Verify impact data and reports from field operations",
      skills: ["Data Analysis", "Attention to Detail", "Research"],
      commitment: "2-5 hours/week",
      location: "Remote"
    },
    {
      title: "Community Outreach Ambassador",
      description: "Engage with local communities and raise awareness",
      skills: ["Public Speaking", "Community Engagement", "Multilingual"],
      commitment: "3-7 hours/week",
      location: "On-site"
    },
    {
      title: "Technical Support Volunteer",
      description: "Provide IT and technical assistance for platform operations",
      skills: ["Software", "Troubleshooting", "Training"],
      commitment: "5-10 hours/week",
      location: "Remote"
    }
  ];

  const volunteerBenefits = [
    {
      title: "Skill Development",
      description: "Gain valuable experience in humanitarian work and technology",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Global Network",
      description: "Connect with changemakers and experts worldwide",
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Impact Recognition",
      description: "Earn badges and certificates for your contributions",
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Professional Growth",
      description: "Build your resume with meaningful experience",
      icon: (
        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
      <Breadcrumbs />
      
      <div className="mb-12 text-center">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4"
        >
          Volunteer Opportunities
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
        >
          Make a meaningful difference by contributing your skills and time to humanitarian causes around the world.
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
          </motion.div>
        ))}
      </div>

      {/* Volunteer Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Volunteer With Us?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Join our community of changemakers and gain valuable experience while making a real impact.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {volunteerBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.4 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Volunteer Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Current Opportunities</h2>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg text-sm hover:from-blue-700 hover:to-indigo-800 transition-all">
            View All Opportunities
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {volunteerOpportunities.map((opportunity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{opportunity.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{opportunity.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {opportunity.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex} 
                      className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Time Commitment</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{opportunity.commitment}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Location</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{opportunity.location}</p>
                </div>
              </div>
              
              <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg text-sm hover:from-blue-700 hover:to-indigo-800 transition-all">
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Volunteer Journey */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Volunteer Journey</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sign Up & Profile Creation</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Create your volunteer profile and specify your skills and interests.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Opportunity Matching</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Our AI system matches you with opportunities that align with your skills.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Training & Onboarding</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Complete project-specific training and get connected with your team.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 dark:text-yellow-400 font-bold">4</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Make an Impact</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Contribute to humanitarian projects and track your measurable impact.</p>
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Volunteer Success Stories</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm mr-3">
                  AS
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Amit Sharma</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Software Developer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                "Volunteering with ImpactX helped me develop my skills while making a real difference. 
                I built a dashboard that helped NGOs track their relief distribution more efficiently."
              </p>
              <div className="flex items-center text-xs">
                <span className="text-gray-900 dark:text-white font-medium">120 hours contributed</span>
                <span className="text-gray-500 dark:text-gray-400 mx-2">•</span>
                <span className="text-green-600 dark:text-green-400">420 people impacted</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm mr-3">
                  PK
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Priya Krishnan</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Community Organizer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                "As a volunteer coordinator, I helped organize relief efforts for flood victims. 
                Seeing the direct impact of our work was incredibly rewarding and motivated me to continue."
              </p>
              <div className="flex items-center text-xs">
                <span className="text-gray-900 dark:text-white font-medium">85 hours contributed</span>
                <span className="text-gray-500 dark:text-gray-400 mx-2">•</span>
                <span className="text-green-600 dark:text-green-400">180 families helped</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recognition & Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recognition & Badges</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Earn recognition for your contributions and build your humanitarian portfolio.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">First Contribution</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Your first step in making an impact</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Impact Accelerator</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Contributed to 10+ projects</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Time Commitment</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">100+ volunteer hours</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Community Leader</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Mentored 5+ new volunteers</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Volunteers;