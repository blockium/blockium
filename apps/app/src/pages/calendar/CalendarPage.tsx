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
import NewPostPopover from '../../components/post/NewPostPopover/NewPostPopover';

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

// TODO: ! Remove CalendarPageOld
export const CalendarPage: React.FC = () => {
  useExtendNavbar();

  const [currentDate] = useCurrentDate();

  const currentDateRef = useRef(startOfMonth(currentDate));
  const topDateRef = useRef(currentDateRef.current);
  const bottomDateRef = useRef(currentDateRef.current);

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

  const onWeekClick = (startDate: Date, element: HTMLElement | null) => {
    // Open MenuPopover asking: topic and character (optional).
    setStartDate(startDate);
    setOpenPopover(element);
  };

  const createMonthView = useCallback(
    (date: Date, ref?: Ref<HTMLBaseElement>) => (
      <CalendarMonth
        key={date.toISOString()}
        date={date}
        ref={ref}
        onWeekClick={onWeekClick}
      />
    ),
    [],
  );

  // Render months when the currentDate changes
  useEffect(() => {
    // Reset refs and months when currentDate changes
    currentDateRef.current = startOfMonth(currentDate);
    topDateRef.current = currentDateRef.current;
    bottomDateRef.current = currentDateRef.current;

    const renderMonths = () => {
      const months: ReactNode[] = [];
      months.push(createMonthView(currentDateRef.current));
      monthsRef.current = months;
      setMonths(months);
    };

    renderMonths();
    //
  }, [createMonthView, currentDate]);

  // When top intersection is visible, add more months to the top
  useEffect(() => {
    if (!topIntersection) {
      return;
    }

    // Add new months to top
    const addTopMonths: () => void = () => {
      const months = monthsRef.current;

      // Add months before
      let date = new Date(topDateRef.current);
      for (let i = 0; i < MONTHS_TO_ADD; i++) {
        date = addMonths(date, -1);
        months.unshift(createMonthView(date));
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
    const addBottomMonths: () => void = () => {
      const months = monthsRef.current;

      // Add months after
      let date = new Date(bottomDateRef.current);
      for (let i = 0; i < MONTHS_TO_ADD; i++) {
        date = addMonths(date, 1);
        months.push(createMonthView(date));
      }
      bottomDateRef.current = date;

      monthsRef.current = months;
      setMonths([...months]);
    };

    bottomIntersection.isIntersecting && addBottomMonths();
    //
  }, [bottomIntersection, createMonthView]);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const handleClose = () => {
    setOpenPopover(null);
  };

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
      {/* TODO: !!! Move NewPostPopover from CalendarPage to DayPostsView onAdd click */}
      <NewPostPopover
        startDate={startDate}
        anchorEl={openPopover}
        onClose={handleClose}
      />
    </Box>
  );
};

export default CalendarPage;
