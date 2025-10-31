# Testing Guide

This guide explains how to run and write tests for the ImpactX frontend.

## Overview

ImpactX uses Jest and React Testing Library for testing:

- **Jest** - JavaScript testing framework
- **React Testing Library** - React component testing utilities
- **Jest DOM** - Custom Jest matchers for DOM assertions

## Test Structure

Tests are organized in `__tests__` directories alongside the code they test:

```
src/
  components/
    ui/
      Button.jsx
      __tests__/
        Button.test.js
  hooks/
    useAuth.js
    __tests__/
      useAuth.test.js
  services/
    api.js
    __tests__/
      api.test.js
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

## Writing Tests

### Component Tests

Use React Testing Library to test components:

```javascript
import { render, screen } from '@testing-library/react';
import Button from '../Button';

test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### Hook Tests

Use React Testing Library's `renderHook` utility:

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

### Service Tests

Mock external dependencies:

```javascript
import { getData } from '../api';
import fetchMock from 'jest-fetch-mock';

jest.mock('jest-fetch-mock');

test('fetches data successfully', async () => {
  const mockData = { id: 1, name: 'Test' };
  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  const data = await getData();
  
  expect(data).toEqual(mockData);
});
```

## Mocking

### Mocking Modules

```javascript
// Mock a module
jest.mock('../api', () => ({
  getData: jest.fn().mockResolvedValue({ id: 1, name: 'Test' })
}));
```

### Mocking localStorage

```javascript
// localStorage is automatically mocked in setupTests.js
// You can interact with it directly in tests
localStorage.setItem('key', 'value');
expect(localStorage.getItem('key')).toBe('value');
```

### Mocking Window Properties

```javascript
// Mock window.matchMedia (already done in setupTests.js)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

## Test Coverage

Aim for the following coverage targets:

- **Statements**: 80%
- **Branches**: 70%
- **Functions**: 80%
- **Lines**: 80%

View coverage reports in the `coverage/` directory after running `npm run test:coverage`.

## Best Practices

1. **Test behavior, not implementation**
   - Focus on what the component does rather than how it does it
   - Avoid testing internal state unless necessary

2. **Use descriptive test names**
   ```javascript
   // Good
   test('shows error message when login fails', () => { ... });
   
   // Bad
   test('login error', () => { ... });
   ```

3. **Test edge cases**
   - Empty states
   - Error conditions
   - Boundary values

4. **Keep tests isolated**
   - Each test should be independent
   - Use beforeEach/afterEach for setup/teardown

5. **Mock external dependencies**
   - API calls
   - Browser APIs
   - Third-party libraries

## Continuous Integration

Tests are run automatically in CI pipelines. All tests must pass before merging changes.

## Troubleshooting

### Tests Failing Due to Async Operations

Use `act` to wrap asynchronous operations:

```javascript
import { act } from '@testing-library/react';

test('handles async operation', async () => {
  await act(async () => {
    await someAsyncOperation();
  });
});
```

### Tests Failing Due to Timers

Use Jest's timer mocks:

```javascript
jest.useFakeTimers();

test('handles delayed operation', () => {
  const fn = jest.fn();
  setTimeout(fn, 1000);
  
  jest.advanceTimersByTime(1000);
  
  expect(fn).toHaveBeenCalled();
});
```