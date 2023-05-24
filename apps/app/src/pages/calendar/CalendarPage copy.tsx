import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const CalendarContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  width: '100%',
});

const CalendarHeader = styled(Grid)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const CalendarWeekdays = styled(Grid)({
  display: 'flex',
  justifyContent: 'space-evenly',
  padding: '10px 0',
  backgroundColor: '#f5f5f5',
});

const CalendarMonths = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  width: '100%',
});

interface CalendarDate {
  day: number;
  month: number;
  year: number;
}

export const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<CalendarDate>({
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const handleDateChange = (day: number, month: number, year: number) => {
    setSelectedDate({ day, month, year });
  };

  const handleGoToToday = () => {
    const today = new Date();
    setSelectedDate({
      day: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
    });
  };

  const renderCalendar = () => {
    const { day, month, year } = selectedDate;

    const firstDayOfMonth = new Date(year, month, 1);
    const startingWeekday = firstDayOfMonth.getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDates: (number | null)[] = Array(42).fill(null);

    for (let i = 0; i < totalDaysInMonth; i++) {
      calendarDates[startingWeekday + i] = i + 1;
    }

    const calendarRows: (number | null)[][] = [];

    while (calendarDates.length) {
      calendarRows.push(calendarDates.splice(0, 7));
    }

    return calendarRows.map((row, rowIndex) => (
      <Grid container key={rowIndex}>
        {row.map((date, dateIndex) => (
          <Grid item xs={2} key={dateIndex}>
            <Typography
              variant="subtitle2"
              style={{
                textAlign: 'center',
                backgroundColor: date === day ? '#f0f0f0' : 'transparent',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
              onClick={() => handleDateChange(date || 1, month, year)}
            >
              {date}
            </Typography>
          </Grid>
        ))}
      </Grid>
    ));
  };

  return (
    <CalendarContainer>
      <CalendarHeader container>
        <Grid item>
          <Button variant="outlined">Selecionar data</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={handleGoToToday}>
            Hoje
          </Button>
        </Grid>
      </CalendarHeader>
      <CalendarWeekdays container>
        <Grid item xs={2}>
          <Typography variant="subtitle2">Dom</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle2">Seg</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle2">Ter</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle2">Qua</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle2">Qui</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle2">Sex</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle2">Sáb</Typography>
        </Grid>
      </CalendarWeekdays>
      <CalendarMonths>{renderCalendar()}</CalendarMonths>
    </CalendarContainer>
  );
};
export default CalendarPage;
