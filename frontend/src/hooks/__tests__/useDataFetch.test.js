import { renderHook, act } from '@testing-library/react';
import { useDataFetch, useDebounce, usePagination } from '../useDataFetch';

describe('useDataFetch', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('fetches data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const { result } = renderHook(() => useDataFetch('/api/test'));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  test('handles fetch errors', async () => {
    fetch.mockRejectOnce(new Error('API Error'));

    const { result } = renderHook(() => useDataFetch('/api/test'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('API Error');
  });

  test('does not fetch when url is empty', async () => {
    const { result } = renderHook(() => useDataFetch(''));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });
});

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('debounces value updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current[0]).toBe('initial');
    expect(result.current[2]).toBe('initial');

    rerender({ value: 'updated' });

    expect(result.current[0]).toBe('updated');
    expect(result.current[2]).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current[0]).toBe('updated');
    expect(result.current[2]).toBe('updated');
  });
});

describe('usePagination', () => {
  const testData = Array.from({ length: 20 }, (_, i) => ({ id: i, name: `Item ${i}` }));

  test('returns correct initial state', () => {
    const { result } = renderHook(() => usePagination(testData, 5));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.maxPage).toBe(4);
    expect(result.current.currentData).toHaveLength(5);
    expect(result.current.currentData[0]).toEqual({ id: 0, name: 'Item 0' });
  });

  test('navigates to next page', () => {
    const { result } = renderHook(() => usePagination(testData, 5));

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentData[0]).toEqual({ id: 5, name: 'Item 5' });
  });

  test('navigates to previous page', () => {
    const { result } = renderHook(() => usePagination(testData, 5));

    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.currentPage).toBe(3);

    act(() => {
      result.current.prevPage();
    });

    expect(result.current.currentPage).toBe(2);
  });

  test('goes to specific page', () => {
    const { result } = renderHook(() => usePagination(testData, 5));

    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.currentData[0]).toEqual({ id: 10, name: 'Item 10' });
  });

  test('prevents going beyond last page', () => {
    const { result } = renderHook(() => usePagination(testData, 5));

    act(() => {
      result.current.goToPage(10);
    });

    expect(result.current.currentPage).toBe(4);
  });

  test('prevents going before first page', () => {
    const { result } = renderHook(() => usePagination(testData, 5));

    act(() => {
      result.current.prevPage();
    });

    expect(result.current.currentPage).toBe(1);
  });
});