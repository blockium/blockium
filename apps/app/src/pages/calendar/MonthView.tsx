import React from 'react';
import { Box, Typography } from '@mui/material';

interface MonthViewProps {
  month: number;
  year: number;
}

export const MonthView: React.FC<MonthViewProps> = ({ month, year }) => {
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
    <>
      {weeks.map((week, index) => {
        return (
          <Box
            key={index}
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
              '&:hover': {
                borderRadius: '0.5rem',
                outline: '1px solid #ccc',
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
      })}
    </>
  );
};

export default MonthView;
