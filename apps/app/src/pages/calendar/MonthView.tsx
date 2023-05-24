import React from 'react';
import { Box, Typography } from '@mui/material';

interface MonthViewProps {
  month: number;
  year: number;
}

const MonthView: React.FC<MonthViewProps> = ({ month, year }) => {
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

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'grid',
        justifyItems: 'center',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 2,
        marginBottom: '4.4rem',
      }}
    >
      {/* {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, index) => (
        <Typography key={index} component="div" variant="body1">
          {day}
        </Typography>
      ))} */}
      {[...calendarDays, ...trailingSpaces].map((day, index) => (
        <Typography key={index} component="div" variant="body1">
          {day}
        </Typography>
      ))}
    </Box>
  );
};

export default MonthView;
