import React, { useState } from 'react';
import { motion } from 'framer-motion';
import UserCard from './UserCard';
import UserConnections from './UserConnections';
import UserPortfolio from './UserPortfolio';
import ProjectUpdates from './ProjectUpdates';
import MessagingInterface from './MessagingInterface';
import UserSkills from './UserSkills';
import UserEndorsements from './UserEndorsements';
import UserAchievements from './UserAchievements';
import UserBadges from './UserBadges';
import UserPreferences from './UserPreferences';
import UserFeedback from './UserFeedback';
import UserCalendar from './UserCalendar';
import UserDocuments from './UserDocuments';
import UserDashboard from './UserDashboard';
import ImpactReport from './ImpactReport';

const FeatureShowcase = ({ userId, className = '' }) => {
  const [activeFeature, setActiveFeature] = useState('dashboard');

  // Mock data for demonstration
  const mockUser = {
    id: '1',
    name: 'Impact Champion',
    username: 'impact_champion',
    avatar: '/default-avatar.png',
    role: 'Community Leader',
    location: 'Bangalore, India',
    bio: 'Passionate about creating positive social impact through technology and community engagement.',
    stats: {
      projects: 12,
      followers: 245,
      donations: 150000
    },
    isVerified: true
  };

  const mockProjects = [
    {
      id: '1',
      title: 'Clean Water Initiative',
      description: 'Providing clean drinking water to rural communities',
      image: '/project1.jpg',
      status: 'active',
      fundingProgress: 75,
      currentFunding: 75000,
      targetFunding: 100000,
      impactScore: 85,
      createdAt: '2023-01-15T00:00:00Z'
    },
    {
      id: '2',
      title: 'Education for All',
      description: 'Building schools and providing educational resources',
      image: '/project2.jpg',
      status: 'active',
      fundingProgress: 45,
      currentFunding: 45000,
      targetFunding: 100000,
      impactScore: 92,
      createdAt: '2023-03-22T00:00:00Z'
    },
    {
      id: '3',
      title: 'Renewable Energy',
      description: 'Installing solar panels in remote villages',
      image: '/project3.jpg',
      status: 'completed',
      fundingProgress: 100,
      currentFunding: 200000,
      targetFunding: 200000,
      impactScore: 98,
      createdAt: '2022-11-10T00:00:00Z'
    }
  ];

  const mockSkills = [
    {
      id: '1',
      name: 'Project Management',
      level: 90,
      category: 'management',
      description: '5+ years of experience managing impact projects'
    },
    {
      id: '2',
      name: 'Community Engagement',
      level: 85,
      category: 'other',
      description: 'Expert in building community partnerships'
    },
    {
      id: '3',
      name: 'Data Analysis',
      level: 75,
      category: 'technical',
      description: 'Proficient in impact data analysis and reporting'
    }
  ];

  const mockEndorsements = [
    {
      id: '1',
      skillId: '1',
      skill: { id: '1', name: 'Project Management' },
      text: 'Outstanding leadership on our water project. Delivered results ahead of schedule.',
      createdAt: '2023-06-15T00:00:00Z',
      endorser: {
        id: '2',
        name: 'Sarah Johnson',
        username: 'sarahj',
        avatar: '/user2.jpg'
      }
    },
    {
      id: '2',
      skillId: '2',
      skill: { id: '2', name: 'Community Engagement' },
      text: 'Exceptional ability to connect with local communities and build trust.',
      createdAt: '2023-05-22T00:00:00Z',
      endorser: {
        id: '3',
        name: 'Michael Chen',
        username: 'michaelc',
        avatar: '/user3.jpg'
      }
    }
  ];

  const mockAchievements = [
    {
      id: '1',
      title: 'Impact Leader Award',
      organization: 'Global Impact Network',
      date: '2023-04-15',
      description: 'Recognized for outstanding contribution to community development',
      type: 'award',
      url: '#'
    },
    {
      id: '2',
      title: 'Project Management Professional',
      organization: 'PMI',
      date: '2022-11-30',
      description: 'Certified project management professional',
      type: 'certification',
      url: '#'
    }
  ];

  const mockBadges = [
    {
      id: '1',
      name: 'Community Builder',
      description: 'Successfully engaged 100+ community members',
      awardedAt: '2023-03-15T00:00:00Z',
      category: 'engagement',
      rarity: 'rare',
      points: 500,
      icon: null
    },
    {
      id: '2',
      name: 'Impact Champion',
      description: 'Generated measurable positive impact in 3 projects',
      awardedAt: '2023-01-20T00:00:00Z',
      category: 'impact',
      rarity: 'epic',
      points: 1000,
      icon: null
    }
  ];

  // Feature navigation
  const features = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'connections', label: 'Connections', icon: '👥' },
    { key: 'portfolio', label: 'Portfolio', icon: '💼' },
    { key: 'messaging', label: 'Messaging', icon: '💬' },
    { key: 'skills', label: 'Skills', icon: '🔧' },
    { key: 'endorsements', label: 'Endorsements', icon: '👍' },
    { key: 'achievements', label: 'Achievements', icon: '🏆' },
    { key: 'badges', label: 'Badges', icon: '🥇' },
    { key: 'calendar', label: 'Calendar', icon: '📅' },
    { key: 'documents', label: 'Documents', icon: '📁' },
    { key: 'reports', label: 'Reports', icon: '📈' }
  ];

  return (
    <div className={className}>
      {/* Feature Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <button
              key={feature.key}
              onClick={() => setActiveFeature(feature.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                activeFeature === feature.key
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <span className="mr-2">{feature.icon}</span>
              {feature.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        {activeFeature === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📊 User Dashboard
            </h2>
            <UserDashboard userId={userId} />
          </motion.div>
        )}

        {activeFeature === 'profile' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              👤 User Profile
            </h2>
            <div className="max-w-md">
              <UserCard 
                user={mockUser} 
                showActions={true} 
              />
            </div>
          </motion.div>
        )}

        {activeFeature === 'connections' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              👥 User Connections
            </h2>
            <UserConnections 
              userId={userId} 
              type="followers" 
              showSearch={true} 
            />
          </motion.div>
        )}

        {activeFeature === 'portfolio' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              💼 Project Portfolio
            </h2>
            <UserPortfolio 
              user={mockUser} 
              projects={mockProjects} 
              showFilters={true} 
              showStats={true} 
            />
          </motion.div>
        )}

        {activeFeature === 'messaging' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              💬 Messaging Interface
            </h2>
            <div className="h-96">
              <MessagingInterface />
            </div>
          </motion.div>
        )}

        {activeFeature === 'skills' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🔧 Skills & Expertise
            </h2>
            <UserSkills 
              user={mockUser} 
              skills={mockSkills} 
              showEdit={true} 
            />
          </motion.div>
        )}

        {activeFeature === 'endorsements' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              👍 User Endorsements
            </h2>
            <UserEndorsements 
              userId={userId} 
              endorsements={mockEndorsements} 
              showAddButton={true} 
            />
          </motion.div>
        )}

        {activeFeature === 'achievements' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🏆 Achievements & Certifications
            </h2>
            <UserAchievements 
              user={mockUser} 
              achievements={mockAchievements} 
              showAddButton={true} 
            />
          </motion.div>
        )}

        {activeFeature === 'badges' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🥇 Badges & Recognition
            </h2>
            <UserBadges 
              user={mockUser} 
              badges={mockBadges} 
              showAwardButton={true} 
            />
          </motion.div>
        )}

        {activeFeature === 'calendar' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📅 Event Calendar
            </h2>
            <UserCalendar userId={userId} showCreateButton={true} />
          </motion.div>
        )}

        {activeFeature === 'documents' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📁 Document Management
            </h2>
            <UserDocuments userId={userId} showUploadButton={true} />
          </motion.div>
        )}

        {activeFeature === 'reports' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📈 Impact Reports
            </h2>
            <ImpactReport userId={userId} />
          </motion.div>
        )}
      </div>

      {/* Feature Description */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mt-6 border border-indigo-200 dark:border-indigo-900/30">
        <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
          Feature Showcase
        </h3>
        <p className="text-indigo-700 dark:text-indigo-300">
          This showcase demonstrates all the new features added to ImpactX. Each feature represents 
          a comprehensive enhancement that adds real value to the platform. Click through the tabs 
          above to explore the different components, hooks, and services that have been implemented.
        </p>
      </div>
    </div>
  );
};

export default FeatureShowcase;