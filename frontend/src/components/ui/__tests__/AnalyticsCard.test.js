import React from 'react';
import { render, screen } from '@testing-library/react';
import AnalyticsCard from '../AnalyticsCard';

describe('AnalyticsCard', () => {
  const mockIcon = () => <div data-testid="mock-icon">Icon</div>;

  test('renders title and value correctly', () => {
    render(
      <AnalyticsCard
        title="Total Donations"
        value={12500}
        icon={mockIcon}
        format="currency"
      />
    );

    expect(screen.getByText('Total Donations')).toBeInTheDocument();
    expect(screen.getByText('$12,500')).toBeInTheDocument();
  });

  test('formats numbers correctly', () => {
    render(
      <AnalyticsCard
        title="Active Users"
        value={1500}
        format="number"
      />
    );

    expect(screen.getByText('1.5K')).toBeInTheDocument();
  });

  test('formats percentages correctly', () => {
    render(
      <AnalyticsCard
        title="Growth Rate"
        value={12.5}
        format="percentage"
      />
    );

    expect(screen.getByText('12.5%')).toBeInTheDocument();
  });

  test('displays change indicator when provided', () => {
    render(
      <AnalyticsCard
        title="Revenue"
        value={10000}
        change={5.2}
        format="currency"
      />
    );

    expect(screen.getByText('▲')).toBeInTheDocument();
    expect(screen.getByText('5.2%')).toBeInTheDocument();
  });

  test('shows loading state when isLoading is true', () => {
    render(
      <AnalyticsCard
        title="Loading Data"
        value={1000}
        isLoading={true}
      />
    );

    expect(screen.getByText('Loading Data')).toBeInTheDocument();
  });

  test('renders icon when provided', () => {
    render(
      <AnalyticsCard
        title="With Icon"
        value={1000}
        icon={mockIcon}
      />
    );

    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });
});