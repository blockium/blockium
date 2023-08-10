import { ReactNode, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { startOfMonth, subDays } from 'date-fns';

import useCalendarData from './useCalendarData';

interface ICalendarWeekProps {
  week: (number | null)[];
  month: number;
  year: number;
  onWeekClick?: (weekStartDate: Date, element: HTMLElement | null) => void;
  renderDay?: (dayDate: Date, monthData: unknown[]) => ReactNode;
}

const CalendarWeek: React.FC<ICalendarWeekProps> = ({
  week,
  month,
  year,
  onWeekClick,
  renderDay,
}) => {
  const weekRef = useRef<HTMLElement>(null);
  const [calendarData] = useCalendarData();

  return (
    <Box
      ref={weekRef}
      onClick={(e) => {
        // Find the first non-blank day of the week
        let weekFirstDay = week[0];
        let i = 0;
        while (!weekFirstDay) {
          i++;
          weekFirstDay = week[i];
        }

        const weekStartDate = subDays(
          new Date(year, month, weekFirstDay as number),
          i,
        );

        onWeekClick?.(weekStartDate, weekRef.current);
      }}
      sx={{
        flexGrow: 1,
        display: 'grid',
        justifyItems: 'center',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 2,
        marginBottom: '4.4rem',
        cursor: 'pointer',
        margin: '0.2rem 0',
        padding: '1rem 0',
        '&:hover': (theme) => {
          return {
            borderRadius: '0.5rem',
            outline: `2px dashed ${theme.palette.grey[500]}}`,
          };
        },
      }}
    >
      {week.map((day, index) => {
        const dayDate = new Date(year, month, day || 1);

        // Render day if not a blank day and there is a renderDay callback
        const dayElement =
          day &&
          renderDay?.(
            dayDate,
            calendarData[startOfMonth(dayDate).toISOString()],
          );

        return dayElement ? (
          <Box key={index}>{dayElement}</Box>
        ) : (
          <Typography key={index} component="div" variant="body1">
            {day}
          </Typography>
        );
      })}
    </Box>
  );
};

export default CalendarWeek;
