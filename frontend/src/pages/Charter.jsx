import React from 'react';
import { motion } from 'framer-motion';

const Charter = () => {
  const charterSections = [
    {
      title: "Mission Statement",
      content: "To leverage blockchain technology and data science to create transparent, accountable, and effective humanitarian aid systems that empower communities and protect human dignity.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Core Values",
      content: [
        "Transparency: All transactions and decisions are publicly verifiable",
        "Accountability: We are responsible for the impact of our actions",
        "Innovation: We embrace technology to solve humanitarian challenges",
        "Collaboration: We work with diverse stakeholders to maximize impact",
        "Integrity: We operate with honesty and ethical principles",
        "Inclusivity: We ensure equitable access to humanitarian resources"
      ],
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Governance Principles",
      content: [
        "Decentralized decision-making through community voting",
        "Transparent financial reporting and fund management",
        "Regular impact assessments and public reporting",
        "Inclusive participation from all stakeholder groups",
        "Ethical use of data and technology",
        "Continuous improvement through feedback mechanisms"
      ],
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Commitment to Impact",
      content: [
        "Measurable outcomes for all funded initiatives",
        "Long-term sustainability of supported projects",
        "Empowerment of local communities and organizations",
        "Innovation in humanitarian technology and practices",
        "Global accessibility to humanitarian resources",
        "Environmental responsibility in all operations"
      ],
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const foundingPrinciples = [
    {
      title: "Transparency First",
      description: "Every transaction, decision, and impact metric is publicly verifiable on the blockchain."
    },
    {
      title: "Technology for Good",
      description: "We harness the power of blockchain, AI, and data science to solve humanitarian challenges."
    },
    {
      title: "Community Ownership",
      description: "Our platform is governed by the community of donors, beneficiaries, and partners."
    },
    {
      title: "Impact Measurement",
      description: "We measure, verify, and report on the real-world impact of every contribution."
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
          ImpactX Charter
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
        >
          The foundational principles and commitments that guide our mission to create transparent and accountable humanitarian aid.
        </motion.p>
      </div>

      {/* Founding Principles */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Founding Principles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {foundingPrinciples.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{principle.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Charter Sections */}
      <div className="space-y-8">
        {charterSections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                {section.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
            </div>
            
            {typeof section.content === 'string' ? (
              <p className="text-gray-600 dark:text-gray-300 text-lg">{section.content}</p>
            ) : (
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>

      {/* Commitment Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mt-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Commitment</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          We commit to upholding these principles in all our operations, partnerships, and decision-making processes. 
          This charter serves as our North Star, guiding us as we work to transform humanitarian aid through technology, 
          transparency, and community empowerment.
        </p>
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
              ₹
            </div>
          </div>
          <div>
            <p className="text-gray-900 dark:text-white font-semibold">Goodwell Sreejith S, Vasudha, Nikhil</p>
            <p className="text-gray-600 dark:text-gray-400">Co-Founders, ImpactX</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">October 31, 2025</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Charter;