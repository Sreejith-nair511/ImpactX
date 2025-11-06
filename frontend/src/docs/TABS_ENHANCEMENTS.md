# Enhanced Tabs Component Documentation

## Overview
The enhanced Tabs component provides advanced functionality for creating tabbed interfaces with improved user experience, accessibility, and performance optimizations.

## Features

### 1. Lazy Loading
- Content is only loaded when the tab is activated
- Reduces initial page load time
- Improves performance for pages with heavy tab content

### 2. State Persistence
- Remembers the last active tab using localStorage
- Provides continuity when users navigate away and return
- Configurable per instance

### 3. Multiple Animation Types
- Slide: Content slides in from the side
- Fade: Content fades in
- Scale: Content scales up while fading in
- Smooth transitions between tabs

### 4. Keyboard Navigation
- Arrow key navigation (left/right or up/down)
- Tab focus management
- ARIA attributes for screen readers

### 5. Hover Effects
- Visual feedback on tab hover
- Callback support for hover events

### 6. Disabled Tabs
- Support for disabling specific tabs
- Visual indication of disabled state
- Programmatic enable/disable functionality

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | Array | Required | Array of tab objects with title, icon, and content |
| `defaultActiveTab` | Number | 0 | Index of the tab that should be active by default |
| `orientation` | String | 'horizontal' | Layout orientation ('horizontal' or 'vertical') |
| `variant` | String | 'default' | Visual style ('default', 'minimal', or 'boxed') |
| `onTabChange` | Function | undefined | Callback function when tab changes |
| `className` | String | '' | Additional classes for the container |
| `tabClassName` | String | '' | Additional classes for tab buttons |
| `contentClassName` | String | '' | Additional classes for content area |
| `lazyLoad` | Boolean | false | Enable lazy loading of tab content |
| `persistState` | Boolean | false | Persist active tab in localStorage |
| `animationType` | String | 'slide' | Animation type ('slide', 'fade', or 'scale') |
| `onTabHover` | Function | undefined | Callback function when tab is hovered |
| `disabledTabs` | Array | [] | Array of indices for disabled tabs |

## Usage Examples

### Basic Usage
```jsx
import Tabs from './components/ui/Tabs';
import { User, Settings } from 'lucide-react';

const tabs = [
  {
    title: 'Profile',
    icon: User,
    content: <div>Profile content here</div>
  },
  {
    title: 'Settings',
    icon: Settings,
    content: <div>Settings content here</div>
  }
];

<Tabs tabs={tabs} />
```

### Advanced Usage with Lazy Loading and Persistence
```jsx
<Tabs 
  tabs={tabs}
  lazyLoad={true}
  persistState={true}
  animationType="fade"
  defaultActiveTab={1}
  variant="boxed"
/>
```

## useTabs Hook

A custom hook for advanced tab management:

```jsx
import { useTabs } from '../hooks/useTabs';

const { 
  activeTab, 
  disabledTabs, 
  handleTabChange, 
  nextTab, 
  prevTab, 
  goToTab,
  disableTab,
  enableTab,
  toggleTabDisabled
} = useTabs(tabs, 0, true);
```

## TabbedContentSection Component

A pre-styled wrapper for common tabbed content sections:

```jsx
import TabbedContentSection from './components/ui/TabbedContentSection';

<TabbedContentSection
  title="User Settings"
  tabs={tabs}
  defaultActiveTab={0}
  variant="default"
/>
```

## Accessibility

The component follows WCAG guidelines:
- Proper ARIA attributes for tabs and tab panels
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Sufficient color contrast

## Performance

- Lazy loading reduces initial bundle size
- Efficient re-rendering with React.memo
- Animation optimizations with Framer Motion
- Memory management for large tab sets