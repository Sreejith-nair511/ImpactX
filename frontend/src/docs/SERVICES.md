# Services Guide

This guide documents the service modules in ImpactX.

## Overview

ImpactX includes a collection of service modules located in `src/services/`. These services are designed to:

- Encapsulate business logic
- Handle API communication
- Manage application state
- Promote code reuse
- Improve testability

## Service List

### analyticsService

Handles analytics data fetching and tracking.

**Functions:**
- `trackPageView(pageName, properties)` - Track page views
- `trackEvent(eventName, properties)` - Track events
- `identifyUser(userId, traits)` - Identify users
- `getPlatformMetrics()` - Get platform metrics
- `getImpactData()` - Get impact data
- `getGeographicData()` - Get geographic data
- `getUserEngagement()` - Get user engagement metrics

**Usage:**
```javascript
import { getPlatformMetrics } from '../services/analyticsService';

const metrics = await getPlatformMetrics();
console.log(metrics.totalDonations);
```

### api

Handles HTTP API requests.

**Functions:**
- `get(url, options)` - GET request
- `post(url, data, options)` - POST request
- `put(url, data, options)` - PUT request
- `delete(url, options)` - DELETE request
- `setAuthToken(token)` - Set authentication token

**Usage:**
```javascript
import { get, post } from '../services/api';

const projects = await get('/api/projects');
const newProject = await post('/api/projects', { name: 'New Project' });
```

### userPreferences

Manages user preferences and settings.

**Functions:**
- `getPreference(key, defaultValue)` - Get preference
- `setPreference(key, value)` - Set preference
- `removePreference(key)` - Remove preference
- `clearAllPreferences()` - Clear all preferences
- `getAllPreferences()` - Get all preferences
- `themePreferences` - Theme preference functions
- `notificationPreferences` - Notification preference functions
- `dashboardPreferences` - Dashboard preference functions
- `privacyPreferences` - Privacy preference functions

**Usage:**
```javascript
import { getPreference, setPreference } from '../services/userPreferences';

const theme = getPreference('theme', 'system');
setPreference('theme', 'dark');
```

### walletService

Handles wallet connection and blockchain operations.

**Functions:**
- `connectWallet()` - Connect wallet
- `disconnectWallet()` - Disconnect wallet
- `getAccount()` - Get account information
- `getBalance()` - Get account balance
- `sendTransaction(params)` - Send transaction
- `signMessage(message)` - Sign message

**Usage:**
```javascript
import { connectWallet, getAccount } from '../services/walletService';

const account = await connectWallet();
const balance = await getBalance(account.address);
```

## Best Practices

### Error Handling

Services should handle errors gracefully and consistently:

```javascript
// Good - consistent error handling
const apiService = {
  async getData() {
    try {
      const response = await fetch('/api/data');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      // Log error for debugging
      console.error('API Error:', error);
      
      // Re-throw or return a consistent error format
      throw new Error('Failed to fetch data');
    }
  }
};
```

### Async/Await

Use async/await for better readability:

```javascript
// Good - async/await
const userService = {
  async getUser(id) {
    const response = await fetch(`/api/users/${id}`);
    return await response.json();
  }
};

// Bad - promise chains
const userService = {
  getUser(id) {
    return fetch(`/api/users/${id}`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
};
```

### Configuration

Use configuration objects for flexibility:

```javascript
// Good - configurable service
const apiService = {
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    return await fetch(url, options);
  }
};
```

### Caching

Implement caching for performance:

```javascript
const cacheService = {
  cache: new Map(),
  
  async getData(key, fetcher, ttl = 5 * 60 * 1000) {
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data;
    }
    
    const data = await fetcher();
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  }
};
```

## Testing

Each service has corresponding unit tests in `__tests__` directories.

### Mocking Services

```javascript
// Mock a service for testing
jest.mock('../services/api', () => ({
  get: jest.fn(),
  post: jest.fn()
}));

import { get } from '../services/api';

test('fetches projects', async () => {
  const mockProjects = [{ id: 1, name: 'Project 1' }];
  get.mockResolvedValue(mockProjects);
  
  const projects = await fetchProjects();
  
  expect(projects).toEqual(mockProjects);
  expect(get).toHaveBeenCalledWith('/api/projects');
});
```

## Documentation

Each service should include:

1. **JSDoc comments** explaining functions and parameters
2. **Usage examples** in the documentation
3. **Unit tests** covering all functionality
4. **Type definitions** (if using TypeScript)

## Security

Services should follow security best practices:

### Authentication

```javascript
const apiService = {
  authToken: null,
  
  setAuthToken(token) {
    this.authToken = token;
  },
  
  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }
    
    return await fetch(endpoint, { ...options, headers });
  }
};
```

### Input Validation

```javascript
const userService = {
  async createUser(userData) {
    // Validate input
    if (!userData.email || !userData.password) {
      throw new Error('Email and password are required');
    }
    
    // Sanitize input
    const sanitizedData = {
      email: userData.email.trim().toLowerCase(),
      name: userData.name?.trim() || ''
    };
    
    return await this.api.post('/api/users', sanitizedData);
  }
};
```

## Performance

Services should be optimized for performance:

### Batch Requests

```javascript
const batchService = {
  async batchGet(ids) {
    // Instead of multiple requests, make one batch request
    return await this.api.post('/api/batch', { ids });
  }
};
```

### Lazy Loading

```javascript
const lazyService = {
  _service: null,
  
  getService() {
    if (!this._service) {
      this._service = import('./heavy-service');
    }
    return this._service;
  },
  
  async doSomething() {
    const service = await this.getService();
    return service.default.process();
  }
};
```

## Migration

When migrating services:

1. Identify business logic in components
2. Extract logic into service functions
3. Ensure services are testable
4. Update components to use services
5. Test thoroughly

## Error Boundaries

Services should work well with React error boundaries:

```javascript
// Service that throws specific error types
class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const apiService = {
  async getData() {
    const response = await fetch('/api/data');
    
    if (!response.ok) {
      throw new ApiError('Failed to fetch data', response.status);
    }
    
    return await response.json();
  }
};
```

## Logging

Services should include appropriate logging:

```javascript
const loggingService = {
  log(level, message, data) {
    if (process.env.NODE_ENV === 'development') {
      console[level](`[${level.toUpperCase()}] ${message}`, data);
    }
    
    // In production, send to logging service
    if (level === 'error') {
      this.sendToLoggingService({ level, message, data });
    }
  },
  
  info(message, data) {
    this.log('info', message, data);
  },
  
  error(message, data) {
    this.log('error', message, data);
  }
};
```