import { useRef } from "react";

function useDebounce(cb, delay = 2000) {
    const timerRef = useRef(null);

    return (...args) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            cb(...args);
        }, delay);
    };
}

export default useDebounce;