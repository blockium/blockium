import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box, Button, Typography } from '@mui/material';

import { MonthYearPicker, useCurrentDate } from '@postgpt/ui-common';
import {
  DRAWER_WIDTH,
  useNavbarExtraLine,
  useToolbarExtra,
} from '@postgpt/ui-mininal-tmpl';
import { msg } from '@postgpt/i18n';

import MonthView from './MonthView'; // Import the MonthView component

// const MONTHS_PER_PAGE = 11;
const HALF_MONTHS_PER_PAGE = 5;
const MONTHS_TO_ADD = 5;

export const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useCurrentDate();
  const [, setToolbarExtra] = useToolbarExtra();
  const [, setNavbarExtraLine] = useNavbarExtraLine();
  const topObserverRef = useRef<HTMLBaseElement>(null);
  const middleMonthRef = useRef<HTMLBaseElement>(null);
  const bottomMonthRef = useRef<HTMLBaseElement>(null);
  const monthsRef = useRef<ReactNode[]>([]);
  const topMonthIndex = useRef<number>(-HALF_MONTHS_PER_PAGE);
  // const bottomMonthIndex = useRef<number>(HALF_MONTHS_PER_PAGE);
  // const [months, setMonths] = useState<ReactNode[]>([]);
  const [scrolledToMiddle, setScrolledToMiddle] = useState(true);
  const [changedTopObserver, setChangedTopObserver] = useState(false);
  //  const [updateDate, setUpdateDate] = useState(new Date());

  // Creates the intersection observer
  let observer: IntersectionObserver | null = null;

  const unObserveTop = useCallback(() => {
    if (topObserverRef.current && observer) {
      console.log('unobserving topObserverRef');
      observer.unobserve(topObserverRef.current);
    }
  }, [observer]);

  observer = useMemo(() => {
    console.log('Creating the observer');

    // Disconnect any previous observer
    observer?.disconnect();

    // Add new months to top
    const addTopMonths: () => void = () => {
      console.log('addTopMonths');

      const months = monthsRef.current;
      const newTopMonthIndex = topMonthIndex.current - MONTHS_TO_ADD;

      // Add months before
      for (let i = topMonthIndex.current - 1; i >= newTopMonthIndex; i--) {
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() + i);
        if (i === newTopMonthIndex) {
          months.unshift(
            <MonthView ref={topObserverRef} key={i} date={date} />
          );
        } else {
          months.unshift(<MonthView key={i} date={date} />);
        }
      }
      topMonthIndex.current = newTopMonthIndex;

      unObserveTop();
      setChangedTopObserver(true);
    };

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      // The callback will return an array of entries,
      // even if you are only observing a single item
      for (const entry of entries) {
        if (entry.isIntersecting) {
          // If the element is visible
          console.log('Visible');
          addTopMonths();
        } else {
          // If the element is not visible
          console.log('Not visible');
        }
      }
    };

    return new IntersectionObserver(handleIntersection);
    //
  }, [currentDate, observer, unObserveTop]);

  useEffect(() => {
    console.log('useEffect1');

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

  useEffect(() => {
    console.log('useEffect2');

    const renderMonths = () => {
      console.log('renderMonths');

      const months: ReactNode[] = [];

      console.log('topObserverRef.current', topObserverRef.current);

      // Show months before, current month, and months after
      for (let i = -HALF_MONTHS_PER_PAGE; i <= HALF_MONTHS_PER_PAGE; i++) {
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() + i);
        if (i === -HALF_MONTHS_PER_PAGE) {
          months.push(<MonthView ref={topObserverRef} key={i} date={date} />);
        } else if (i === 0) {
          months.push(<MonthView ref={middleMonthRef} key={i} date={date} />);
        } else if (i === HALF_MONTHS_PER_PAGE) {
          months.push(<MonthView ref={bottomMonthRef} key={i} date={date} />);
        } else {
          months.push(<MonthView key={i} date={date} />);
        }
      }

      monthsRef.current = months;
      unObserveTop();
      setChangedTopObserver(true);
    };

    renderMonths();
    //
    setScrolledToMiddle(false);
    //
    observer?.disconnect();
    //
  }, [currentDate, observer, unObserveTop]);

  useEffect(() => {
    console.log('useEffect3');

    // Scroll to the middle month
    if (middleMonthRef.current && !scrolledToMiddle) {
      console.log('scrolling to middle');

      middleMonthRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start',
      });

      setScrolledToMiddle(true);
    }
  }, [scrolledToMiddle]);

  // Observes the top and bottom months being visible on the page
  useEffect(() => {
    console.log('useEffect4');

    if (!changedTopObserver) {
      return;
    }

    const topObserverElem = topObserverRef.current;
    console.log('topObserverElem', topObserverElem);

    setTimeout(() => {
      if (topObserverElem) {
        console.log('observing topObserverRef');
        observer?.observe(topObserverElem);
        setChangedTopObserver(false);
      }
    }, 2000);

    // return unObserveTop;
  }, [changedTopObserver, observer, unObserveTop]);

  return (
    <Box
      sx={{
        maxWidth: '100%',
        margin: (theme) => theme.spacing(0, 2),
        marginTop: (theme) => theme.spacing(8),
      }}
    >
      {monthsRef.current}
    </Box>
  );
};

export default CalendarPage;
