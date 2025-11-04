import React, { useState } from 'react';
import { Menu, X, Home, Search, Bell, User, Settings, HelpCircle, LogOut } from 'lucide-react';
import './MobileUtilities.css';

/**
 * Mobile Navigation Component
 * Provides a mobile-optimized navigation experience
 */
const MobileNavigation = ({ darkMode, toggleDarkMode, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('main');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveSection('main');
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'projects', label: 'Projects', icon: Search, path: '/projects' },
    { id: 'impact', label: 'Impact Stories', icon: HelpCircle, path: '/impact-stories' },
    { id: 'donate', label: 'Donate', icon: Bell, path: '/donate' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
  ];

  const handleNavItemClick = (path) => {
    // In a real app, this would navigate to the path
    console.log('Navigate to:', path);
    setIsMenuOpen(false);
  };

  return (
    <div className="mobile-navigation">
      {/* Mobile menu button */}
      <button 
        className="touch-target mobile-nav-toggle btn-mobile"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-container">
            {/* Menu header */}
            <div className="mobile-menu-header">
              <div className="mobile-menu-user">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="mobile-user-avatar" />
                ) : (
                  <div className="mobile-user-avatar-placeholder">
                    <User size={20} />
                  </div>
                )}
                <div className="mobile-user-info">
                  <div className="mobile-user-name">{user?.name || 'Guest User'}</div>
                  <div className="mobile-user-email">{user?.email || 'Not signed in'}</div>
                </div>
              </div>
              <button 
                className="touch-target mobile-menu-close btn-mobile"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation sections */}
            <div className="mobile-menu-content">
              {activeSection === 'main' && (
                <div className="mobile-nav-section">
                  <div className="mobile-nav-items">
                    {navItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.id}
                          className="mobile-nav-item touch-target"
                          onClick={() => handleNavItemClick(item.path)}
                        >
                          <IconComponent size={20} className="mobile-nav-icon" />
                          <span className="mobile-nav-label">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Additional options */}
                  <div className="mobile-nav-section-footer">
                    <button 
                      className="mobile-nav-item touch-target"
                      onClick={toggleDarkMode}
                    >
                      {darkMode ? (
                        <>
                          <Sun size={20} className="mobile-nav-icon" />
                          <span className="mobile-nav-label">Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon size={20} className="mobile-nav-icon" />
                          <span className="mobile-nav-label">Dark Mode</span>
                        </>
                      )}
                    </button>
                    
                    <button className="mobile-nav-item touch-target">
                      <LogOut size={20} className="mobile-nav-icon" />
                      <span className="mobile-nav-label">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom navigation bar */}
      <div className="mobile-bottom-nav">
        {navItems.slice(0, 5).map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              className="mobile-bottom-nav-item touch-target"
              onClick={() => handleNavItemClick(item.path)}
              aria-label={item.label}
            >
              <IconComponent size={20} />
              <span className="mobile-nav-label-small">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;