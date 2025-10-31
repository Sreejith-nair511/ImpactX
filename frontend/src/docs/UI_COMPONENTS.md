# UI Components Guide

This guide documents the reusable UI components in ImpactX.

## Overview

ImpactX includes a collection of reusable UI components located in `src/components/ui/`. These components are designed to be:

- Consistent with the design system
- Accessible and responsive
- Well-tested and documented
- Easy to use and customize

## Component List

### AnalyticsCard

Displays key metrics with visual indicators.

**Props:**
- `title` (string) - Card title
- `value` (number) - Metric value
- `change` (number) - Percentage change (optional)
- `icon` (React component) - Icon component (optional)
- `format` (string) - Value format ('number', 'currency', 'percentage')
- `isLoading` (boolean) - Loading state

**Usage:**
```jsx
import AnalyticsCard from '../components/ui/AnalyticsCard';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

<AnalyticsCard
  title="Total Donations"
  value={12500}
  change={12.5}
  icon={CurrencyDollarIcon}
  format="currency"
/>
```

### Breadcrumbs

Navigation breadcrumbs showing current page location.

**Props:**
- `paths` (array) - Array of path objects with `name` and `path`

**Usage:**
```jsx
import Breadcrumbs from '../components/ui/Breadcrumbs';

<Breadcrumbs 
  paths={[
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'School Construction', path: '/projects/1' }
  ]} 
/>
```

### DataTable

Data table with sorting, filtering, and pagination.

**Props:**
- `data` (array) - Array of data objects
- `columns` (array) - Array of column definitions
- `searchable` (boolean) - Enable search functionality
- `sortable` (boolean) - Enable column sorting
- `pagination` (boolean) - Enable pagination
- `rowsPerPage` (number) - Rows per page (default: 10)

**Usage:**
```jsx
import DataTable from '../components/ui/DataTable';

const data = [
  { id: 1, name: 'John Doe', amount: 1000, status: 'Completed' },
  { id: 2, name: 'Jane Smith', amount: 2000, status: 'Pending' }
];

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'amount', label: 'Amount', render: (value) => `$${value}` },
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

<DataTable 
  data={data} 
  columns={columns} 
  searchable={true} 
  sortable={true} 
/>
```

### DataMap

Interactive map visualization for geographic data.

**Props:**
- `data` (array) - Array of geographic data points
- `onSelect` (function) - Callback when a location is selected

**Usage:**
```jsx
import DataMap from '../components/ui/DataMap';

const data = [
  { country: 'India', projects: 15, donations: 420000, impact: 12500 },
  { country: 'Kenya', projects: 8, donations: 180000, impact: 5200 }
];

<DataMap data={data} />
```

### ImpactChart

Chart component for visualizing impact data over time.

**Props:**
- `data` (array) - Array of data points
- `type` (string) - Chart type ('line', 'bar', 'area')

**Usage:**
```jsx
import ImpactChart from '../components/ui/ImpactChart';

const data = [
  { month: 'Jan', donations: 45000, impact: 1200 },
  { month: 'Feb', donations: 52000, impact: 1450 }
];

<ImpactChart data={data} type="line" />
```

### ImpactStory

Card component for displaying impact stories.

**Props:**
- `title` (string) - Story title
- `description` (string) - Story description
- `beneficiary` (string) - Beneficiary information
- `location` (string) - Location information
- `date` (string) - Date of impact
- `image` (string) - Image URL (optional)
- `impact` (string) - Impact metrics
- `projectLink` (string) - Link to related project

**Usage:**
```jsx
import ImpactStory from '../components/ui/ImpactStory';

<ImpactStory
  title="Building Dreams: A New School"
  description="Thanks to donors like you, we built a new school"
  beneficiary="Sarah Mwangi & 499 other children"
  location="Kibwezi, Kenya"
  date="June 2023"
  impact="500 children"
  projectLink="/projects/1"
/>
```

