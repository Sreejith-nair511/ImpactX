import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/ui/StatsCard';

const Localization = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedRegion, setSelectedRegion] = useState('global');

  // Mock data
  const statsData = [
    { title: "Languages Supported", value: "12", description: "UI and content translations", trend: 3 },
    { title: "Regional Adaptations", value: "24", description: "Localized versions for regions", trend: 5 },
    { title: "Translation Accuracy", value: "96%", description: "Quality score of translations", trend: 2 },
    { title: "User Adoption", value: "78%", description: "Users in local languages", trend: 8 }
  ];

  const languages = [
    { code: 'en', name: 'English', percentage: 100, status: 'Complete' },
    { code: 'hi', name: 'Hindi', percentage: 100, status: 'Complete' },
    { code: 'es', name: 'Spanish', percentage: 95, status: 'Complete' },
    { code: 'fr', name: 'French', percentage: 90, status: 'Complete' },
    { code: 'ar', name: 'Arabic', percentage: 85, status: 'Complete' },
    { code: 'bn', name: 'Bengali', percentage: 80, status: 'In Progress' },
    { code: 'pt', name: 'Portuguese', percentage: 75, status: 'In Progress' },
    { code: 'ru', name: 'Russian', percentage: 70, status: 'Planned' },
    { code: 'zh', name: 'Chinese', percentage: 65, status: 'Planned' },
    { code: 'id', name: 'Indonesian', percentage: 60, status: 'Planned' }
  ];

  const regions = [
    { code: 'global', name: 'Global', languages: 12 },
    { code: 'south-asia', name: 'South Asia', languages: 5 },
    { code: 'latin-america', name: 'Latin America', languages: 4 },
    { code: 'middle-east', name: 'Middle East & North Africa', languages: 3 },
    { code: 'sub-saharan-africa', name: 'Sub-Saharan Africa', languages: 6 },
    { code: 'europe', name: 'Europe', languages: 7 }
  ];

  const localizationFeatures = [
    {
      title: "Cultural Adaptation",
      description: "Content and imagery adapted for local cultural contexts",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Local Currency",
      description: "Display of amounts in local currencies with real-time conversion",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Regional Partnerships",
      description: "Collaboration with local organizations for authentic representation",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Accessibility Compliance",
      description: "Support for local accessibility standards and requirements",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
          Global Localization
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
        >
          Making humanitarian aid accessible to communities worldwide through comprehensive localization efforts.
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

      {/* Localization Features */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Localization Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {localizationFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Language Support */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Language Support</h2>
          
          <div className="space-y-4">
            {languages.map((language, index) => (
              <motion.div
                key={language.code}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{language.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{language.code}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      language.status === 'Complete' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : language.status === 'In Progress' 
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      {language.status}
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{language.percentage}%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" 
                    style={{ width: `${language.percentage}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Regional Adaptations */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Regional Adaptations</h2>
          
          <div className="space-y-4">
            {regions.map((region, index) => (
              <motion.div
                key={region.code}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                  selectedRegion === region.code
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white'
                }`}
                onClick={() => setSelectedRegion(region.code)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{region.name}</h3>
                  <span className="text-sm">{region.languages} languages</span>
                </div>
                <p className="text-sm mt-2 opacity-80">
                  {region.code === 'global' && 'Worldwide platform availability'}
                  {region.code === 'south-asia' && 'Adapted for cultural and linguistic diversity'}
                  {region.code === 'latin-america' && 'Spanish and Portuguese focused adaptations'}
                  {region.code === 'middle-east' && 'Arabic and cultural context adaptations'}
                  {region.code === 'sub-saharan-africa' && 'Multi-language support for diverse regions'}
                  {region.code === 'europe' && 'Comprehensive European language coverage'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Translation */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Community Translation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contribute to Localization</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Help us make ImpactX accessible to more communities by contributing translations and cultural adaptations.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Translate UI elements and content</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Review and improve existing translations</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Provide cultural context and feedback</span>
              </li>
            </ul>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300">
              Join Translation Team
            </button>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Translation Tools</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our platform provides professional tools for community translators to ensure quality and consistency.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Translation Memory</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Reuse previously translated content</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Assurance</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Automated checks for consistency</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Collaboration</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Work with other translators</p>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Glossary</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Standardized terminology</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Localization;