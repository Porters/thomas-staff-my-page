import { useState, useEffect } from 'react';

interface UseCountdownReturn {
  countdown: number;
  isExpired: boolean;
  resetCountdown: () => void;
}

/**
 * Custom hook for countdown timer
 */
export const useCountdown = (initialSeconds: number): UseCountdownReturn => {
  const [countdown, setCountdown] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (isActive && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0) {
      setIsActive(false);
    }
  }, [isActive, countdown]);

  const resetCountdown = () => {
    setCountdown(initialSeconds);
    setIsActive(true);
  };

  return {
    countdown,
    isExpired: countdown === 0,
    resetCountdown,
  };
};
