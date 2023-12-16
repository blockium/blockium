import {
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useIntersection } from 'react-use';
import { addMonths, startOfMonth } from 'date-fns';
import { Box } from '@mui/material';

import CalendarMonth from './CalendarMonth'; // Import the MonthView component
import { useCurrentDate } from '../hooks';
import { useExtendNavbar } from './useExtendNavbar';
import { useCalendarCache, CalendarCache } from './useCalendarCache';

const MONTHS_TO_ADD = 12;

interface ICalendarViewProps {
  onWeekClick?: (weekStartDate: Date, element: HTMLElement | null) => void;
  fetchMonthData?: (monthStartDate: Date) => Promise<unknown[]>;
  renderDay?: (dayDate: Date, monthData: unknown[]) => ReactNode;
}

// No priority:
// TODO: Add onDayClick callback to Calendar, so it can be used in other projects.
// TODO: Allow infinite scrolling on top
export const CalendarView: React.FC<ICalendarViewProps> = ({
  onWeekClick,
  fetchMonthData,
  renderDay,
}) => {
  useExtendNavbar();

  const [currentDate] = useCurrentDate();

  const topDateRef = useRef(addMonths(startOfMonth(currentDate), -1));
  // Subtract 1 month to the bottom date to add current date
  const bottomDateRef = useRef(addMonths(startOfMonth(currentDate), -1));

  const [months, setMonths] = useState<ReactNode[]>([]);
  const monthsRef = useRef<ReactNode[]>([]);

  const topInsersectionRef = useRef<HTMLBaseElement>(null);
  const topIntersection = useIntersection(topInsersectionRef, {
    root: null,
    rootMargin: '-150px',
    threshold: 0,
  });

  const bottomInsersectionRef = useRef<HTMLBaseElement>(null);
  const bottomIntersection = useIntersection(bottomInsersectionRef, {
    root: null,
    rootMargin: '50%',
    threshold: 0,
  });

  // Keeps a cache of the month data to avoid re-fetching
  const [calendarCache, setCalendarCache] = useCalendarCache();
  const calendarCacheRef = useRef<CalendarCache>(calendarCache);

  const createMonthView = useCallback(
    async (monthStartDate: Date, ref?: Ref<HTMLBaseElement>) => {
      // Check if month data is already loaded
      if (
        fetchMonthData &&
        !calendarCacheRef.current[monthStartDate.toISOString()]
      ) {
        // Load month data
        const newMonthData = await fetchMonthData(monthStartDate);
        setCalendarCache((prev) => ({
          ...prev,
          [monthStartDate.toISOString()]: newMonthData,
        }));
      }
      // Otherwise, keep the cached month data

      return (
        <CalendarMonth
          key={monthStartDate.toISOString()}
          date={monthStartDate}
          ref={ref}
          onWeekClick={onWeekClick}
          renderDay={renderDay}
        />
      );
    },
    [fetchMonthData, onWeekClick, renderDay, setCalendarCache],
  );

  // Updates when the currentDate changes
  useEffect(() => {
    topDateRef.current = startOfMonth(currentDate);
    // Subtract 1 month to the bottom date to add current date
    bottomDateRef.current = addMonths(startOfMonth(currentDate), -1);

    const months: ReactNode[] = [];
    setMonths(months);
    monthsRef.current = months;
    //
  }, [currentDate]);

  // When top intersection is visible, add more months to the top
  useEffect(() => {
    if (!topIntersection) {
      return;
    }

    // Add new months to top
    const addTopMonths = async () => {
      const months = monthsRef.current;

      // Add months before
      let date = new Date(topDateRef.current);
      for (let i = 0; i < MONTHS_TO_ADD; i++) {
        date = addMonths(date, -1);
        months.unshift(await createMonthView(date));
      }
      topDateRef.current = date;

      monthsRef.current = months;
      setMonths([...months]);
    };

    topIntersection.isIntersecting && addTopMonths();
    //
  }, [createMonthView, topIntersection]);

  // When bottom intersection is visible, add more months to the bottom
  useEffect(() => {
    if (!bottomIntersection) {
      return;
    }

    // Add new months to bottom
    const addBottomMonths = async () => {
      const months = monthsRef.current;

      // Add months after
      let date = new Date(bottomDateRef.current);
      for (let i = 0; i < MONTHS_TO_ADD; i++) {
        date = addMonths(date, 1);
        months.push(await createMonthView(date));
      }
      bottomDateRef.current = date;

      monthsRef.current = months;
      setMonths([...months]);
    };

    bottomIntersection.isIntersecting && addBottomMonths();
    //
  }, [bottomIntersection, createMonthView]);

  return (
    <Box
      sx={{
        maxWidth: '100%',
        margin: (theme) => theme.spacing(0, 2),
        marginTop: (theme) => theme.spacing(8),
      }}
    >
      {/* This has an odd effect on UX, so it was commented */}
      {/* <Box ref={topInsersectionRef} sx={{ height: '5px', width: '100%' }} /> */}
      {months}
      <Box ref={bottomInsersectionRef} />
    </Box>
  );
};

export default CalendarView;