### LoadingSpinner

Loading spinner indicator.

**Props:**
- `size` (string) - Spinner size ('sm', 'md', 'lg')
- `color` (string) - Spinner color

**Usage:**
```jsx
import LoadingSpinner from '../components/ui/LoadingSpinner';

<LoadingSpinner size="md" color="indigo" />
```

### Modal

Modal dialog component.

**Props:**
- `isOpen` (boolean) - Modal visibility
- `onClose` (function) - Close callback
- `title` (string) - Modal title
- `children` (React node) - Modal content

**Usage:**
```jsx
import Modal from '../components/ui/Modal';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmation"
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

### Notification

Notification/toast component.

**Props:**
- `type` (string) - Notification type ('success', 'error', 'warning', 'info')
- `message` (string) - Notification message
- `duration` (number) - Auto-dismiss duration (ms)
- `onClose` (function) - Close callback

**Usage:**
```jsx
import Notification from '../components/ui/Notification';

<Notification
  type="success"
  message="Donation processed successfully!"
  duration={5000}
/>
```

### ProjectCard

Card component for displaying project information.

**Props:**
- `title` (string) - Project title
- `description` (string) - Project description
- `location` (string) - Project location
- `goal` (number) - Funding goal
- `raised` (number) - Amount raised
- `donors` (number) - Number of donors
- `endDate` (string) - Project end date
- `category` (string) - Project category
- `image` (string) - Image URL (optional)
- `impact` (string) - Impact metrics
- `progress` (number) - Progress percentage

**Usage:**
```jsx
import ProjectCard from '../components/ui/ProjectCard';

<ProjectCard
  title="School Construction"
  description="Building schools in rural areas"
  location="Nairobi, Kenya"
  goal={50000}
  raised={35000}
  donors={124}
  endDate="2023-12-31"
  category="Education"
  impact="500"
  progress={70}
/>
```

### SearchBar

Search input component.

**Props:**
- `placeholder` (string) - Input placeholder
- `value` (string) - Input value
- `onChange` (function) - Change callback

**Usage:**
```jsx
import SearchBar from '../components/ui/SearchBar';
import { useState } from 'react';

const [searchQuery, setSearchQuery] = useState('');

<SearchBar 
  placeholder="Search projects..." 
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
```

### StatsCard

Statistics card component.

**Props:**
- `title` (string) - Card title
- `value` (string|number) - Statistic value
- `change` (string) - Change indicator
- `icon` (React component) - Icon component

**Usage:**
```jsx
import StatsCard from '../components/ui/StatsCard';
import { UserGroupIcon } from '@heroicons/react/24/outline';

<StatsCard
  title="Total Donors"
  value="15,420"
  change="+12%"
  icon={UserGroupIcon}
/>
```

### Tabs

Tab navigation component.

**Props:**
- `tabs` (array) - Array of tab objects with `id` and `label`
- `activeTab` (string) - Active tab ID
- `onTabChange` (function) - Tab change callback

**Usage:**
```jsx
import Tabs from '../components/ui/Tabs';
import { useState } from 'react';

const [activeTab, setActiveTab] = useState('overview');

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' }
];

<Tabs 
  tabs={tabs} 
  activeTab={activeTab} 
  onTabChange={setActiveTab} 
/>
```

### UserProfile

User profile dropdown component.

**Props:**
- None

**Usage:**
```jsx
import UserProfile from '../components/ui/UserProfile';

<UserProfile />
```

## Customization

All components can be customized through:

1. **Props** - Most components accept props for customization
2. **CSS Classes** - Components use Tailwind CSS classes that can be overridden
3. **Wrapper Components** - Create wrapper components for consistent customization

## Accessibility

All components follow accessibility best practices:

- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

## Responsive Design

All components are responsive and work on:

- Mobile devices
- Tablets
- Desktop screens

## Testing

Each component has corresponding unit tests in `__tests__` directories.