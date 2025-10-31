import React from 'react';
import { render, screen } from '@testing-library/react';
import ImpactStory from '../ImpactStory';

describe('ImpactStory', () => {
  const mockStory = {
    title: 'Building Dreams: A New School',
    description: 'Thanks to donors like you, we built a new school',
    beneficiary: 'Sarah Mwangi & 499 other children',
    location: 'Kibwezi, Kenya',
    date: 'June 2023',
    impact: '500 children',
    projectLink: '/projects/1'
  };

  test('renders story information correctly', () => {
    render(<ImpactStory {...mockStory} />);

    expect(screen.getByText('Building Dreams: A New School')).toBeInTheDocument();
    expect(screen.getByText('Thanks to donors like you, we built a new school')).toBeInTheDocument();
    expect(screen.getByText('Sarah Mwangi & 499 other children')).toBeInTheDocument();
    expect(screen.getByText('Kibwezi, Kenya')).toBeInTheDocument();
    expect(screen.getByText('June 2023')).toBeInTheDocument();
  });

  test('displays impact information', () => {
    render(<ImpactStory {...mockStory} />);

    expect(screen.getByText('500 children')).toBeInTheDocument();
  });

  test('renders read full story button', () => {
    render(<ImpactStory {...mockStory} />);

    expect(screen.getByText('Read full story')).toBeInTheDocument();
  });
});