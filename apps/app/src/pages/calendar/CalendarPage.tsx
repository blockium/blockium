import { useNavigate } from 'react-router-dom';
import { endOfMonth } from 'date-fns';
import { Stack, Typography } from '@mui/material';

import { BorderLinearProgress } from '@postgpt/ui-common';
import { getPosts } from '@postgpt/firebase';
import { Post, PostStatus } from '@postgpt/types';

import CalendarView from './CalendarView';

export const CalendarPage: React.FC = (props) => {
  const navigate = useNavigate();

  const fetchMonthPosts = async (monthStartDate: Date) => {
    console.log(
      'fetching month posts for ',
      monthStartDate.toLocaleDateString(),
    );

    return await getPosts(
      sessionStorage.getItem('userId') ?? '',
      monthStartDate,
      endOfMonth(monthStartDate),
    );
  };

  // Return the minimal post status of all posts in the day
  // Examples:
  // - If all posts are 'published', return 'published',
  // - If one post is initial, return initial;
  // - If one post is created, and there no other with status initial or definid, return created;
  const getMinStatus = (posts: Post[]) => {
    let minStatus: PostStatus = 'published';
    for (const post of posts) {
      switch (post.status) {
        case 'initial':
          return 'initial';
        case 'defined':
          minStatus = 'defined';
          break;
        case 'created':
          if (minStatus !== 'defined') {
            minStatus = 'created';
          }
          break;
        case 'approved':
          if (minStatus !== 'defined' && minStatus !== 'created') {
            minStatus = 'approved';
          }
          break;
      }
    }
    return minStatus;
  };

  // Show posts completion on every day on CalendarWeek. Primary color when every post in a day is published, secondary color when there is a post in the day not published. The post status is a small line under the day number.
  const renderDay = (dayDate: Date, monthData: unknown[]) => {
    const posts = monthData.filter((post) => {
      return (post as Post).date.toISOString() === dayDate.toISOString();
    });

    if (!posts || !posts.length) return null;

    // Show day completion based on posts status
    const completions = {
      initial: 0,
      defined: 25,
      created: 50,
      approved: 75,
      published: 100,
    };
    const dayCompletion = completions[getMinStatus(posts as Post[])];

    return (
      <Stack justifyContent="space-between" textAlign="center">
        <Typography component="div" variant="body1">
          {dayDate.getDate()}
        </Typography>
        <BorderLinearProgress
          variant="determinate"
          value={dayCompletion}
          sx={{ minWidth: '30px' }}
        />
      </Stack>
    );
  };

  return (
    <CalendarView
      onWeekClick={(weekStartDate: Date, element: HTMLElement | null) => {
        navigate(`/posts/weekly/${weekStartDate.toISOString()}`);
      }}
      fetchMonthData={fetchMonthPosts}
      renderDay={renderDay}
    />
  );
};

export default CalendarPage;
