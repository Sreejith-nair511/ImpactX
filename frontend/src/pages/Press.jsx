import React from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/ui/StatsCard';

const Press = () => {
  // Mock data
  const statsData = [
    { title: "Media Mentions", value: "87", description: "Articles and features in press", trend: 15 },
    { title: "Press Reach", value: "12M+", description: "Monthly readers of our coverage", trend: 22 },
    { title: "Speaking Engagements", value: "24", description: "Conference presentations this year", trend: 8 },
    { title: "Awards Won", value: "5", description: "Industry recognition", trend: 2 }
  ];

  const pressReleases = [
    {
      title: "ImpactX Launches AI-Powered Verification Engine for Humanitarian Aid",
      date: "2025-10-15",
      source: "Tech Humanitarian Journal",
      excerpt: "New machine learning system increases fraud detection accuracy by 40% while reducing verification time.",
      link: "#"
    },
    {
      title: "Blockchain Platform ImpactX Expands to 12 Countries",
      date: "2025-09-22",
      source: "Global Tech News",
      excerpt: "Platform now available in local languages with region-specific humanitarian programs.",
      link: "#"
    },
    {
      title: "ImpactX Named Finalist for Social Innovation Award",
      date: "2025-08-30",
      source: "Innovation Today",
      excerpt: "Recognition for pioneering use of blockchain technology in humanitarian aid.",
      link: "#"
    },
    {
      title: "ImpactX Partners with UN Agencies for Transparent Aid Distribution",
      date: "2025-07-18",
      source: "United Nations Chronicle",
      excerpt: "Multi-year partnership to implement blockchain-based fund tracking in disaster response.",
      link: "#"
    }
  ];

  const mediaCoverage = [
    {
      title: "How Blockchain is Transforming Humanitarian Aid",
      source: "Forbes Technology",
      date: "2025-10-05",
      type: "Article"
    },
    {
      title: "The Future of Transparent Giving",
      source: "Harvard Business Review",
      date: "2025-09-12",
      type: "Opinion"
    },
    {
      title: "ImpactX at Tech for Good Summit",
      source: "CNN Business",
      date: "2025-08-25",
      type: "Video Interview"
    },
    {
      title: "5 Startups Changing the World",
      source: "Wired",
      date: "2025-07-30",
      type: "Feature"
    }
  ];

  const resources = [
    {
      title: "Company Logo Pack",
      description: "High-resolution logos in various formats",
      link: "#",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Executive Bios",
      description: "Biographies and headshots of leadership team",
      link: "#",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Press Kit",
      description: "Comprehensive information about our mission and technology",
      link: "#",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Media Contact",
      description: "Press inquiries and interview requests",
      link: "#",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
          Press & Media
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
        >
          Latest news, media coverage, and resources for journalists and media professionals.
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

      {/* Latest Press Releases */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Press Releases</h2>
          <button className="text-blue-600 dark:text-blue-400 hover:underline">
            View All Releases
          </button>
        </div>
        
        <div className="space-y-6">
          {pressReleases.map((release, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{release.title}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">{release.date}</span>
              </div>
              <p className="text-blue-600 dark:text-blue-400 text-sm mb-3">{release.source}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{release.excerpt}</p>
              <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                Read Full Release
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Media Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Media Coverage</h2>
          
          <div className="space-y-4">
            {mediaCoverage.map((coverage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{coverage.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{coverage.source}</p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {coverage.type}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{coverage.date}</span>
                  <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    View Article
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Media Resources */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Media Resources</h2>
          
          <div className="space-y-4">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30"
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                    {resource.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{resource.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{resource.description}</p>
                    <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium mt-2">
                      Download
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Press Contact */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Press Inquiries</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contact Our Media Team</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              For press inquiries, interview requests, or media kit access, please reach out to our communications team.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">press@impactx.org</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Media Kit Includes</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Company fact sheet and executive bios</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">High-resolution logos and brand assets</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Recent press releases and media coverage</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Product screenshots and platform information</span>
              </li>
            </ul>
            <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300">
              Download Media Kit
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Press;