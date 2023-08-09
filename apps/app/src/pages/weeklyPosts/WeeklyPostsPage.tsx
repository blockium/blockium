import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { addDays, startOfWeek } from 'date-fns';
import { Stack } from '@mui/material';

import { useHasBusinessInfo } from '@postgpt/firebase';
import DayPostsView from './DayPostsView';

export const WeeklyPostsPage: React.FC = (props) => {
  const { isoStartDate } = useParams();
  const [daysOfWeek, setDaysOfWeek] = useState<Date[]>([]);
  const hasBusinessInfo = useHasBusinessInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasBusinessInfo) return;

    const startDate = isoStartDate
      ? new Date(isoStartDate)
      : startOfWeek(new Date());

    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      daysOfWeek.push(addDays(startDate, i));
    }
    setDaysOfWeek(daysOfWeek);
    //
  }, [hasBusinessInfo, isoStartDate]);

  // If we don't know yet if the user has business info, return null
  if (hasBusinessInfo === undefined) return null;

  // If no business info, redirect to the no business page
  if (hasBusinessInfo === false) {
    navigate('/nobusiness');
    return null;
  }

  return (
    <Stack gap="96px">
      {daysOfWeek.map((date) => (
        <DayPostsView key={date.toISOString()} date={date} />
      ))}
    </Stack>
  );
};

export default WeeklyPostsPage;
