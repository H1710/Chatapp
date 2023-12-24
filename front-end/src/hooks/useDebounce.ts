import { useEffect, useState } from 'react';

/**
 * Custom hook for debouncing a value.
 * @param value - The value to be debounced.
 * @param delay - The delay duration in milliseconds.
 * @returns The debounced value.
 */
export default function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
