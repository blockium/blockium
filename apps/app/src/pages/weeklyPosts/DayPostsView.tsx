import { useEffect, useState } from 'react';
import { getDay, startOfMonth } from 'date-fns';
import { Grid, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { Post } from '@postgpt/types';
import { msg } from '@postgpt/i18n';
import { fDateCalendar } from '@postgpt/utils';
import { Alert, CriatyLogo, LoadingIndicator } from '@postgpt/ui-common';
import { useCalendarCache } from '@postgpt/ui-calendar';

import { NewPostPopover, PostCard } from '../../components';

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

const DayPostsView: React.FC<IDayPostsViewProps> = ({ date }) => {
  const [calendarCache] = useCalendarCache();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const isoStartOfMonth = startOfMonth(date).toISOString();
    const dayPosts = (calendarCache[isoStartOfMonth] as Post[]).filter(
      (post) => {
        return post.date.toISOString() === date.toISOString();
      },
    );
    setPosts(dayPosts);
  }, [calendarCache, date]);

  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const onAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleGenerate = async (
    addPost: (date: Date) => Promise<Post | string>,
  ) => {
    setOpenPopover(null);

    if (!adding) {
      setAdding(true);

      const result = await addPost(date);
      if (typeof result === 'string') {
        // Show error in Alert when post creation fails
        setMessage(result);
      }

      setAdding(false);
    }
  };

  const handleOnClose = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <Alert severity="error" message={message} setMessage={setMessage} />
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
            <PostCard post={post} setMessage={setMessage} />
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
        onGenerate={handleGenerate}
        onClose={handleOnClose}
      />
    </>
  );
};

export default DayPostsView;
