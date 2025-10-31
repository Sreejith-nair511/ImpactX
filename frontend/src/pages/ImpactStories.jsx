import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  UserGroupIcon, 
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import ImpactStory from '../components/ui/ImpactStory';
import SearchBar from '../components/ui/SearchBar';

const ImpactStories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Mock impact stories data
  const stories = [
    {
      id: 1,
      title: 'Building Dreams: A New School in Rural Kenya',
      description: 'Thanks to donors like you, we were able to construct a new school in the remote village of Kibwezi. The school now serves 500 children who previously had no access to education. Meet Sarah, a 12-year-old girl who is now the first in her family to attend school.',
      beneficiary: 'Sarah Mwangi & 499 other children',
      location: 'Kibwezi, Kenya',
      date: 'June 2023',
      impact: '500 children',
      projectLink: '/projects/1'
    },
    {
      id: 2,
      title: 'Clean Water Transforms a Community',
      description: 'The installation of a solar-powered water well in Rajasthan has changed everything for the villagers. Women no longer walk 5 kilometers daily to fetch water, and waterborne diseases have decreased by 70%. See how this project has improved health outcomes for 2,000 people.',
      beneficiary: '2,000 villagers',
      location: 'Rajasthan, India',
      date: 'May 2023',
      impact: '2,000 people',
      projectLink: '/projects/2'
    },
    {
      id: 3,
      title: 'Medical Care Reaches the Amazon',
      description: 'Our mobile medical camp in the Amazon basin provided healthcare to 1,500 indigenous people who had never seen a doctor. From basic checkups to treating chronic conditions, the impact has been profound. Follow the story of Chief Tukum and his community.',
      beneficiary: 'Chief Tukum & community',
      location: 'Manaus, Brazil',
      date: 'April 2023',
      impact: '1,500 people',
      projectLink: '/projects/3'
    },
    {
      id: 4,
      title: 'Hope After Typhoon: Rebuilding Lives',
      description: 'When Typhoon Odette devastated coastal communities in the Philippines, our emergency response provided immediate relief and long-term rebuilding support. See how families like the Santos are rebuilding their homes and lives with the help of donors worldwide.',
      beneficiary: 'The Santos Family & 500 others',
      location: 'Cebu, Philippines',
      date: 'March 2023',
      impact: '3,000 people',
      projectLink: '/projects/5'
    },
    {
      id: 5,
      title: 'Powering Education with Solar Energy',
      description: 'Solar panels installed at schools in rural Rwanda have extended learning hours and improved educational outcomes. Students can now study after dark, and teachers can use digital resources. Discover how this technology is transforming education for 1,200 students.',
      beneficiary: '1,200 students',
      location: 'Kigali, Rwanda',
      date: 'February 2023',
      impact: '1,200 students',
      projectLink: '/projects/6'
    },
    {
      id: 6,
      title: 'Feeding Hope in Manila Slums',
      description: 'Our daily meal program in Manila\'s slums provides nutritious food to 800 families. Beyond addressing immediate hunger, the program has improved school attendance and health outcomes. Meet Maria, a mother of three who now has hope for her children\'s future.',
      beneficiary: 'Maria Santos & 799 families',
      location: 'Manila, Philippines',
      date: 'January 2023',
      impact: '800 families',
      projectLink: '/projects/4'
    }
  ];

  const categories = ['all', 'Education', 'Health', 'Food Security', 'Disaster Relief', 'Sustainability'];
  const locations = ['all', 'Kenya', 'India', 'Brazil', 'Philippines', 'Rwanda'];

  // Filter stories based on search and filters
  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.beneficiary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || story.title.includes(selectedCategory);
    const matchesLocation = selectedLocation === 'all' || story.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          paths={[
            { name: 'Home', path: '/' },
            { name: 'Impact Stories', path: '/impact-stories' }
          ]} 
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Impact Stories</h1>
          <p className="text-gray-400">
            Real stories of transformation from communities we serve
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <SearchBar 
                placeholder="Search stories..." 
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
            <span className="text-sm text-gray-400">Showing {filteredStories.length} of {stories.length} stories</span>
          </div>
        </div>

        {/* Stories Grid */}
        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ImpactStory {...story} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-12 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No stories found</h3>
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

export default ImpactStories;