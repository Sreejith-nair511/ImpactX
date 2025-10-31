import React from 'react';
import { render, screen } from '@testing-library/react';
import DataTable from '../DataTable';

describe('DataTable', () => {
  const mockData = [
    { id: 1, name: 'John Doe', amount: 1000, status: 'Completed' },
    { id: 2, name: 'Jane Smith', amount: 2000, status: 'Pending' },
    { id: 3, name: 'Bob Johnson', amount: 1500, status: 'Processing' }
  ];

  const mockColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' }
  ];

  test('renders table with correct data', () => {
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
      />
    );

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  test('renders correct number of rows', () => {
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
      />
    );

    const rows = screen.getAllByRole('row');
    // +1 for header row
    expect(rows).toHaveLength(mockData.length + 1);
  });

  test('displays no data message when data is empty', () => {
    render(
      <DataTable
        data={[]}
        columns={mockColumns}
      />
    );

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('renders custom cell content when render function is provided', () => {
    const columnsWithRender = [
      ...mockColumns,
      {
        key: 'status',
        label: 'Status',
        render: (value) => (
          <span className={`status-${value.toLowerCase()}`}>
            {value}
          </span>
        )
      }
    ];

    render(
      <DataTable
        data={[mockData[0]]}
        columns={columnsWithRender}
      />
    );

    expect(screen.getByText('Completed')).toBeInTheDocument();
  });
});