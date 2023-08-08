import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { addDays, startOfWeek } from 'date-fns';
import { Stack } from '@mui/material';

import DayPostsView from './DayPostsView';

export const WeeklyPostsPage: React.FC = (props) => {
  const { isoStartDate } = useParams();
  const [daysOfWeek, setDaysOfWeek] = useState<Date[]>([]);

  useEffect(() => {
    const startDate = isoStartDate
      ? new Date(isoStartDate)
      : startOfWeek(new Date());

    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      daysOfWeek.push(addDays(startDate, i));
    }
    setDaysOfWeek(daysOfWeek);
    //
  }, [isoStartDate]);

  return (
    <Stack gap="96px">
      {daysOfWeek.map((date) => (
        <DayPostsView key={date.toISOString()} date={date} />
      ))}
    </Stack>
  );
};

export default WeeklyPostsPage;
