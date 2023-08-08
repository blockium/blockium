import { useEffect, useState } from 'react';
import { addDays, getDay } from 'date-fns';
import { Grid, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { Post, PostFormat, PostType } from '@postgpt/types';
import { db, getPosts } from '@postgpt/firebase';
import { msg } from '@postgpt/i18n';
import { fDateCalendar } from '@postgpt/utils';
import { CriatyLogo, LoadingIndicator } from '@postgpt/ui-common';

import { PostCard } from '../../components';
import { newPosts } from '../../apiRequests';
import { useEffectOnce } from 'react-use';
import { addDoc } from 'firebase/firestore';

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

// TODO: !!! Add a new "deletedDate" field to Post
// TODO: !!! Show only post with "deletedDate" field undefined
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
      setPosts((posts) => [...posts, undefined]);

      // Request the creation of one new post
      newPosts(1, topic, character, format, type)
        .then(async (result) => {
          if (typeof result === 'string') {
            // TODO: !!! Show error in Alert when request post creation fails
            console.log(result);

            // slice remove undefined from end
            setPosts((posts) => posts.slice(0, posts.length - 1));
            return;
          }

          // Save news posts in Firebase
          for (const post of result) {
            try {
              await addDoc(db.posts(sessionStorage.getItem('userId') ?? ''), {
                ...post,
                date,
              });
            } catch (error) {
              // TODO: !!! Show error in Alert when add post fails
              console.log(error);
            }
          }

          // Add the new post to the list
          // slice remove undefined from end
          setPosts((posts) => [...posts.slice(0, posts.length - 1), ...result]);
        })
        .finally(() => {
          setAdding(false);
        });
    }
  };

  useEffect(() => {
    // fetch current posts from Firebase
    const fetchPosts = async () => {
      console.log('fetching posts');
      const dbPosts = await getPosts(
        sessionStorage.getItem('userId') ?? '',
        date,
        addDays(date, 1),
      );

      if (dbPosts.length > 0) {
        setPosts((posts) => [...dbPosts, ...posts]);
      }
    };
    fetchPosts();
  }, [date]);

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
