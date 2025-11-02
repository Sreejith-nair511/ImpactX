import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronDownIcon, 
  ChevronUpIcon, 
  ArrowsUpDownIcon,
  FunnelIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

const DataTable = ({ 
  data, 
  columns, 
  searchable = false, 
  sortable = true, 
  pagination = true, 
  rowsPerPage = 10,
  exportable = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [columnFilters, setColumnFilters] = useState({});

  // Filter data based on search term and column filters
  const filteredData = useMemo(() => {
    return data.filter(row => {
      // Apply search filter
      const matchesSearch = searchable
        ? columns.some(column =>
            row[column.key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        : true;
      
      // Apply column filters
      const matchesColumnFilters = Object.keys(columnFilters).every(key => {
        if (!columnFilters[key]) return true;
        const value = row[key]?.toString().toLowerCase();
        return value?.includes(columnFilters[key].toLowerCase());
      });
      
      return matchesSearch && matchesColumnFilters;
    });
  }, [data, columns, searchTerm, columnFilters, searchable]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortable || !sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortable, sortConfig]);

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = pagination
    ? sortedData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      )
    : sortedData;

  const handleSort = (key) => {
    if (!sortable) return;
    
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleColumnFilter = (key, value) => {
    setColumnFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getSortIcon = (columnKey) => {
    if (!sortConfig.key || sortConfig.key !== columnKey) {
      return <ArrowsUpDownIcon className="w-4 h-4 ml-1" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUpIcon className="w-4 h-4 ml-1" /> 
      : <ChevronDownIcon className="w-4 h-4 ml-1" />;
  };

  // Export data to CSV
  const exportToCSV = () => {
    if (!exportable || sortedData.length === 0) return;
    
    const headers = columns.map(col => col.label).join(',');
    const rows = sortedData.map(row => 
      columns.map(col => {
        const value = row[col.key];
        // Escape commas and quotes in values
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    );
    
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data-export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        {/* Search Bar */}
        {searchable && (
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}
        
        {/* Export Button */}
        {exportable && (
          <button
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        )}
      </div>

      {/* Column Filters */}
      <div className="border-b border-gray-700 p-2 bg-gray-750">
        <div className="flex flex-wrap gap-2">
          {columns.map(column => (
            <div key={`filter-${column.key}`} className="flex items-center">
              <FunnelIcon className="w-4 h-4 text-gray-400 mr-1" />
              <input
                type="text"
                placeholder={column.label}
                value={columnFilters[column.key] || ''}
                onChange={(e) => handleColumnFilter(column.key, e.target.value)}
                className="px-2 py-1 bg-gray-700 text-white rounded text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer ${
                    sortable ? 'hover:text-white' : ''
                  }`}
                >
                  <div className="flex items-center">
                    {column.label}
                    {sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="hover:bg-gray-750"
                >
                  {columns.map((column) => (
                    <td key={`${index}-${column.key}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, sortedData.length)} to{' '}
            {Math.min(currentPage * rowsPerPage, sortedData.length)} of {sortedData.length} entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === 1
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentPage === page
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === totalPages
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;