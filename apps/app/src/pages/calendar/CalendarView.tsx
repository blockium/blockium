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
import { Box, Button, Typography } from '@mui/material';

import { MonthYearPicker, useCurrentDate } from '@postgpt/ui-common';
import {
  DRAWER_WIDTH,
  useNavbarExtraLine,
  useToolbarExtra,
} from '@postgpt/ui-mininal-tmpl';
import { msg } from '@postgpt/i18n';

import CalendarMonth from './CalendarMonth'; // Import the MonthView component
import { useCalendarCache, CalendarCache } from './useCalendarCache';

const MONTHS_TO_ADD = 12;

// TODO: Move to useExtendNavbar hook
const useExtendNavbar = () => {
  const [, setCurrentDate] = useCurrentDate();
  const [, setToolbarExtra] = useToolbarExtra();
  const [, setNavbarExtraLine] = useNavbarExtraLine();

  useEffect(() => {
    const toolbarExtra = (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          marginRight: (theme) => theme.spacing(2),
        }}
      >
        <MonthYearPicker label={msg('app.page.calendar.filter.date')} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentDate(new Date())}
        >
          {msg('app.button.today')}
        </Button>
      </Box>
    );
    setToolbarExtra(toolbarExtra);

    const navbarExtraLine = (
      <Box
        sx={{
          paddingTop: (theme) => theme.spacing(2),
          paddingLeft: (theme) => theme.spacing(2),
          paddingRight: (theme) => theme.spacing(2),

          width: (theme) => {
            const { lg } = theme.breakpoints.values;
            return {
              xs: '100%',
              lg: `calc(${lg}-${DRAWER_WIDTH})`,
              xl: `calc(${lg}px - ${theme.spacing(6)})`,
            };
          },

          margin: '0 auto',
          display: 'grid',
          justifyItems: 'center',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 2,
        }}
      >
        {[
          msg('app.monday-short'),
          msg('app.tuesday-short'),
          msg('app.wednesday-short'),
          msg('app.thursday-short'),
          msg('app.friday-short'),
          msg('app.saturday-short'),
          msg('app.sunday-short'),
        ].map((day, index) => (
          <Typography
            color={(theme) =>
              theme.palette.mode === 'light' ? 'primary.dark' : 'primary.light'
            }
            key={index}
            component="div"
            variant="subtitle1"
          >
            {day}
          </Typography>
        ))}
      </Box>
    );
    setNavbarExtraLine(navbarExtraLine);

    return () => {
      setToolbarExtra(<div></div>);
      setNavbarExtraLine(<div></div>);
    };
    //
  }, [setCurrentDate, setNavbarExtraLine, setToolbarExtra]);
};

interface ICalendarViewProps {
  onWeekClick?: (weekStartDate: Date, element: HTMLElement | null) => void;
  fetchMonthData?: (monthStartDate: Date) => Promise<unknown[]>;
  renderDay?: (dayDate: Date, monthData: unknown[]) => ReactNode;
}

// TODO: !!! Use a callback to do generate this visual component, in order to generalize this component to be used in other places. The call will be like this: onDayRender: (day: number, month: number, year: number, dayView: ReactNode) => ReactNode

// No priority:
// TODO: Move Calendar components to a new library ui-calendar, so it can be used in other projects.
// TODO: Add onDayClick callback to Calendar, so it can be used in other projects.
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
