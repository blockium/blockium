import { useParams } from 'react-router';
import { startOfWeek } from 'date-fns';
import { Stack } from '@mui/material';

export const WeeklyPostsPage: React.FC = (props) => {
  const { isoStartDate } = useParams();
  const startDate = isoStartDate
    ? new Date(isoStartDate)
    : startOfWeek(new Date());

  return (
    <Stack gap="64px">
      <h1>WeeklyPostsPage</h1>
      {startDate.toISOString()}
    </Stack>
  );
};

export default WeeklyPostsPage;
