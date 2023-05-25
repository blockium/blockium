import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import { capitalizeFirstLetter } from '@postgpt/utils';

import MonthView from './MonthView'; // Import the MonthView component

export const CalendarPage: React.FC = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const renderMonths = () => {
    const months = [];

    // Show 3 months before, current month, and 3 months after
    for (let i = -3; i <= 3; i++) {
      const date = new Date();
      date.setMonth(today.getMonth() + i);

      months.push(
        <Box key={i}>
          <Typography variant="h6" margin="2.5rem 0 0.5rem 0">
            {capitalizeFirstLetter(
              date.toLocaleString('default', {
                month: 'long',
              })
            )}{' '}
            {date.getFullYear()}
          </Typography>
          <MonthView month={date.getMonth()} year={date.getFullYear()} />{' '}
          {/* Replace placeholder with MonthView */}
        </Box>
      );
    }

    return months;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <DatePicker
        label="Selecionar data"
        value={selectedDate}
        onChange={handleDateChange}
        // renderInput={(params) => <Box {...params} />}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setSelectedDate(today)}
      >
        Hoje
      </Button>
      <br></br>
      <br></br>
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
        {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, index) => (
          <Typography key={index} component="div" variant="body1">
            {day}
          </Typography>
        ))}
      </Box>
      {renderMonths()}
    </Box>
  );
};

export default CalendarPage;
