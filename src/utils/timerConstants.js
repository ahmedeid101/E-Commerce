// Timer unit constraints
export const TIMER_CONSTANTS = {
  MAX_SECONDS: 59,
  MAX_MINUTES: 59,
  MAX_HOURS: 23,
};

// Timer unit transitions
export const TIMER_TRANSITIONS = {
  SECONDS_PER_MINUTE: 60,
  MINUTES_PER_HOUR: 60,
  HOURS_PER_DAY: 24,
  TIMER_INTERVAL: 1000, // 1 second
};

// Default timer format
export const DEFAULT_TIMER_FORMAT = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};
