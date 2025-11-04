import React from 'react';
import Reporting from '../components/ui/Reporting';
import './ReportingPage.css';

/**
 * Reporting Page
 * Dedicated page for viewing project reports and analytics
 */
const ReportingPage = () => {
  // Mock project ID for demonstration
  const projectId = 'project-123';
  
  return (
    <div className="reporting-page">
      <div className="page-header">
        <h1>Project Reporting</h1>
        <p>Comprehensive analytics and reporting for your disaster relief project</p>
      </div>
      
      <div className="page-content">
        <div className="main-content">
          <Reporting projectId={projectId} />
        </div>
        
        <div className="sidebar">
          <div className="sidebar-section">
            <h3>Report Templates</h3>
            <div className="templates-list">
              <div className="template-item">
                <div className="template-info">
                  <h4>Monthly Impact Report</h4>
                  <p>Standard monthly impact assessment</p>
                </div>
                <button className="use-template">Use</button>
              </div>
              <div className="template-item">
                <div className="template-info">
                  <h4>Quarterly Financial Report</h4>
                  <p>Detailed financial breakdown</p>
                </div>
                <button className="use-template">Use</button>
              </div>
              <div className="template-item">
                <div className="template-info">
                  <h4>Annual Impact Assessment</h4>
                  <p>Comprehensive yearly impact analysis</p>
                </div>
                <button className="use-template">Use</button>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Recent Exports</h3>
            <div className="exports-list">
              <div className="export-item">
                <div className="export-info">
                  <FileText size={16} />
                  <div>
                    <p className="export-name">March_2024_Impact_Report.pdf</p>
                    <p className="export-date">Exported 2 hours ago</p>
                  </div>
                </div>
                <button className="download-button">
                  <Download size={16} />
                </button>
              </div>
              <div className="export-item">
                <div className="export-info">
                  <FileText size={16} />
                  <div>
                    <p className="export-name">Q1_2024_Financial_Report.xlsx</p>
                    <p className="export-date">Exported 1 day ago</p>
                  </div>
                </div>
                <button className="download-button">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button className="action-button">
                <BarChart size={16} />
                Generate Dashboard Report
              </button>
              <button className="action-button">
                <TrendingUp size={16} />
                View Impact Trends
              </button>
              <button className="action-button">
                <Download size={16} />
                Export All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingPage;