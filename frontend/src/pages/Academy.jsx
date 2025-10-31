import React from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/ui/StatsCard';
import Breadcrumbs from '../components/ui/Breadcrumbs';

const Academy = () => {
  // Mock data
  const statsData = [
    { title: "Courses Available", value: "42", description: "Learning modules", trend: 5 },
    { title: "Active Learners", value: "15.2K", description: "Students enrolled", trend: 12 },
    { title: "Completion Rate", value: "87%", description: "Course completion", trend: 3 },
    { title: "Expert Instructors", value: "89", description: "Industry professionals", trend: 8 }
  ];

  const courseCategories = [
    {
      title: "Humanitarian Fundamentals",
      description: "Core principles of humanitarian work and disaster response",
      courses: 12,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Technology & Innovation",
      description: "Blockchain, AI, and digital tools for humanitarian work",
      courses: 8,
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Data & Analytics",
      description: "Impact measurement, monitoring, and evaluation techniques",
      courses: 7,
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Community Engagement",
      description: "Building partnerships and working with local communities",
      courses: 6,
      icon: (
        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const featuredCourses = [
    {
      title: "Blockchain for Humanitarian Transparency",
      instructor: "Dr. Sarah Johnson",
      duration: "8 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: "2,450",
      description: "Learn how blockchain technology can enhance transparency and accountability in humanitarian operations."
    },
    {
      title: "AI-Powered Disaster Response",
      instructor: "Prof. Rajesh Kumar",
      duration: "6 weeks",
      level: "Advanced",
      rating: 4.9,
      students: "1,870",
      description: "Explore how artificial intelligence can predict, respond to, and recover from disaster events."
    },
    {
      title: "Community-Centered Design",
      instructor: "Anjali Mehta",
      duration: "4 weeks",
      level: "Beginner",
      rating: 4.7,
      students: "3,210",
      description: "Develop skills to design humanitarian programs that truly serve community needs and priorities."
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
          Impact Academy
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
        >
          Advance your humanitarian expertise with courses designed by industry leaders and powered by cutting-edge technology.
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
            />
          </motion.div>
        ))}
      </div>

      {/* Course Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Learning Paths</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Explore our comprehensive curriculum designed to build expertise in humanitarian innovation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courseCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.4 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-gray-700 flex items-center justify-center mb-4">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{category.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{category.description}</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {category.courses} courses available
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Featured Courses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Courses</h2>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg text-sm hover:from-blue-700 hover:to-indigo-800 transition-all">
            View All Courses
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <div className="text-3xl font-bold mb-2">{course.title.split(' ')[0]}</div>
                  <div className="text-sm opacity-90">Course Preview</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{course.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{course.instructor}</span>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-900 dark:text-white font-medium">{course.rating}</span>
                    <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                    <span>{course.students} students</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center mr-3">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.duration}
                    </span>
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      {course.level}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg text-sm hover:from-blue-700 hover:to-indigo-800 transition-all">
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Learning Experience */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Interactive Learning Experience</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our courses combine cutting-edge technology with practical humanitarian expertise.
          </p>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="ml-3 text-gray-700 dark:text-gray-300">Live virtual classes with industry experts</span>
            </li>
            
            <li className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="ml-3 text-gray-700 dark:text-gray-300">Hands-on projects with real humanitarian organizations</span>
            </li>
            
            <li className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="ml-3 text-gray-700 dark:text-gray-300">Peer collaboration through our global learning community</span>
            </li>
            
            <li className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="ml-3 text-gray-700 dark:text-gray-300">Blockchain-verified certificates of completion</span>
            </li>
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Career Development</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Advance your humanitarian career with skills that matter in today's digital world.
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Professional Certifications</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Earn industry-recognized credentials that demonstrate your expertise in humanitarian innovation.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs">
                  Blockchain Specialist
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs">
                  AI for Good
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 rounded-full text-xs">
                  Data Analytics
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Career Pathways</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Our curriculum is designed to support various career trajectories in the humanitarian sector.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">NGO Leadership</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Management roles</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Tech for Good</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Innovation roles</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Success Stories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Learner Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-4">
                MR
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Meera Rajan</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Humanitarian Tech Specialist</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              "The Blockchain for Humanitarian Transparency course completely transformed how I approach accountability 
              in my work. I was able to implement a tracking system that increased donor confidence by 40%."
            </p>
            <div className="flex items-center text-sm">
              <span className="text-gray-900 dark:text-white font-medium">42% increase in funding</span>
              <span className="text-gray-500 dark:text-gray-400 mx-2">•</span>
              <span className="text-gray-500 dark:text-gray-400">15,000 people impacted</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold mr-4">
                DV
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">David Verma</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Disaster Response Coordinator</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              "The AI-Powered Disaster Response course helped me develop predictive models that improved our 
              emergency response time by 35%. The practical projects were especially valuable for real-world application."
            </p>
            <div className="flex items-center text-sm">
              <span className="text-gray-900 dark:text-white font-medium">35% faster response</span>
              <span className="text-gray-500 dark:text-gray-400 mx-2">•</span>
              <span className="text-gray-500 dark:text-gray-400">8,500 families reached</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Academy;