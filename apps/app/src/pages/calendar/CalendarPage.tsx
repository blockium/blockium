import { useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

import { BorderLinearProgress } from '@postgpt/ui-common';

import CalendarView from './CalendarView';

export const CalendarPage: React.FC = (props) => {
  const navigate = useNavigate();

  return (
    <CalendarView
      onWeekClick={(weekStartDate: Date, element: HTMLElement | null) => {
        navigate(`/posts/weekly/${weekStartDate.toISOString()}`);
      }}
      renderDay={(date: Date) => {
        // TODO: Show day posts status
        return (
          <Stack justifyContent="space-between" textAlign="center">
            <Typography component="div" variant="body1">
              {date.getDate()}
            </Typography>
            <BorderLinearProgress
              variant="determinate"
              value={25}
              sx={{ minWidth: '30px' }}
            />
          </Stack>
        );
      }}
    />
  );
};

export default CalendarPage;
