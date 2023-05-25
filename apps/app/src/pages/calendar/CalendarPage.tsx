import { Box, Button, Typography } from '@mui/material';

import { MonthYearPicker, useCurrentDate } from '@postgpt/ui-common';
import { msg } from '@postgpt/i18n';

import MonthView from './MonthView'; // Import the MonthView component

export const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useCurrentDate();

  const renderMonths = () => {
    const months = [];

    // Show 3 months before, current month, and 3 months after
    for (let i = -3; i <= 3; i++) {
      const date = new Date(currentDate);
      date.setMonth(currentDate.getMonth() + i);
      months.push(<MonthView key={i} date={date} />);
    }

    return months;
  };

  return (
    <Box sx={{ maxWidth: '100%', margin: (theme) => theme.spacing(2) }}>
      <MonthYearPicker label={msg('app.page.calendar.filter.date')} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCurrentDate(new Date())}
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
