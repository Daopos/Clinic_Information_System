import { useState, useEffect } from "react";

/**
 * Custom hook that delays showing a loading state to prevent spinner flashes
 * @param isLoading - The actual loading state
 * @param delay - Delay in milliseconds before showing the spinner (default: 250ms)
 * @returns boolean indicating whether to show the spinner
 */
export const useDelayedLoading = (
  isLoading: boolean,
  delay: number = 250
): boolean => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isLoading) {
      timeoutId = setTimeout(() => {
        setShowSpinner(true);
      }, delay);
    } else {
      setShowSpinner(false);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading, delay]);

  return showSpinner;
};
