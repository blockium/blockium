import { useEffect, useState } from 'react';
import { addDays, getDay } from 'date-fns';
import { Grid, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { Post, PostFormat, PostType } from '@postgpt/types';
import { getPosts } from '@postgpt/firebase';
import { msg } from '@postgpt/i18n';
import { fDateCalendar } from '@postgpt/utils';
import { CriatyLogo, LoadingIndicator } from '@postgpt/ui-common';

import { PostCard } from '../../components';
import { newPosts } from '../../apiRequests';
import { useEffectOnce } from 'react-use';

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
  topic?: string;
  format?: PostFormat;
  type?: PostType;
  character?: string;
}

const DayPostsView: React.FC<IDayPostsViewProps> = ({
  date,
  topic,
  format,
  type,
  character,
}) => {
  const [posts, setPosts] = useState<(Post | undefined)[]>([]);
  const [adding, setAdding] = useState(false);

  const addPost = () => {
    if (!adding) {
      setAdding(true);

      // Adds an undefined post to the list to show a loading indicator
      setPosts([...posts, undefined]);

      // Request the creation of one new post
      newPosts(1, topic, character, format, type)
        .then((newPosts) => {
          if (typeof newPosts === 'string') {
            // TODO: show error
            console.log(newPosts);
            setPosts([...posts]);
            return;
          }

          // TODO: Save in Firebase

          // Add the new post to the list
          setPosts([...posts, ...newPosts]);
        })
        .finally(() => {
          setAdding(false);
        });
    }
  };

  useEffect(() => {
    // fetch current posts from Firebase
    const fetchPosts = async () => {
      const dbPosts = await getPosts(
        sessionStorage.getItem('userId') ?? '',
        date,
        addDays(date, 1),
      );

      if (dbPosts.length > 0) {
        setPosts([...dbPosts, ...posts]);
      }
    };
    fetchPosts();
  }, [date, posts]);

  useEffectOnce(() => {
    if (topic) {
      // Create a new post for the day
      addPost();
    }
  });

  return (
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
        <IconButton onClick={addPost} size="large" disabled={adding}>
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default DayPostsView;
