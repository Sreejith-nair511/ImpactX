import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserCircleIcon, 
  ChevronDownIcon, 
  CogIcon, 
  ArrowRightOnRectangleIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  HeartIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import { useThemePreferences } from '../../hooks/usePreferences';

const UserProfile = ({ 
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Donor',
    avatar: null,
    notifications: 3
  },
  onLogout,
  onProfileClick,
  onSettingsClick,
  onNotificationsClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const { theme, updateTheme } = useThemePreferences();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    updateTheme(newTheme);
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    if (onProfileClick) onProfileClick();
  };

  const handleSettingsClick = () => {
    setIsOpen(false);
    if (onSettingsClick) onSettingsClick();
  };

  const handleNotificationsClick = () => {
    setIsOpen(false);
    setShowNotifications(!showNotifications);
    if (onNotificationsClick) onNotificationsClick();
  };

  const handleLogout = () => {
    setIsOpen(false);
    if (onLogout) onLogout();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center space-x-3">
        {/* Notifications badge */}
        {user.notifications > 0 && (
          <button 
            onClick={handleNotificationsClick}
            className="relative p-1 text-white hover:text-blue-200 focus:outline-none"
            aria-label={`${user.notifications} notifications`}
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {user.notifications}
            </span>
          </button>
        )}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-full p-1"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
              <UserCircleIcon className="h-6 w-6 text-white" />
            </div>
          )}
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-blue-200">{user.role}</p>
          </div>
          <ChevronDownIcon className={`h-4 w-4 text-blue-200 hidden md:block transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl z-50 overflow-hidden border border-gray-100"
            >
              <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="flex items-center space-x-3">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <UserCircleIcon className="h-8 w-8 text-white" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-blue-200">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-white/20 text-xs rounded-full">
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="py-2">
                <button 
                  onClick={handleProfileClick}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <UserCircleIcon className="h-5 w-5 mr-3 text-gray-500" />
                  Profile
                </button>
                
                <button 
                  onClick={handleSettingsClick}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <CogIcon className="h-5 w-5 mr-3 text-gray-500" />
                  Settings
                </button>
                
                <button
                  onClick={toggleTheme}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  {theme === 'dark' ? (
                    <>
                      <SunIcon className="h-5 w-5 mr-3 text-gray-500" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <MoonIcon className="h-5 w-5 mr-3 text-gray-500" />
                      Dark Mode
                    </>
                  )}
                </button>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                <button 
                  onClick={handleNotificationsClick}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <BellIcon className="h-5 w-5 mr-3 text-gray-500" />
                  Notifications
                  {user.notifications > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {user.notifications}
                    </span>
                  )}
                </button>
                
                <button 
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <CreditCardIcon className="h-5 w-5 mr-3 text-gray-500" />
                  Billing
                </button>
                
                <button 
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <ShieldCheckIcon className="h-5 w-5 mr-3 text-gray-500" />
                  Security
                </button>
                
                <button 
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <HeartIcon className="h-5 w-5 mr-3 text-gray-500" />
                  Saved Projects
                </button>
                
                <button 
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <ChartBarIcon className="h-5 w-5 mr-3 text-gray-500" />
                  Activity
                </button>
                
                <button 
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <QuestionMarkCircleIcon className="h-5 w-5 mr-3 text-gray-500" />
                  Help & Support
                </button>
              </div>
              
              <div className="border-t border-gray-100 py-2">
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-red-500" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;