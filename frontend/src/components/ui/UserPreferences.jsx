import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import usePreferences from '../../hooks/usePreferences';

const UserPreferences = ({ userId, className = '' }) => {
  const {
    preferences,
    notificationPreferences,
    privacyPreferences,
    displayPreferences,
    communicationPreferences,
    loading,
    error,
    updatePreferences,
    updateNotificationPreferences,
    updatePrivacyPreferences,
    updateDisplayPreferences,
    updateCommunicationPreferences,
    resetPreferences
  } = usePreferences(userId);

  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Initialize form data when preferences load
  useEffect(() => {
    if (preferences) {
      setFormData({
        general: { ...preferences },
        notifications: { ...notificationPreferences },
        privacy: { ...privacyPreferences },
        display: { ...displayPreferences },
        communication: { ...communicationPreferences }
      });
    }
  }, [
    preferences,
    notificationPreferences,
    privacyPreferences,
    displayPreferences,
    communicationPreferences
  ]);

  // Handle form input changes
  const handleInputChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  // Handle form submission
  const handleSubmit = async (category, e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    
    try {
      switch (category) {
        case 'general':
          await updatePreferences(formData.general);
          break;
        case 'notifications':
          await updateNotificationPreferences(formData.notifications);
          break;
        case 'privacy':
          await updatePrivacyPreferences(formData.privacy);
          break;
        case 'display':
          await updateDisplayPreferences(formData.display);
          break;
        case 'communication':
          await updateCommunicationPreferences(formData.communication);
          break;
        default:
          break;
      }
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving preferences:', err);
    } finally {
      setSaving(false);
    }
  };

  // Handle reset to defaults
  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all preferences to default values?')) {
      try {
        await resetPreferences();
      } catch (err) {
        console.error('Error resetting preferences:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-64 ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-xl p-6 text-center ${className}`}>
        <div className="text-red-600 dark:text-red-400 font-medium mb-2">
          Error loading preferences
        </div>
        <div className="text-red-500 dark:text-red-300 text-sm mb-4">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Tab configuration
  const tabs = [
    { key: 'general', label: 'General', icon: '⚙️' },
    { key: 'notifications', label: 'Notifications', icon: '🔔' },
    { key: 'privacy', label: 'Privacy', icon: '🔒' },
    { key: 'display', label: 'Display', icon: '🎨' },
    { key: 'communication', label: 'Communication', icon: '💬' }
  ];

  return (
    <div className={className}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Preferences & Settings
            </h2>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Reset to Defaults
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Customize your experience and manage your preferences
          </p>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.key
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {/* Save success indicator */}
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-800 dark:text-green-200">
                  Preferences saved successfully!
                </span>
              </div>
            </motion.div>
          )}
          
          {/* General Settings */}
          {activeTab === 'general' && (
            <form onSubmit={(e) => handleSubmit('general', e)}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Account Settings
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                        Language
                      </label>
                      <select
                        value={formData.general?.language || 'en'}
                        onChange={(e) => handleInputChange('general', 'language', e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="hi">Hindi</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                        Timezone
                      </label>
                      <select
                        value={formData.general?.timezone || 'UTC'}
                        onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="Europe/London">London</option>
                        <option value="Europe/Paris">Paris</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                        <option value="Asia/Kolkata">Kolkata</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <form onSubmit={(e) => handleSubmit('notifications', e)}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Notification Preferences
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Email Notifications
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Receive email updates about your projects and activities
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.notifications?.emailEnabled || false}
                          onChange={(e) => handleInputChange('notifications', 'emailEnabled', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Push Notifications
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Receive push notifications on your devices
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.notifications?.pushEnabled || false}
                          onChange={(e) => handleInputChange('notifications', 'pushEnabled', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          SMS Notifications
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Receive text messages for important updates
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.notifications?.smsEnabled || false}
                          onChange={(e) => handleInputChange('notifications', 'smsEnabled', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <form onSubmit={(e) => handleSubmit('privacy', e)}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Privacy Settings
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Profile Visibility
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Control who can see your profile information
                        </p>
                      </div>
                      <select
                        value={formData.privacy?.profileVisibility || 'public'}
                        onChange={(e) => handleInputChange('privacy', 'profileVisibility', e.target.value)}
                        className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="public">Public</option>
                        <option value="connections">Connections Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Project Visibility
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Control who can see your projects
                        </p>
                      </div>
                      <select
                        value={formData.privacy?.projectVisibility || 'public'}
                        onChange={(e) => handleInputChange('privacy', 'projectVisibility', e.target.value)}
                        className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="public">Public</option>
                        <option value="connections">Connections Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Activity Feed
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Show your activity in public feeds
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.privacy?.showActivity || true}
                          onChange={(e) => handleInputChange('privacy', 'showActivity', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {/* Display Settings */}
          {activeTab === 'display' && (
            <form onSubmit={(e) => handleSubmit('display', e)}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Display Preferences
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Dark Mode
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.display?.darkMode || false}
                          onChange={(e) => handleInputChange('display', 'darkMode', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                        Theme
                      </label>
                      <select
                        value={formData.display?.theme || 'default'}
                        onChange={(e) => handleInputChange('display', 'theme', e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="default">Default</option>
                        <option value="blue">Ocean Blue</option>
                        <option value="green">Forest Green</option>
                        <option value="purple">Royal Purple</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                        Font Size
                      </label>
                      <select
                        value={formData.display?.fontSize || 'medium'}
                        onChange={(e) => handleInputChange('display', 'fontSize', e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {/* Communication Settings */}
          {activeTab === 'communication' && (
            <form onSubmit={(e) => handleSubmit('communication', e)}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Communication Preferences
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Newsletter
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Receive our monthly newsletter
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.communication?.newsletter || false}
                          onChange={(e) => handleInputChange('communication', 'newsletter', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Product Updates
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Receive notifications about new features
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.communication?.productUpdates || true}
                          onChange={(e) => handleInputChange('communication', 'productUpdates', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Community Messages
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Receive messages from the community
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.communication?.communityMessages || true}
                          onChange={(e) => handleInputChange('communication', 'communityMessages', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;