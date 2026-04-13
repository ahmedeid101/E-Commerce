import { useState, useEffect } from 'react';
import { TIMER_CONSTANTS, TIMER_TRANSITIONS } from '../utils/timerConstants';

export const useTimer = (initialTime) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return {
            ...prev,
            minutes: prev.minutes - 1,
            seconds: TIMER_CONSTANTS.MAX_SECONDS,
          };
        } else if (prev.hours > 0) {
          return {
            ...prev,
            hours: prev.hours - 1,
            minutes: TIMER_CONSTANTS.MAX_MINUTES,
            seconds: TIMER_CONSTANTS.MAX_SECONDS,
          };
        } else if (prev.days > 0) {
          return {
            days: prev.days - 1,
            hours: TIMER_CONSTANTS.MAX_HOURS,
            minutes: TIMER_CONSTANTS.MAX_MINUTES,
            seconds: TIMER_CONSTANTS.MAX_SECONDS,
          };
        }
        return prev;
      });
    }, TIMER_TRANSITIONS.TIMER_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return timeLeft;
};