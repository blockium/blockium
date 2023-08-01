import {
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useIntersection } from 'react-use';
import { startOfMonth } from 'date-fns';
import { Box, Button, Typography } from '@mui/material';

import { MonthYearPicker, useCurrentDate } from '@postgpt/ui-common';
import {
  DRAWER_WIDTH,
  useNavbarExtraLine,
  useToolbarExtra,
} from '@postgpt/ui-mininal-tmpl';
import { msg } from '@postgpt/i18n';

import MonthView from './MonthView'; // Import the MonthView component

const HALF_MONTHS_PER_PAGE = 5;
const MONTHS_TO_ADD = 12;

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

export const CalendarPage: React.FC = () => {
  useExtendNavbar();

  const [currentDate] = useCurrentDate();
  const currentDateRef = useRef(currentDate);

  const [months, setMonths] = useState<ReactNode[]>([]);
  const monthsRef = useRef<ReactNode[]>([]);
  const middleMonthRef = useRef<HTMLBaseElement>(null);

  const topMonthIndex = useRef<number>(-HALF_MONTHS_PER_PAGE);
  const bottomMonthIndex = useRef<number>(HALF_MONTHS_PER_PAGE);

  // Control the scroll after the first render
  const [scrolledToMiddle, setScrolledToMiddle] = useState(false);

  const topInsersectionRef = useRef<HTMLBaseElement>(null);
  const topIntersection = useIntersection(topInsersectionRef, {
    root: null,
    rootMargin: '50%',
    threshold: 0,
  });

  const bottomInsersectionRef = useRef<HTMLBaseElement>(null);
  const bottomIntersection = useIntersection(bottomInsersectionRef, {
    root: null,
    rootMargin: '50%',
    threshold: 0,
  });

  const onWeekClick = (startDate: Date) => {
    // TODO: Open popup asking: topic and actor.
    console.log(startDate);
  };

  const createMonthView = useCallback(
    (i: number, date: Date, ref?: Ref<HTMLBaseElement>) => (
      <MonthView key={i} date={date} ref={ref} onWeekClick={onWeekClick} />
    ),
    [],
  );

  // Render months when the currentDate changes
  useEffect(() => {
    const renderMonths = () => {
      const months: ReactNode[] = [];

      // Show months before, current month, and months after
      for (let i = -HALF_MONTHS_PER_PAGE; i <= HALF_MONTHS_PER_PAGE; i++) {
        const date = startOfMonth(currentDate);
        date.setMonth(currentDate.getMonth() + i);
        if (i === 0) {
          months.push(createMonthView(i, date, middleMonthRef));
        } else {
          months.push(createMonthView(i, date));
        }
      }

      topMonthIndex.current = -HALF_MONTHS_PER_PAGE;
      bottomMonthIndex.current = HALF_MONTHS_PER_PAGE;
      monthsRef.current = months;
      setMonths(months);
    };

    renderMonths();
    //
    // Wait for components to be shown in the screen and then scroll to middle
    setTimeout(() => {
      middleMonthRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start',
      });

      // Another wait to the scroll to happen
      // in order to push the topIntersection out of the view
      setTimeout(() => {
        setScrolledToMiddle(true);
      }, 500);
    }, 1000);

    //
  }, [createMonthView, currentDate]);

  // When top intersection is visible, add more months to the top
  useEffect(() => {
    if (!scrolledToMiddle || !topIntersection) {
      return;
    }

    // Add new months to top
    const addTopMonths: () => void = () => {
      const months = monthsRef.current;
      const newTopMonthIndex = topMonthIndex.current - MONTHS_TO_ADD;

      // Add months before
      for (let i = topMonthIndex.current - 1; i >= newTopMonthIndex; i--) {
        const date = startOfMonth(currentDateRef.current);
        date.setMonth(date.getMonth() + i);
        months.unshift(createMonthView(i, date));
      }

      topMonthIndex.current = newTopMonthIndex;
      setMonths([...months]);
    };

    topIntersection.isIntersecting && addTopMonths();
    //
  }, [createMonthView, scrolledToMiddle, topIntersection]);

  // When bottom intersection is visible, add more months to the bottom
  useEffect(() => {
    if (!bottomIntersection) {
      return;
    }

    // Add new months to bottom
    const addBottomMonths: () => void = () => {
      const months = monthsRef.current;
      const newBottomMonthIndex = bottomMonthIndex.current + MONTHS_TO_ADD;

      // Add months before
      for (
        let i = bottomMonthIndex.current + 1;
        i <= newBottomMonthIndex;
        i++
      ) {
        const date = startOfMonth(currentDateRef.current);
        date.setMonth(date.getMonth() + i);
        months.push(createMonthView(i, date));
      }

      bottomMonthIndex.current = newBottomMonthIndex;
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
      <Box ref={topInsersectionRef} />
      {months}
      <Box ref={bottomInsersectionRef} />
    </Box>
  );
};

export default CalendarPage;
