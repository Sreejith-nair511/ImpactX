import { renderHook } from '@testing-library/react';
import { useChartData, useChartColors, useChartDimensions } from '../useChartData';

describe('useChartData', () => {
  test('processes chart data correctly', () => {
    const rawData = [
      { month: 'Jan', donations: 1000, impact: 50 },
      { month: 'Feb', donations: 2000, impact: 75 },
      { month: 'Mar', donations: 1500, impact: 60 }
    ];

    const { result } = renderHook(() => 
      useChartData(rawData, 'month', ['donations', 'impact'])
    );

    expect(result.current.loading).toBe(false);
    expect(result.current.chartData).toEqual([
      { month: 'Jan', donations: 1000, impact: 50 },
      { month: 'Feb', donations: 2000, impact: 75 },
      { month: 'Mar', donations: 1500, impact: 60 }
    ]);
  });

  test('handles empty data', () => {
    const { result } = renderHook(() => 
      useChartData([], 'month', ['donations', 'impact'])
    );

    expect(result.current.loading).toBe(false);
    expect(result.current.chartData).toEqual([]);
  });

  test('handles null data', () => {
    const { result } = renderHook(() => 
      useChartData(null, 'month', ['donations', 'impact'])
    );

    expect(result.current.loading).toBe(false);
    expect(result.current.chartData).toEqual([]);
  });
});

describe('useChartColors', () => {
  test('generates correct number of colors', () => {
    const { result } = renderHook(() => useChartColors(5));
    
    expect(result.current).toHaveLength(5);
    expect(typeof result.current[0]).toBe('string');
  });

  test('cycles through base colors when count exceeds base colors', () => {
    const { result } = renderHook(() => useChartColors(10));
    
    // Should cycle through the base colors
    expect(result.current[0]).toBe(result.current[8]); // First and ninth should be the same
    expect(result.current[1]).toBe(result.current[9]); // Second and tenth should be the same
  });
});

describe('useChartDimensions', () => {
  test('returns initial dimensions', () => {
    const mockRef = { current: { getBoundingClientRect: () => ({ width: 800 }) } };
    
    const { result } = renderHook(() => useChartDimensions(mockRef));
    
    expect(result.current.width).toBeGreaterThanOrEqual(300);
    expect(result.current.height).toBeGreaterThanOrEqual(200);
    expect(result.current.margin).toEqual({ 
      top: 20, 
      right: 30, 
      bottom: 40, 
      left: 50 
    });
  });

  test('calculates height based on width', () => {
    const mockRef = { current: { getBoundingClientRect: () => ({ width: 600 }) } };
    
    const { result } = renderHook(() => useChartDimensions(mockRef));
    
    // Height should be 60% of width (360) but at least 200
    expect(result.current.height).toBe(360);
  });

  test('ensures minimum dimensions', () => {
    const mockRef = { current: { getBoundingClientRect: () => ({ width: 100 }) } };
    
    const { result } = renderHook(() => useChartDimensions(mockRef));
    
    // Should enforce minimum width of 300
    expect(result.current.width).toBe(300);
    expect(result.current.height).toBe(200);
  });
});