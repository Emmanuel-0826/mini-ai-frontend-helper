// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

/**
 * Custom hook for managing localStorage with React state
 * @param {string} key - The localStorage key
 * @param {any} initialValue - Initial value if key doesn't exist
 * @returns {[any, function]} - [storedValue, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is executed only once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
          console.error(`Error parsing storage change for key "${key}":`, error);
        }
      }
    };

    // Add event listener
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
};

/**
 * Hook to get value from localStorage with SSR support
 * @param {string} key - The localStorage key
 * @param {any} initialValue - Initial value if key doesn't exist
 */
export const useLocalStorageSSR = (key, initialValue) => {
  // Check if window is defined (for SSR)
  const isBrowser = typeof window !== 'undefined';
  
  const [storedValue, setStoredValue] = useState(() => {
    if (!isBrowser) return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    if (!isBrowser) return;
    
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

/**
 * Hook to manage multiple localStorage items
 * @param {Object} defaults - Object with default values
 * @returns {[Object, function]} - [values, setValues]
 */
export const useLocalStorageMulti = (defaults = {}) => {
  const [values, setValues] = useState(() => {
    const result = {};
    Object.entries(defaults).forEach(([key, defaultValue]) => {
      try {
        const item = window.localStorage.getItem(key);
        result[key] = item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        result[key] = defaultValue;
      }
    });
    return result;
  });

  const setValues = (newValues) => {
    setValues((prevValues) => {
      const updated = { ...prevValues, ...newValues };
      Object.entries(newValues).forEach(([key, value]) => {
        try {
          window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
          console.error(`Error setting localStorage key "${key}":`, error);
        }
      });
      return updated;
    });
  };

  return [values, setValues];
};

/**
 * Hook to remove items from localStorage
 * @param {string|string[]} keys - Key or array of keys to remove
 */
export const useRemoveLocalStorage = (keys) => {
  const removeItems = () => {
    const keysToRemove = Array.isArray(keys) ? keys : [keys];
    keysToRemove.forEach(key => {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing localStorage key "${key}":`, error);
      }
    });
  };

  return removeItems;
};