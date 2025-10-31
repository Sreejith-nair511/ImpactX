# Utilities Guide

This guide documents the utility functions in ImpactX.

## Overview

ImpactX includes a collection of utility functions located in `src/utils/`. These utilities are designed to:

- Provide common helper functions
- Promote code reuse
- Improve code readability
- Handle data formatting and transformation
- Simplify complex operations

## Utility List

### dataFormatter

Handles data formatting and transformation.

**Functions:**
- `formatNumber(num)` - Format large numbers with commas (1000 → 1K)
- `formatCurrency(amount, currency)` - Format currency values ($1000)
- `formatDate(date)` - Format dates for display (Jun 15, 2023)
- `formatPercentage(value, decimals)` - Format percentage values (12.5%)
- `truncateText(text, maxLength)` - Truncate text with ellipsis
- `capitalizeWords(str)` - Capitalize first letter of each word
- `snakeToTitleCase(str)` - Convert snake_case to Title Case
- `generateId()` - Generate random ID
- `deepClone(obj)` - Deep clone an object
- `debounce(func, delay)` - Debounce function

**Usage:**
```javascript
import { formatCurrency, formatDate } from '../utils/dataFormatter';

const amount = formatCurrency(12500); // "$12,500"
const date = formatDate(new Date()); // "Jun 15, 2023"
```

### authHelper

Handles authentication-related utilities.

**Functions:**
- `isAuthenticated()` - Check if user is authenticated
- `getToken()` - Get authentication token
- `setToken(token)` - Set authentication token
- `removeToken()` - Remove authentication token
- `hasRole(role)` - Check if user has specific role
- `hasPermission(permission)` - Check if user has specific permission

**Usage:**
```javascript
import { isAuthenticated, hasRole } from '../utils/authHelper';

if (isAuthenticated()) {
  console.log('User is logged in');
}

if (hasRole('admin')) {
  console.log('User is admin');
}
```

## Best Practices

### Pure Functions

Utilities should be pure functions when possible:

```javascript
// Good - pure function
const mathUtils = {
  add(a, b) {
    return a + b;
  }
};

// Bad - impure function
const impureUtils = {
  counter: 0,
  
  increment() {
    return ++this.counter; // Side effect
  }
};
```

### Immutability

Utilities should avoid mutating input parameters:

```javascript
// Good - immutable
const arrayUtils = {
  addElement(arr, element) {
    return [...arr, element]; // Creates new array
  }
};

// Bad - mutates input
const arrayUtils = {
  addElement(arr, element) {
    arr.push(element); // Mutates original array
    return arr;
  }
};
```

### Error Handling

Utilities should handle errors gracefully:

```javascript
// Good - handles edge cases
const stringUtils = {
  capitalize(str) {
    if (!str || typeof str !== 'string') {
      return '';
    }
    
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

// Bad - doesn't handle edge cases
const stringUtils = {
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1); // Error if str is null
  }
};
```

### Type Safety

Utilities should validate input types:

```javascript
// Good - type validation
const numberUtils = {
  formatPercent(value) {
    if (typeof value !== 'number') {
      throw new Error('Value must be a number');
    }
    
    return value.toFixed(2) + '%';
  }
};
```

## Testing

Each utility function should have corresponding unit tests.

### Testing Utilities

```javascript
// dataFormatter.test.js
import { formatNumber, formatCurrency } from '../dataFormatter';

describe('dataFormatter', () => {
  describe('formatNumber', () => {
    test('formats numbers correctly', () => {
      expect(formatNumber(1000)).toBe('1K');
      expect(formatNumber(1500)).toBe('1.5K');
      expect(formatNumber(1000000)).toBe('1M');
    });
  });
  
  describe('formatCurrency', () => {
    test('formats currency correctly', () => {
      expect(formatCurrency(1000)).toBe('$1,000');
      expect(formatCurrency(1000, 'EUR')).toBe('€1,000');
    });
  });
});
```

## Documentation

Each utility function should include:

1. **JSDoc comments** explaining parameters and return values
2. **Usage examples** in the documentation
3. **Unit tests** covering all functionality
4. **Type definitions** (if using TypeScript)

## Performance

Utilities should be optimized for performance:

### Memoization

```javascript
// Memoize expensive calculations
const memoizedUtils = {
  _cache: new Map(),
  
  expensiveCalculation(input) {
    if (this._cache.has(input)) {
      return this._cache.get(input);
    }
    
    const result = this.doExpensiveCalculation(input);
    this._cache.set(input, result);
    
    return result;
  }
};
```

### Efficient Algorithms

```javascript
// Good - efficient algorithm
const arrayUtils = {
  unique(arr) {
    return [...new Set(arr)]; // O(n)
  }
};

// Bad - inefficient algorithm
const arrayUtils = {
  unique(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index); // O(n²)
  }
};
```

## Reusability

Utilities should be generic and reusable:

```javascript
// Good - generic utility
const objectUtils = {
  deepMerge(target, source) {
    // Works with any objects
    const result = { ...target };
    
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    
    return result;
  }
};

// Bad - specific to one use case
const specificUtils = {
  mergeUserSettings(defaultSettings, userSettings) {
    // Only works for user settings
    return { ...defaultSettings, ...userSettings };
  }
};
```

## Migration

When migrating utilities:

1. Identify duplicate code in components
2. Extract common functionality into utility functions
3. Ensure utilities are testable
4. Update components to use utilities
5. Test thoroughly

## Error Boundaries

Utilities should work well with error boundaries:

```javascript
// Utility that throws specific error types
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.field = field;
  }
}

const validationUtils = {
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      throw new ValidationError('Invalid email format', 'email');
    }
    
    return true;
  }
};
```

## Logging

Utilities should include appropriate logging for debugging:

```javascript
const debugUtils = {
  log(level, message, data) {
    if (process.env.NODE_ENV === 'development') {
      console[level](`[${level.toUpperCase()}] ${message}`, data);
    }
  },
  
  debug(message, data) {
    this.log('debug', message, data);
  }
};
```

## Browser Compatibility

Utilities should work across different browsers:

```javascript
// Good - compatible with older browsers
const compatUtils = {
  isArray(arr) {
    return Array.isArray ? Array.isArray(arr) : Object.prototype.toString.call(arr) === '[object Array]';
  }
};

// Bad - not compatible with older browsers
const modernUtils = {
  isArray(arr) {
    return Array.isArray(arr); // Not supported in IE8
  }
};
```

## Code Organization

Utilities should be organized logically:

```
src/utils/
  dataFormatter.js
  authHelper.js
  arrayUtils.js
  objectUtils.js
  stringUtils.js
  numberUtils.js
  dateUtils.js
  validationUtils.js
```

Each file should focus on a specific domain or type of utility.