import {
  formatNumber,
  formatCurrency,
  formatDate,
  formatPercentage,
  truncateText,
  capitalizeWords,
  snakeToTitleCase,
  generateId,
  deepClone,
  debounce
} from '../dataFormatter';

describe('dataFormatter', () => {
  describe('formatNumber', () => {
    test('formats numbers correctly', () => {
      expect(formatNumber(1000)).toBe('1K');
      expect(formatNumber(1500)).toBe('1.5K');
      expect(formatNumber(1000000)).toBe('1M');
      expect(formatNumber(1500000)).toBe('1.5M');
      expect(formatNumber(500)).toBe('500');
    });
  });

  describe('formatCurrency', () => {
    test('formats currency correctly', () => {
      expect(formatCurrency(1000)).toBe('$1,000');
      expect(formatCurrency(1500.50)).toBe('$1,500');
      expect(formatCurrency(1000000)).toBe('$1,000,000');
    });

    test('formats currency with different currencies', () => {
      expect(formatCurrency(1000, 'EUR')).toBe('€1,000');
      expect(formatCurrency(1000, 'GBP')).toBe('£1,000');
    });
  });

  describe('formatDate', () => {
    test('formats dates correctly', () => {
      const date = new Date('2023-06-15');
      expect(formatDate(date)).toBe('Jun 15, 2023');
    });

    test('formats date strings correctly', () => {
      expect(formatDate('2023-06-15')).toBe('Jun 15, 2023');
    });
  });

  describe('formatPercentage', () => {
    test('formats percentages correctly', () => {
      expect(formatPercentage(12.5)).toBe('12.5%');
      expect(formatPercentage(12.56, 2)).toBe('12.56%');
    });
  });

  describe('truncateText', () => {
    test('truncates text correctly', () => {
      expect(truncateText('This is a long text', 10)).toBe('This is a ...');
      expect(truncateText('Short', 10)).toBe('Short');
    });
  });

  describe('capitalizeWords', () => {
    test('capitalizes words correctly', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
      expect(capitalizeWords('this is a test')).toBe('This Is A Test');
    });
  });

  describe('snakeToTitleCase', () => {
    test('converts snake_case to Title Case', () => {
      expect(snakeToTitleCase('hello_world')).toBe('Hello World');
      expect(snakeToTitleCase('this_is_a_test')).toBe('This Is A Test');
    });
  });

  describe('generateId', () => {
    test('generates unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
    });
  });

  describe('deepClone', () => {
    test('creates deep clone of objects', () => {
      const obj = { a: 1, b: { c: 2 } };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.b).not.toBe(obj.b);
    });
  });

  describe('debounce', () => {
    test('debounces function calls', () => {
      jest.useFakeTimers();
      const func = jest.fn();
      const debouncedFunc = debounce(func, 1000);

      debouncedFunc();
      debouncedFunc();
      debouncedFunc();

      expect(func).not.toBeCalled();

      jest.advanceTimersByTime(1000);
      expect(func).toBeCalledTimes(1);
    });
  });
});