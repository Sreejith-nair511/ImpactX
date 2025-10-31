import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BellIcon, 
  SunIcon, 
  MoonIcon, 
  ComputerDesktopIcon,
  ChartBarIcon,
  LockClosedIcon,
  UserCircleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { 
  themePreferences, 
  notificationPreferences, 
  dashboardPreferences, 
  privacyPreferences 
} from '../services/userPreferences';

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState('appearance');
  const [theme, setTheme] = useState(themePreferences.getTheme());
  const [darkMode, setDarkMode] = useState(themePreferences.getDarkMode());
  const [emailNotifications, setEmailNotifications] = useState(notificationPreferences.getEmailNotifications());
  const [pushNotifications, setPushNotifications] = useState(notificationPreferences.getPushNotifications());
  const [notificationFrequency, setNotificationFrequency] = useState(notificationPreferences.getNotificationFrequency());
  const [analyticsConsent, setAnalyticsConsent] = useState(privacyPreferences.getAnalyticsConsent());
  const [dataSharing, setDataSharing] = useState(privacyPreferences.getDataSharing());

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: SunIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'privacy', label: 'Privacy', icon: ShieldCheckIcon },
    { id: 'account', label: 'Account', icon: UserCircleIcon }
  ];

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    themePreferences.setTheme(newTheme);
    
    if (newTheme === 'dark') {
      setDarkMode(true);
      themePreferences.setDarkMode(true);
    } else if (newTheme === 'light') {
      setDarkMode(false);
      themePreferences.setDarkMode(false);
    }
  };

  const handleDarkModeToggle = (isDark) => {
    setDarkMode(isDark);
    themePreferences.setDarkMode(isDark);
  };

  const handleSavePreferences = () => {
    // Save all preferences
    notificationPreferences.setEmailNotifications(emailNotifications);
    notificationPreferences.setPushNotifications(pushNotifications);
    notificationPreferences.setNotificationFrequency(notificationFrequency);
    privacyPreferences.setAnalyticsConsent(analyticsConsent);
    privacyPreferences.setDataSharing(dataSharing);
    
    // Show success message
    alert('Preferences saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          paths={[
            { name: 'Home', path: '/' },
            { name: 'Settings', path: '/settings' }
          ]} 
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">User Settings</h1>
          <p className="text-gray-400">
            Customize your ImpactX experience
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Settings</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-gray-800 rounded-xl p-6">
              {activeTab === 'appearance' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Appearance</h2>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => handleThemeChange('light')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          theme === 'light'
                            ? 'border-indigo-500 bg-indigo-500/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <div className="bg-white p-2 rounded mb-2">
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="h-8 bg-gray-200 rounded mb-1"></div>
                          <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
                          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </div>
                        <p className="text-center">Light</p>
                      </button>
                      
                      <button
                        onClick={() => handleThemeChange('dark')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          theme === 'dark'
                            ? 'border-indigo-500 bg-indigo-500/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <div className="bg-gray-800 p-2 rounded mb-2">
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="h-8 bg-gray-700 rounded mb-1"></div>
                          <div className="h-4 bg-gray-600 rounded w-3/4 mb-1"></div>
                          <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                        </div>
                        <p className="text-center">Dark</p>
                      </button>
                      
                      <button
                        onClick={() => handleThemeChange('system')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          theme === 'system'
                            ? 'border-indigo-500 bg-indigo-500/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <div className="bg-gradient-to-b from-gray-200 to-gray-800 p-2 rounded mb-2">
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="h-8 bg-gray-400 rounded mb-1"></div>
                          <div className="h-4 bg-gray-500 rounded w-3/4 mb-1"></div>
                          <div className="h-4 bg-gray-500 rounded w-1/2"></div>
                        </div>
                        <p className="text-center">System</p>
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Dark Mode</h3>
                    <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                      <div className="flex items-center">
                        <div className="p-2 bg-indigo-500/10 rounded-lg mr-4">
                          <MoonIcon className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-sm text-gray-400">
                            Enable dark mode for reduced eye strain
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDarkModeToggle(!darkMode)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          darkMode ? 'bg-indigo-600' : 'bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            darkMode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Notifications</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                      <div className="flex items-center">
                        <div className="p-2 bg-indigo-500/10 rounded-lg mr-4">
                          <BellIcon className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-400">
                            Receive updates via email
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setEmailNotifications(!emailNotifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          emailNotifications ? 'bg-indigo-600' : 'bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            emailNotifications ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                      <div className="flex items-center">
                        <div className="p-2 bg-indigo-500/10 rounded-lg mr-4">
                          <ChartBarIcon className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-gray-400">
                            Receive real-time updates
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setPushNotifications(!pushNotifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          pushNotifications ? 'bg-indigo-600' : 'bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            pushNotifications ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="p-4 bg-gray-750 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-indigo-500/10 rounded-lg mr-4">
                          <BellIcon className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                          <p className="font-medium">Notification Frequency</p>
                          <p className="text-sm text-gray-400">
                            How often you receive updates
                          </p>
                        </div>
                      </div>
                      <select
                        value={notificationFrequency}
                        onChange={(e) => setNotificationFrequency(e.target.value)}
                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="instant">Instant</option>
                        <option value="hourly">Hourly Digest</option>
                        <option value="daily">Daily Digest</option>
                        <option value="weekly">Weekly Digest</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'privacy' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Privacy</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                      <div className="flex items-center">
                        <div className="p-2 bg-indigo-500/10 rounded-lg mr-4">
                          <ChartBarIcon className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                          <p className="font-medium">Analytics Consent</p>
                          <p className="text-sm text-gray-400">
                            Allow us to collect usage data to improve the platform
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setAnalyticsConsent(!analyticsConsent)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          analyticsConsent ? 'bg-indigo-600' : 'bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            analyticsConsent ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                      <div className="flex items-center">
                        <div className="p-2 bg-indigo-500/10 rounded-lg mr-4">
                          <ShieldCheckIcon className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                          <p className="font-medium">Data Sharing</p>
                          <p className="text-sm text-gray-400">
                            Share anonymized data with research partners
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setDataSharing(!dataSharing)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          dataSharing ? 'bg-indigo-600' : 'bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            dataSharing ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="p-4 bg-gray-750 rounded-lg">
                      <h3 className="font-medium mb-2">Data Management</h3>
                      <p className="text-sm text-gray-400 mb-4">
                        Manage your personal data and privacy settings
                      </p>
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                          Download Data
                        </button>
                        <button className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'account' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Account</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-750 rounded-lg">
                      <h3 className="font-medium mb-4">Profile Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Name</label>
                          <input
                            type="text"
                            defaultValue="John Doe"
                            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Email</label>
                          <input
                            type="email"
                            defaultValue="john.doe@example.com"
                            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-750 rounded-lg">
                      <h3 className="font-medium mb-4">Security</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Password</p>
                            <p className="text-sm text-gray-400">Last changed 3 months ago</p>
                          </div>
                          <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                            Change
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-400">Add an extra layer of security</p>
                          </div>
                          <button className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                            Enable
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-750 rounded-lg">
                      <h3 className="font-medium mb-4">Connected Accounts</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                              <span className="font-bold">G</span>
                            </div>
                            <div>
                              <p className="font-medium">Google</p>
                              <p className="text-sm text-gray-400">john.doe@gmail.com</p>
                            </div>
                          </div>
                          <button className="text-red-400 hover:text-red-300">
                            Disconnect
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center mr-3">
                              <span className="font-bold">T</span>
                            </div>
                            <div>
                              <p className="font-medium">Twitter</p>
                              <p className="text-sm text-gray-400">@johndoe</p>
                            </div>
                          </div>
                          <button className="text-red-400 hover:text-red-300">
                            Disconnect
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSavePreferences}
                  className="px-6 py-3 bg-indigo-600 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;