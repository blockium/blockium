import { startOfMonth } from 'date-fns';

import useCalendarData from './useCalendarData';

export const useMonthData = (date: Date) => {
  const [monthData] = useCalendarData();
  return monthData[startOfMonth(date).toISOString()];
};

export default useMonthData;
