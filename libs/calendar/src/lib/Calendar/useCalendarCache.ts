import { createGlobalState } from 'react-use';

export type CalendarCache = {
  [isoDate: string]: unknown[];
};

// A cache of the data for each month of the calendar.
// The key is the ISO date of the first day of the month.
// The value is an array of the data of the month.
export const useCalendarCache = createGlobalState<CalendarCache>({});

export default useCalendarCache;
