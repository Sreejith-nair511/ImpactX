import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useThemePreferences } from '../hooks/usePreferences';

const Navigation = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, updateTheme } = useThemePreferences();
  
  // Group navigation items by category
  const navCategories = [
    {
      title: "Core",
      items: [
        { path: '/', label: 'Home' },
        { path: '/projects', label: 'Projects' },
        { path: '/impact-stories', label: 'Impact Stories' },
        { path: '/donate', label: 'Donate' },
        { path: '/ngo', label: 'NGO Dashboard' },
        { path: '/admin', label: 'Admin' },
        { path: '/collaboration', label: 'Collaboration Hub' },
        { path: '/search', label: 'Search' },
        { path: '/metrics', label: 'Metrics' },
        { path: '/goals', label: 'Goals' },
        { path: '/kanban', label: 'Kanban Board' },
        { path: '/project-roadmap', label: 'Project Roadmap' },
        { path: '/file-sharing', label: 'File Sharing' },
        { path: '/project-insights', label: 'Project Insights' },
        { path: '/community-engagement', label: 'Community Engagement' },
        { path: '/resource-management', label: 'Resource Management' },
        { path: '/volunteer-management', label: 'Volunteer Management' },
        { path: '/reporting', label: 'Reporting' },
        { path: '/tabs-demo', label: 'Tabs Demo' }
      ]
    },
    {
      title: "Impact Intelligence",
      items: [
        { path: '/global-impact', label: 'Global Impact' },
        { path: '/data-insights', label: 'Data Insights' },
        { path: '/analytics', label: 'Analytics Dashboard' },
        { path: '/analytics/detailed', label: 'Detailed Analytics' },
        { path: '/climate-forecast', label: 'Climate Forecast' },
        { path: '/verification-engine', label: 'Verification' },
        { path: '/fraud-detection', label: 'Fraud Detection' }
      ]
    },
    {
      title: "Automation",
      items: [
        { path: '/automation', label: 'Automation' },
        { path: '/impact-market', label: 'Impact Market' },
        { path: '/treasury', label: 'Treasury' },
        { path: '/contracts', label: 'Contracts' }
      ]
    },
    {
      title: "Governance",
      items: [
        { path: '/proposals', label: 'Proposals' },
        { path: '/community', label: 'Community' },
        { path: '/volunteers', label: 'Volunteers' }
      ]
    },
    {
      title: "Learning",
      items: [
        { path: '/academy', label: 'Academy' },
        { path: '/events', label: 'Events' },
        { path: '/api-playground', label: 'API Playground' }
      ]
    },
    {
      title: "Resources",
      items: [
        { path: '/tools', label: 'Tools' },
        { path: '/pipeline', label: 'Pipeline' },
        { path: '/ledger', label: 'Ledger' },
        { path: '/security', label: 'Security' },
        { path: '/charter', label: 'Charter' },
        { path: '/localization', label: 'Localization' },
        { path: '/accessibility', label: 'Accessibility' },
        { path: '/lab', label: 'Lab' },
        { path: '/interoperability', label: 'Interoperability' },
        { path: '/roadmap', label: 'Roadmap' },
        { path: '/settings', label: 'Settings' },
        { path: '/profile', label: 'Profile' },
        { path: '/about', label: 'About' },
        { path: '/careers', label: 'Careers' },
        { path: '/press', label: 'Press' }
      ]
    }
  ];

  // Flatten nav items for desktop view
  const navItems = navCategories.flatMap(category => category.items);

  // Filter items based on search query
  const filteredItems = navCategories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.path.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="bg-white text-blue-700 rounded-full w-8 h-8 flex items-center justify-center mr-2">₹</span>
            ImpactX
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.slice(0, 8).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-white text-blue-700 shadow-md'
                    : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* More button for additional items */}
            {navItems.length > 8 && (
              <div className="relative group">
                <button className="px-3 py-2 rounded-lg text-sm font-medium text-blue-100 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  More
                </button>
                <div className="absolute right-0 mt-2 w-64 bg-white text-blue-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2">
                    {navItems.slice(8).map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-4 py-2 text-sm hover:bg-blue-100 ${
                          location.pathname === item.path ? 'bg-blue-100 font-medium' : ''
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Dark mode toggle for desktop */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ml-2 ${
                darkMode 
                  ? 'bg-gray-700 text-yellow-300' 
                  : 'bg-gray-200 text-gray-700'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            {/* Dark mode toggle for mobile */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full mr-2 ${
                darkMode 
                  ? 'bg-gray-700 text-yellow-300' 
                  : 'bg-gray-200 text-gray-700'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-button text-white focus:outline-none p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu md:hidden bg-blue-600 rounded-lg mt-2 py-2 absolute left-4 right-4 shadow-xl max-h-96 overflow-y-auto z-50">
            {/* Search Bar */}
            <div className="px-4 py-2">
              <input
                type="text"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            
            {/* Navigation Categories */}
            {filteredItems.length > 0 ? (
              filteredItems.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="px-4 py-2 text-blue-200 font-medium text-sm uppercase tracking-wider">
                    {category.title}
                  </div>
                  {category.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 text-sm font-medium transition-colors ${
                        location.pathname === item.path
                          ? 'bg-blue-700 text-white'
                          : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-blue-200 text-sm">
                No pages found matching "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;