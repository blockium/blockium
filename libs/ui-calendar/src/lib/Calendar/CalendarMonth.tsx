import { ReactNode, Ref, forwardRef } from 'react';
import { Box, Typography } from '@mui/material';

import { capitalizeFirstLetter } from '@blockium/utils';
import CalendarWeek from './CalendarWeek';

interface CalendarMonthProps {
  date: Date;
  onWeekClick?: (weekStartDate: Date, element: HTMLElement | null) => void;
  renderDay?: (dayDate: Date, monthData: unknown[]) => ReactNode;
  ref?: Ref<HTMLBaseElement>;
}

export const CalendarMonth: React.FC<CalendarMonthProps> = forwardRef(
  ({ date, onWeekClick, renderDay }, ref) => {
    const month = date.getMonth();
    const year = date.getFullYear();

    // Get the first day of the month
    let firstDay = new Date(year, month, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1; // If it's Sunday, make it 6 (the end of the array). Otherwise, shift it by one.

    // Get the total number of days in the month
    const totalDays = new Date(year, month + 1, 0).getDate();

    const daysInMonth = [...Array(totalDays).keys()].map((i) => i + 1);

    // Prepare empty spaces for the first day of the month
    const leadingSpaces = [...Array(firstDay).keys()].map(() => null);
    const calendarDays = [...leadingSpaces, ...daysInMonth];

    // The array might still not be long enough. Fill it with additional empty spaces.
    const trailingSpaces = [
      ...Array((7 - (calendarDays.length % 7)) % 7).keys(),
    ].map(() => null);

    const monthDays = [...calendarDays, ...trailingSpaces];
    const weeks = [];
    while (monthDays.length > 0) {
      weeks.push(monthDays.splice(0, 7));
    }

    return (
      <Box ref={ref}>
        <Typography
          color={(theme) =>
            theme.palette.mode === 'light' ? 'primary.dark' : 'primary.light'
          }
          variant="h6"
          margin="2.5rem 0 0.5rem 0"
        >
          {capitalizeFirstLetter(
            date.toLocaleString('default', { month: 'long' }),
          )}{' '}
          {year}
        </Typography>
        {weeks.map((week, index) => (
          <CalendarWeek
            key={index}
            week={week}
            month={month}
            year={year}
            onWeekClick={onWeekClick}
            renderDay={renderDay}
          />
        ))}
      </Box>
    );
  },
);

export default CalendarMonth;
