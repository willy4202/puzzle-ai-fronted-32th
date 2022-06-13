import {useEffect, useState} from 'react';

function useDebounce<T = unknown>(stateValue: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState<T>(stateValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(stateValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [stateValue, delay]);

  return debounceValue;
}

export default useDebounce;
