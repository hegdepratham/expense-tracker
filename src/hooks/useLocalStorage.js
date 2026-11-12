
import { useState, useEffect, useRef } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      if (item !== null) {
        return JSON.parse(item);
      }

      return typeof initialValue === "function"
        ? initialValue()
        : initialValue;
    } catch (error) {
      console.error("Error loading LocalStorage:", error);

      return typeof initialValue === "function"
        ? initialValue()
        : initialValue;
    }
  });

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      try {
        window.localStorage.setItem(
          key,
          JSON.stringify(storedValue)
        );
      } catch (error) {
        console.error("Error saving to LocalStorage:", error);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
