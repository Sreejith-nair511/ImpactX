import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectCard from '../ProjectCard';

describe('ProjectCard', () => {
  const mockProject = {
    title: 'School Construction',
    description: 'Building schools in rural areas',
    location: 'Nairobi, Kenya',
    goal: 50000,
    raised: 35000,
    donors: 124,
    endDate: '2023-12-31',
    category: 'Education',
    impact: '500'
  };

  test('renders project information correctly', () => {
    render(<ProjectCard {...mockProject} />);

    expect(screen.getByText('School Construction')).toBeInTheDocument();
    expect(screen.getByText('Building schools in rural areas')).toBeInTheDocument();
    expect(screen.getByText('Nairobi, Kenya')).toBeInTheDocument();
    expect(screen.getByText('$35,000')).toBeInTheDocument();
    expect(screen.getByText('$50,000')).toBeInTheDocument();
    expect(screen.getByText('124')).toBeInTheDocument();
  });

  test('calculates progress percentage correctly', () => {
    render(<ProjectCard {...mockProject} />);

    const progressText = screen.getByText('70%');
    expect(progressText).toBeInTheDocument();
  });

  test('displays category badge', () => {
    render(<ProjectCard {...mockProject} />);

    expect(screen.getByText('Education')).toBeInTheDocument();
  });

  test('renders impact information', () => {
    render(<ProjectCard {...mockProject} />);

    expect(screen.getByText('500')).toBeInTheDocument();
  });

  test('shows end date', () => {
    render(<ProjectCard {...mockProject} />);

    expect(screen.getByText('Ends 2023-12-31')).toBeInTheDocument();
  });
});