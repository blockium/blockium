import { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { subDays } from 'date-fns';

interface ICalendarWeekProps {
  week: (number | null)[];
  month: number;
  year: number;
  onWeekClick?: (date: Date, element: HTMLElement | null) => void;
}

const CalendarWeek: React.FC<ICalendarWeekProps> = ({
  week,
  month,
  year,
  onWeekClick,
}) => {
  const weekRef = useRef<HTMLElement>(null);

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

        const startDate = subDays(
          new Date(year, month, weekFirstDay as number),
          i,
        );

        onWeekClick?.(startDate, weekRef.current);
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
      {week.map((day, index) => (
        <Typography key={index} component="div" variant="body1">
          {day}
        </Typography>
      ))}
    </Box>
  );
};

export default CalendarWeek;
