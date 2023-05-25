import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';

import { capitalizeFirstLetter } from '@postgpt/utils';

import MonthView from './MonthView'; // Import the MonthView component
import { MonthYearPicker } from '@postgpt/ui-common';
import { msg } from '@postgpt/i18n';

export const CalendarPage: React.FC = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  const handleDateChange = (date: Date | null) => {
    console.log('CalendarPage', date);
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
    <Box sx={{ maxWidth: '100%', margin: (theme) => theme.spacing(2) }}>
      <MonthYearPicker label={msg('app.page.calendar.filter.date')} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setSelectedDate(today)}
      >
        {msg('app.button.today')}
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
        {[
          msg('app.monday-short'),
          msg('app.tuesday-short'),
          msg('app.wednesday-short'),
          msg('app.thursday-short'),
          msg('app.friday-short'),
          msg('app.saturday-short'),
          msg('app.sunday-short'),
        ].map((day, index) => (
          <Typography key={index} component="div" variant="subtitle1">
            {day}
          </Typography>
        ))}
      </Box>
      {renderMonths()}
    </Box>
  );
};

export default CalendarPage;
