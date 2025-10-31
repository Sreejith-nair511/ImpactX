# Hooks Guide

This guide documents the custom hooks in ImpactX.

## Overview

ImpactX includes a collection of custom React hooks located in `src/hooks/`. These hooks are designed to:

- Encapsulate complex logic
- Promote code reuse
- Improve component readability
- Follow React best practices

## Hook List

### useAuth

Manages authentication state and operations.

**Returns:**
- `user` (object) - Current user object
- `isAuthenticated` (boolean) - Authentication status
- `login` (function) - Login function
- `logout` (function) - Logout function
- `register` (function) - Registration function

**Usage:**
```jsx
import { useAuth } from '../hooks/useAuth';

const { user, isAuthenticated, login, logout, register } = useAuth();

if (isAuthenticated) {
  console.log('User:', user);
}
```

### useChartData

Processes and manages chart data.

**Parameters:**
- `rawData` (array) - Raw data from API
- `xAxisKey` (string) - Key for x-axis values
- `yAxisKeys` (array) - Keys for y-axis values

**Returns:**
- `chartData` (array) - Processed chart data
- `loading` (boolean) - Loading state

**Usage:**
```jsx
import { useChartData } from '../hooks/useChartData';

const rawData = [
  { month: 'Jan', donations: 1000, impact: 50 },
  { month: 'Feb', donations: 2000, impact: 75 }
];

const { chartData, loading } = useChartData(rawData, 'month', ['donations', 'impact']);
```

### useChartColors

Generates consistent chart colors.

**Parameters:**
- `count` (number) - Number of colors needed

**Returns:**
- `colors` (array) - Array of color strings

**Usage:**
```jsx
import { useChartColors } from '../hooks/useChartColors';

const colors = useChartColors(5);
```

### useChartDimensions

Manages chart dimensions and responsiveness.

**Parameters:**
- `containerRef` (object) - Reference to chart container

**Returns:**
- `dimensions` (object) - Chart dimensions object

**Usage:**
```jsx
import { useChartDimensions } from '../hooks/useChartColors';
import { useRef } from 'react';

const containerRef = useRef();
const dimensions = useChartDimensions(containerRef);
```

### useDataFetch

Fetches data with loading and error states.

**Parameters:**
- `url` (string) - API endpoint URL
- `options` (object) - Fetch options

**Returns:**
- `data` (object) - Fetched data
- `loading` (boolean) - Loading state
- `error` (string) - Error message

**Usage:**
```jsx
import { useDataFetch } from '../hooks/useDataFetch';

const { data, loading, error } = useDataFetch('/api/projects');
```

### useDebounce

Debounces value updates.

**Parameters:**
- `initialValue` (any) - Initial value
- `delay` (number) - Debounce delay in ms

**Returns:**
- `value` (any) - Current value
- `setValue` (function) - Value setter
- `debouncedValue` (any) - Debounced value

**Usage:**
```jsx
import { useDebounce } from '../hooks/useDataFetch';
import { useState } from 'react';

const [searchTerm, setSearchTerm] = useState('');
const [value, setValue, debouncedValue] = useDebounce(searchTerm, 500);
```

### usePagination

Manages pagination state.

**Parameters:**
- `data` (array) - Full dataset
- `itemsPerPage` (number) - Items per page

**Returns:**
- `currentPage` (number) - Current page
- `maxPage` (number) - Maximum page
- `currentData` (array) - Current page data
- `nextPage` (function) - Next page function
- `prevPage` (function) - Previous page function
- `goToPage` (function) - Go to page function

**Usage:**
```jsx
import { usePagination } from '../hooks/useDataFetch';

const data = Array.from({ length: 100 }, (_, i) => ({ id: i, name: `Item ${i}` }));
const { currentPage, maxPage, currentData, nextPage, prevPage, goToPage } = usePagination(data, 10);
```

### usePreferences

Manages user preferences.

**Returns:**
- `theme` (string) - Current theme
- `darkMode` (boolean) - Dark mode preference
- `updateTheme` (function) - Theme updater
- `toggleDarkMode` (function) - Dark mode toggler

**Usage:**
```jsx
import { usePreferences } from '../hooks/usePreferences';

const { theme, darkMode, updateTheme, toggleDarkMode } = usePreferences();
```

### useWallet

Manages wallet connection and operations.

**Returns:**
- `address` (string) - Wallet address
- `balance` (number) - Wallet balance
- `connect` (function) - Connect wallet
- `disconnect` (function) - Disconnect wallet
- `sendTransaction` (function) - Send transaction

**Usage:**
```jsx
import { useWallet } from '../hooks/useWallet';

const { address, balance, connect, disconnect, sendTransaction } = useWallet();
```

## Best Practices

### Naming Conventions

- Use `use` prefix for custom hooks
- Use descriptive names that indicate purpose
- Follow camelCase naming

### Return Consistent Shapes

```javascript
// Good - consistent return shape
const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  return { data, loading, error };
};

// Bad - inconsistent return shape
const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Sometimes returns different shapes
  if (error) {
    return { error };
  }
  
  return { data, loading };
};
```

### Handle Cleanup

```javascript
// Good - cleanup effects
const useEventListener = (target, event, handler) => {
  useEffect(() => {
    target.addEventListener(event, handler);
    
    return () => {
      target.removeEventListener(event, handler);
    };
  }, [target, event, handler]);
};
```

### Optimize Performance

```javascript
// Good - memoize expensive calculations
const useExpensiveCalculation = (data) => {
  const result = useMemo(() => {
    // Expensive calculation
    return data.map(item => expensiveTransform(item));
  }, [data]);
  
  return result;
};
```

## Testing

Each hook has corresponding unit tests in `__tests__` directories.

### Testing Hooks

```javascript
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../useCounter';

test('increments counter', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

## Error Handling

Hooks should handle errors gracefully:

```javascript
const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (url) {
      fetchData();
    }
  }, [url]);
  
  return { data, loading, error };
};
```

## Documentation

Each hook should include:

1. **JSDoc comments** explaining parameters and return values
2. **Usage examples** in the documentation
3. **Unit tests** covering all functionality
4. **Type definitions** (if using TypeScript)

## Migration from Class Components

When migrating from class components to hooks:

1. Identify state and lifecycle methods
2. Replace state with `useState` or `useReducer`
3. Replace lifecycle methods with `useEffect`
4. Extract complex logic into custom hooks
5. Test thoroughly

## Performance Considerations

### useMemo

Memoize expensive calculations:

```javascript
const useExpensiveCalculation = (data) => {
  const result = useMemo(() => {
    // Expensive calculation
    return data.map(item => expensiveTransform(item));
  }, [data]);
  
  return result;
};
```

### useCallback

Memoize callback functions:

```javascript
const useApi = () => {
  const [data, setData] = useState(null);
  
  const fetchData = useCallback(async () => {
    const response = await fetch('/api/data');
    const result = await response.json();
    setData(result);
  }, []);
  
  return { data, fetchData };
};
```

### useReducer

Manage complex state logic:

```javascript
const initialState = { count: 0, step: 1 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'setStep':
      return { ...state, step: action.step };
    default:
      throw new Error();
  }
};

const useCounter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return {
    count: state.count,
    step: state.step,
    increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch({ type: 'decrement' }),
    setStep: (step) => dispatch({ type: 'setStep', step })
  };
};
```