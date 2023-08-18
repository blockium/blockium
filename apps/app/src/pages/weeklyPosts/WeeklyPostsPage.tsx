import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { addDays, startOfWeek } from 'date-fns';
import { Stack } from '@mui/material';

// import { useHasBusinessInfo } from '@postgpt/firebase';
import { DayPostsView } from './DayPostsView';
import { useExtendNavbar } from './useExtendNavbar';

// TODO: *** Create a useExtendNavbar, similar to useExtendNavbar in libs/ui-calendar/src/lib/hooks/useExtendNavbar.ts, to add the week days to the navbar. When user clicks on a day, scroll to that day in the page (using the browser scroll behavior to an #id in every DayPostView)
export const WeeklyPostsPage: React.FC = (props) => {
  useExtendNavbar();

  const { isoStartDate } = useParams();
  const [daysOfWeek, setDaysOfWeek] = useState<Date[]>([]);
  // const hasBusinessInfo = useHasBusinessInfo();
  // const navigate = useNavigate();

  useEffect(() => {
    // if (!hasBusinessInfo) return;

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

  // If we don't know yet if the user has business info, return null
  // if (hasBusinessInfo === undefined) return null;

  // If no business info, redirect to the no business page
  // if (hasBusinessInfo === false) {
  //   navigate('/nobusiness');
  //   return null;
  // }

  useEffect(() => {
    // Scroll to monday when page loads
    setTimeout(() => {
      document.querySelector(`#day-1`)?.scrollIntoView({
        behavior: 'instant',
        block: 'start',
        inline: 'nearest',
      });
    }, 100);
  }, []);

  return (
    <Stack gap="0px">
      {daysOfWeek.map((date) => (
        <DayPostsView key={date.toISOString()} date={date} />
      ))}
    </Stack>
  );
};

export default WeeklyPostsPage;
