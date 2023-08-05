import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { addDays, startOfWeek } from 'date-fns';
import { Stack } from '@mui/material';
import DayPostsView from './DayPostsView';
import { PostFormat, PostType } from '@postgpt/types';

export const WeeklyPostsPage: React.FC = (props) => {
  const { isoStartDate, topic, format, type, character } = useParams();
  const [daysOfWeek, setDaysOfWeek] = useState<Date[]>([]);
  const [daysOfWeekend, setDaysOfWeekend] = useState<Date[]>([]);

  useEffect(() => {
    const startDate = isoStartDate
      ? new Date(isoStartDate)
      : startOfWeek(new Date());

    const daysOfWeek = [];
    for (let i = 0; i < 5; i++) {
      daysOfWeek.push(addDays(startDate, i));
    }
    setDaysOfWeek(daysOfWeek);

    const daysOfWeekend = [];
    for (let i = 5; i < 7; i++) {
      daysOfWeekend.push(addDays(startDate, i));
    }
    setDaysOfWeekend(daysOfWeekend);
    //
  }, [isoStartDate]);

  return (
    <Stack gap="96px">
      {daysOfWeek.map((date) => (
        <DayPostsView
          key={date.toISOString()}
          date={date}
          topic={topic}
          format={format !== 'undefined' ? (format as PostFormat) : undefined}
          type={type !== 'undefined' ? (type as PostType) : undefined}
          character={character}
        />
      ))}
      {/* Does not generate automatically for Saturday and Sunday */}
      {daysOfWeekend.map((date) => (
        <DayPostsView key={date.toISOString()} date={date} />
      ))}
    </Stack>
  );
};

export default WeeklyPostsPage;
