import { startOfMonth } from 'date-fns';

import { useCalendarCache } from './useCalendarCache';

export const useMonthData = (date: Date) => {
  const [calendarCache] = useCalendarCache();
  return calendarCache[startOfMonth(date).toISOString()];
};

export default useMonthData;
