import { ReactNode, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { subDays } from 'date-fns';

interface ICalendarWeekProps {
  week: (number | null)[];
  month: number;
  year: number;
  onWeekClick?: (weekStartDate: Date, element: HTMLElement | null) => void;
  renderDay?: (date: Date) => ReactNode;
}

// TODO: *** Show post status on every day on CalendarWeek. Primary color when every post in a day is published, secondary color when there is a post in the day not published. The post status is a small line under the day number.
// TODO: !!! Use a callback to do generate this visual component, in order to generalize this component to be used in other places. The call will be like this: onDayRender: (day: number, month: number, year: number, dayView: ReactNode) => ReactNode
// No priority:
// TODO: Move Calendar components to a new library ui-calendar, so it can be used in other projects.
// TODO: Add onDayClick callback to CalendarWeek, so it can be used in other projects.
const CalendarWeek: React.FC<ICalendarWeekProps> = ({
  week,
  month,
  year,
  onWeekClick,
  renderDay,
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
      {week.map((day, index) =>
        day && renderDay ? (
          <Box key={index}>{renderDay(new Date(year, month, day))}</Box>
        ) : (
          <Typography key={index} component="div" variant="body1">
            {day}
          </Typography>
        ),
      )}
    </Box>
  );
};

export default CalendarWeek;
