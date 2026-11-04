
import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const savedValue = localStorage.getItem(key);

            return savedValue ? JSON.parse(savedValue) as T : initialValue;
        } catch (error) {
            console.error("Error reading localStorage:", error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    }, [key, value]);

    return [value, setValue] as const;
}

export default useLocalStorage;
