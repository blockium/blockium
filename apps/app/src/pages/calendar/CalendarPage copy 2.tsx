import React, { useState } from 'react';
import { Box, Button, Grid, Typography, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';

const CalendarContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
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
});

export const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleGoToToday = () => {
    setSelectedDate(new Date());
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
      <CalendarMonths container>
        {/* Renderizar calendários anteriores */}
        {/* Exemplo de como renderizar 3 meses anteriores e 3 meses posteriores */}
        {Array.from({ length: 7 }).map((_, index) => (
          <Grid item key={index}>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              // renderInput={(params) => <Box {...params} />}
              views={['year', 'month']}
              minDate={new Date(2020, 0, 1)}
              maxDate={new Date(2025, 11, 31)}
              // minMonth={new Date().getMonth() - 2}
              // maxMonth={new Date().getMonth() + 2}
              openTo="month"
              disableFuture
              disablePast
              shouldDisableDate={(date) =>
                date.getDay() === index &&
                date.getMonth() === selectedDate?.getMonth()
              }
            />
          </Grid>
        ))}
      </CalendarMonths>
    </CalendarContainer>
  );
};

export default CalendarPage;
