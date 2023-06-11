import { Dispatch, SetStateAction, useEffect, useState } from "react";


function useLocalStorage<T>(key: string, initialValue: T) : [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export default useLocalStorage;
