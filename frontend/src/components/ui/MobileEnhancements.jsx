import React, { useState, useEffect } from 'react';
import { useMobile } from '../hooks/useMobile';
import { ChevronUp, Smartphone, Tablet, Monitor } from 'lucide-react';
import './MobileUtilities.css';

/**
 * Mobile Enhancements Component
 * Provides mobile-specific enhancements and utilities
 */
const MobileEnhancements = () => {
  const { 
    isMobile, 
    isTablet, 
    isDesktop, 
    screenWidth, 
    screenHeight, 
    isLandscape, 
    isPortrait,
    isTouchDevice,
    preventZoomOnInput,
    allowZoom
  } = useMobile();
  
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [orientation, setOrientation] = useState('portrait');

  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle orientation changes
  useEffect(() => {
    setOrientation(isLandscape ? 'landscape' : 'portrait');
  }, [isLandscape]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle input focus to prevent zoom on mobile
  useEffect(() => {
    if (isMobile) {
      const handleInputFocus = (event) => {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
          preventZoomOnInput();
        }
      };

      const handleInputBlur = (event) => {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
          allowZoom();
        }
      };

      document.addEventListener('focusin', handleInputFocus);
      document.addEventListener('focusout', handleInputBlur);

      return () => {
        document.removeEventListener('focusin', handleInputFocus);
        document.removeEventListener('focusout', handleInputBlur);
      };
    }
  }, [isMobile, preventZoomOnInput, allowZoom]);

  // Add mobile-specific meta tags
  useEffect(() => {
    if (isMobile) {
      // Add mobile-specific meta tags
      let viewportMeta = document.querySelector('meta[name="viewport"]');
      if (!viewportMeta) {
        viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        viewportMeta.content = 'width=device-width, initial-scale=1.0';
        document.head.appendChild(viewportMeta);
      }
      
      // Add mobile-specific theme color
      let themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (!themeColorMeta) {
        themeColorMeta = document.createElement('meta');
        themeColorMeta.name = 'theme-color';
        themeColorMeta.content = '#4f46e5'; // Primary color
        document.head.appendChild(themeColorMeta);
      }
    }
  }, [isMobile]);

  if (!isMobile && !isTablet) {
    return null;
  }

  return (
    <>
      {/* Mobile Debug Info (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mobile-debug-info">
          <div className="debug-header">
            <Smartphone size={16} />
            <span>Mobile Debug</span>
          </div>
          <div className="debug-content">
            <div>Device: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}</div>
            <div>Screen: {screenWidth} × {screenHeight}</div>
            <div>Orientation: {orientation}</div>
            <div>Touch: {isTouchDevice ? 'Yes' : 'No'}</div>
          </div>
        </div>
      )}
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className="scroll-to-top-btn touch-target"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
      
      {/* Mobile-specific styles */}
      <style jsx>{`
        .mobile-debug-info {
          position: fixed;
          bottom: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 12px;
          border-radius: 8px;
          font-size: 12px;
          z-index: 9999;
          max-width: 200px;
        }
        
        .debug-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          font-weight: bold;
        }
        
        .debug-content div {
          margin-bottom: 4px;
        }
        
        .scroll-to-top-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--primary-color);
          color: white;
          border: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .scroll-to-top-btn:hover {
          background: var(--primary-color-dark);
          transform: translateY(-2px);
        }
        
        @media (min-width: 769px) {
          .mobile-debug-info,
          .scroll-to-top-btn {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default MobileEnhancements;