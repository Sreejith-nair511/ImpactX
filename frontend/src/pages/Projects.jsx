import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  CurrencyDollarIcon, 
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import ProjectCard from '../components/ui/ProjectCard';
import SearchBar from '../components/ui/SearchBar';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Mock project data
  const projects = [
    {
      id: 1,
      title: 'School Construction in Rural Kenya',
      description: 'Building classrooms and providing educational resources for 500 children in underserved communities.',
      location: 'Nairobi, Kenya',
      goal: 50000,
      raised: 35000,
      donors: 124,
      endDate: '2023-12-31',
      category: 'Education',
      impact: '500',
      progress: 70
    },
    {
      id: 2,
      title: 'Clean Water Wells in Desert Regions',
      description: 'Installing solar-powered water wells to provide clean drinking water for 2000 people.',
      location: 'Rajasthan, India',
      goal: 30000,
      raised: 28000,
      donors: 87,
      endDate: '2023-11-15',
      category: 'Health',
      impact: '2000',
      progress: 93
    },
    {
      id: 3,
      title: 'Medical Camps in Remote Amazon',
      description: 'Organizing mobile medical camps to provide healthcare services to isolated indigenous communities.',
      location: 'Manaus, Brazil',
      goal: 45000,
      raised: 15000,
      donors: 42,
      endDate: '2024-02-28',
      category: 'Health',
      impact: '1500',
      progress: 33
    },
    {
      id: 4,
      title: 'Food Distribution in Urban Slums',
      description: 'Providing daily meals and nutritional support to families in poverty-stricken areas.',
      location: 'Manila, Philippines',
      goal: 20000,
      raised: 18000,
      donors: 68,
      endDate: '2023-10-30',
      category: 'Food Security',
      impact: '800',
      progress: 90
    },
    {
      id: 5,
      title: 'Disaster Relief for Coastal Communities',
      description: 'Emergency aid and rebuilding efforts for communities affected by recent typhoons.',
      location: 'Cebu, Philippines',
      goal: 100000,
      raised: 25000,
      donors: 156,
      endDate: '2024-01-15',
      category: 'Disaster Relief',
      impact: '3000',
      progress: 25
    },
    {
      id: 6,
      title: 'Solar Panels for Off-Grid Schools',
      description: 'Installing solar energy systems to power schools in remote areas without electricity.',
      location: 'Kigali, Rwanda',
      goal: 35000,
      raised: 22000,
      donors: 73,
      endDate: '2023-12-20',
      category: 'Sustainability',
      impact: '1200',
      progress: 63
    }
  ];

  const categories = ['all', 'Education', 'Health', 'Food Security', 'Disaster Relief', 'Sustainability'];
  const locations = ['all', 'Kenya', 'India', 'Brazil', 'Philippines', 'Rwanda'];

  // Filter projects based on search and filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || project.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          paths={[
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' }
          ]} 
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Our Projects</h1>
          <p className="text-gray-400">
            Support verified humanitarian projects making a real impact around the world
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <SearchBar 
                placeholder="Search projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <div className="relative">
                <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                >
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-400">Showing {filteredProjects.length} of {projects.length} projects</span>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-12 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No projects found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLocation('all');
              }}
              className="px-6 py-3 bg-indigo-600 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;