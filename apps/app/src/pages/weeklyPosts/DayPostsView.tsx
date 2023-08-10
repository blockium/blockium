import { useEffect, useState } from 'react';
import { getDay, startOfMonth } from 'date-fns';
import { Grid, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { addDoc } from 'firebase/firestore';

import { Post, PostFormat, PostType } from '@postgpt/types';
import { db } from '@postgpt/firebase';
import { msg } from '@postgpt/i18n';
import { fDateCalendar } from '@postgpt/utils';
import { Alert, CriatyLogo, LoadingIndicator } from '@postgpt/ui-common';
import { useCalendarCache } from '@postgpt/ui-calendar';

import { NewPostPopover, PostCard } from '../../components';
import { newPosts } from '../../apiRequests';

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

// TODO: !!! Add a new "deletedDate" field to Post
// TODO: !!! Show only post with "deletedDate" field undefined
const DayPostsView: React.FC<IDayPostsViewProps> = ({ date }) => {
  const [calendarCache, setCalendarCache] = useCalendarCache();

  const [posts, setPosts] = useState<(Post | undefined)[]>([]);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log('useEffect');
    const isoStartOfMonth = startOfMonth(date).toISOString();
    const dayPosts = (calendarCache[isoStartOfMonth] as Post[]).filter(
      (post) => {
        return post.date.toISOString() === date.toISOString();
      },
    );
    setPosts(dayPosts);
  }, [calendarCache, date]);

  const addPost = (
    topic: string,
    character?: string,
    format?: PostFormat,
    type?: PostType,
  ) => {
    if (!adding) {
      setAdding(true);

      // Adds an undefined post to the list to show a loading indicator
      setPosts((posts) => [...posts, undefined]);

      // Request the creation of one new post
      newPosts(1, topic, character, format, type)
        .then(async (result) => {
          if (typeof result === 'string') {
            // Show error in Alert when request post creation fails
            console.error(result);
            setMessage(msg('app.error.newPosts'));

            // slice remove undefined from end
            setPosts((posts) => posts.slice(0, posts.length - 1));
            return;
          }

          const isoStartOfMonth = startOfMonth(date).toISOString();
          const monthData = [...calendarCache[isoStartOfMonth]];

          // Save news posts in Firebase
          for (const post of result) {
            const newPost = {
              ...post,
              date,
            };
            try {
              await addDoc(
                db.posts(sessionStorage.getItem('userId') ?? ''),
                newPost,
              );
            } catch (error) {
              // Show error in Alert when add post fails
              console.error(error);
              setMessage(msg('app.error.savePosts'));
            } finally {
              // Add the new post to the calendar data cache
              monthData.push(newPost);
            }
          }

          setCalendarCache({
            ...calendarCache,
            [isoStartOfMonth]: monthData,
          });
        })
        .finally(() => {
          setAdding(false);
        });
    }
  };

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const onAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleGenerate = (
    topic: string,
    character?: string,
    format?: PostFormat,
    type?: PostType,
  ) => {
    setOpenPopover(null);
    addPost(topic, character, format, type);
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
            {post ? (
              <PostCard post={post} />
            ) : (
              <LoadingIndicator>
                <CriatyLogo
                  full={false}
                  colorScheme="transparent-green-green-transparent"
                  sx={{ marginTop: '0.75rem' }}
                />
              </LoadingIndicator>
            )}
          </Grid>
        ))}
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
        startDate={date}
        anchorEl={openPopover}
        onGenerate={handleGenerate}
        onClose={handleOnClose}
      />
    </>
  );
};

export default DayPostsView;
