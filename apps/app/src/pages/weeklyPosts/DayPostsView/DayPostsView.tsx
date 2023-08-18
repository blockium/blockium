import { useEffect, useState } from 'react';
import { getDay, startOfMonth } from 'date-fns';
import { Box, Grid, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { Post, PostParams } from '@postgpt/types';
import { msg } from '@postgpt/i18n';
import { fDateCalendar } from '@postgpt/utils';
import { Alert, CriatyLogo, LoadingIndicator } from '@postgpt/ui-common';
import { useCalendarCache } from '@postgpt/ui-calendar';

import { NewPostPopover, PostCard } from '../../../components';

const formatDate = (date: Date) => {
  const weekDayLabels = [
    msg('app.sunday-short'),
    msg('app.monday-short'),
    msg('app.tuesday-short'),
    msg('app.wednesday-short'),
    msg('app.thursday-short'),
    msg('app.friday-short'),
    msg('app.saturday-short'),
  ];

  return `${weekDayLabels[getDay(date)].toUpperCase()}, ${fDateCalendar(date)}`;
};

interface IDayPostsViewProps {
  date: Date;
}

export const DayPostsView: React.FC<IDayPostsViewProps> = ({ date }) => {
  const [calendarCache] = useCalendarCache();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const isoStartOfMonth = startOfMonth(date).toISOString();
    const dayPosts = ((calendarCache[isoStartOfMonth] as Post[]) || []).filter(
      (post) => {
        return post.date.toISOString() === date.toISOString();
      },
    );
    setPosts(dayPosts);
  }, [calendarCache, date]);

  const [adding, setAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [postParams, setPostParams] = useState<PostParams>();
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const onAddClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const onRegenerate = (element: HTMLElement, post: Post) => {
    setPostParams(post.params);
    setOpenPopover(element);
  };

  const handleGenerate = async (
    addPost: (date: Date) => Promise<Post | string>,
  ) => {
    setPostParams(undefined);
    setOpenPopover(null);

    if (!adding) {
      setAdding(true);

      const result = await addPost(date);
      if (typeof result === 'string') {
        // Show error in Alert when post creation fails
        setErrorMessage(result);
      }

      setAdding(false);
    }
  };

  const handleOnClose = () => {
    setPostParams(undefined);
    setOpenPopover(null);
  };

  return (
    <>
      <Alert
        severity="error"
        message={errorMessage}
        setMessage={setErrorMessage}
      />
      <Alert severity="success" message={message} setMessage={setMessage} />
      {/* The Box is the scroll point when user clicks on a day in navbar. From 1 (Monday) to 7 (Sunday) */}
      <Box height="120px" id={`day-${getDay(date) || 7}`}></Box>
      <Grid container spacing={4}>
        <Grid item textAlign="center" xs={12}>
          {formatDate(date)}
        </Grid>

        {posts.map((post, index) => (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            item
            xs={12}
            md={6}
            key={index}
          >
            <PostCard
              post={post}
              setMessage={setMessage}
              setErrorMessage={setErrorMessage}
              onRegenerate={onRegenerate}
            />
          </Grid>
        ))}

        {adding && (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            item
            xs={12}
            md={6}
          >
            <LoadingIndicator>
              <CriatyLogo
                full={false}
                colorScheme="transparent-green-green-transparent"
                sx={{ marginTop: '0.75rem' }}
              />
            </LoadingIndicator>
          </Grid>
        )}

        <Grid
          container
          item
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={6}
        >
          <IconButton onClick={onAddClick} size="large" disabled={adding}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      <NewPostPopover
        anchorEl={openPopover}
        postParams={postParams}
        onGenerate={handleGenerate}
        onClose={handleOnClose}
      />
    </>
  );
};

export default DayPostsView;
