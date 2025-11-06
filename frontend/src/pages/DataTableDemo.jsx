import React from 'react';
import DataTable from '../components/ui/DataTable';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

const DataTableDemo = () => {
  // Sample data for the table
  const sampleData = [
    {
      id: 1,
      name: 'Disaster Relief Fund',
      category: 'Emergency Response',
      status: 'Active',
      budget: 500000,
      spent: 325000,
      progress: 65,
      startDate: '2025-01-15',
      endDate: '2025-12-31'
    },
    {
      id: 2,
      name: 'Education for All',
      category: 'Education',
      status: 'Active',
      budget: 250000,
      spent: 180000,
      progress: 72,
      startDate: '2025-03-01',
      endDate: '2025-11-30'
    },
    {
      id: 3,
      name: 'Clean Water Initiative',
      category: 'Healthcare',
      status: 'Completed',
      budget: 150000,
      spent: 150000,
      progress: 100,
      startDate: '2024-06-01',
      endDate: '2025-05-31'
    },
    {
      id: 4,
      name: 'Sustainable Agriculture',
      category: 'Environment',
      status: 'Pending',
      budget: 300000,
      spent: 0,
      progress: 0,
      startDate: '2025-07-01',
      endDate: '2026-06-30'
    },
    {
      id: 5,
      name: 'Women Empowerment',
      category: 'Social Development',
      status: 'Active',
      budget: 200000,
      spent: 95000,
      progress: 47.5,
      startDate: '2025-02-01',
      endDate: '2025-10-31'
    },
    {
      id: 6,
      name: 'Digital Literacy',
      category: 'Education',
      status: 'Active',
      budget: 100000,
      spent: 65000,
      progress: 65,
      startDate: '2025-04-01',
      endDate: '2025-09-30'
    },
    {
      id: 7,
      name: 'Healthcare Access',
      category: 'Healthcare',
      status: 'Completed',
      budget: 400000,
      spent: 400000,
      progress: 100,
      startDate: '2023-01-01',
      endDate: '2024-12-31'
    },
    {
      id: 8,
      name: 'Renewable Energy',
      category: 'Environment',
      status: 'Active',
      budget: 750000,
      spent: 425000,
      progress: 56.7,
      startDate: '2024-09-01',
      endDate: '2026-08-31'
    },
    {
      id: 9,
      name: 'Child Nutrition',
      category: 'Healthcare',
      status: 'Pending',
      budget: 125000,
      spent: 0,
      progress: 0,
      startDate: '2025-08-01',
      endDate: '2026-05-31'
    },
    {
      id: 10,
      name: 'Infrastructure Development',
      category: 'Community',
      status: 'Active',
      budget: 1000000,
      spent: 650000,
      progress: 65,
      startDate: '2024-03-01',
      endDate: '2026-02-28'
    }
  ];

  // Define table columns
  const columns = [
    {
      key: 'name',
      title: 'Project Name',
      sortable: true,
      filterable: true
    },
    {
      key: 'category',
      title: 'Category',
      sortable: true,
      filterable: true
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      filterable: true,
      render: (value) => {
        let statusClass = '';
        let icon = null;
        
        switch (value) {
          case 'Active':
            statusClass = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
            icon = <CheckCircle className="h-4 w-4 mr-1" />;
            break;
          case 'Completed':
            statusClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
            icon = <CheckCircle className="h-4 w-4 mr-1" />;
            break;
          case 'Pending':
            statusClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
            icon = <Clock className="h-4 w-4 mr-1" />;
            break;
          default:
            statusClass = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
            {icon}
            {value}
          </span>
        );
      }
    },
    {
      key: 'budget',
      title: 'Budget',
      sortable: true,
      render: (value) => `₹${value.toLocaleString()}`
    },
    {
      key: 'spent',
      title: 'Spent',
      sortable: true,
      render: (value) => `₹${value.toLocaleString()}`
    },
    {
      key: 'progress',
      title: 'Progress',
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${value}%` }}
            ></div>
          </div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{value}%</span>
        </div>
      )
    },
    {
      key: 'startDate',
      title: 'Start Date',
      sortable: true,
      filterable: true
    },
    {
      key: 'endDate',
      title: 'End Date',
      sortable: true,
      filterable: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Data Table Demo</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This page demonstrates the data table component with sorting, filtering, and pagination features.
        </p>
        
        <div className="mb-8">
          <DataTable
            data={sampleData}
            columns={columns}
            searchable={true}
            sortable={true}
            pagination={true}
            itemsPerPage={5}
          />
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Features</h2>
          <ul className="text-gray-600 dark:text-gray-300 space-y-2">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Global search across all columns</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Individual column filtering</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Column sorting (ascending/descending)</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Pagination with smart page navigation</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Custom cell rendering for rich content</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Works with all theme modes (light/dark/high contrast)</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Fully customizable with additional CSS classes</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Implementation</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          To use the data table component in your components:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
          {`import DataTable from '../components/ui/DataTable';

// Define your data
const data = [
  { id: 1, name: 'Project A', status: 'Active', budget: 100000 },
  { id: 2, name: 'Project B', status: 'Completed', budget: 250000 },
  // ... more data
];

// Define your columns
const columns = [
  {
    key: 'name',
    title: 'Project Name',
    sortable: true,
    filterable: true
  },
  {
    key: 'status',
    title: 'Status',
    sortable: true,
    filterable: true,
    render: (value) => (
      <span className={\`status-\${value.toLowerCase()}\`}>
        {value}
      </span>
    )
  },
  {
    key: 'budget',
    title: 'Budget',
    sortable: true,
    render: (value) => \`₹\${value.toLocaleString()}\`
  }
];

// Use the component
<DataTable
  data={data}
  columns={columns}
  searchable={true}
  sortable={true}
  pagination={true}
  itemsPerPage={10}
/>`}
        </pre>
      </div>
    </div>
  );
};

export default DataTableDemo;