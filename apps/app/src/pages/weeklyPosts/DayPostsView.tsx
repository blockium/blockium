import { useEffect, useState } from 'react';
import { addDays, getDay } from 'date-fns';
import { Grid, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { Post, PostFormat, PostStatus, PostType } from '@postgpt/types';
import { getPosts } from '@postgpt/firebase';
import { msg } from '@postgpt/i18n';
import { fDateCalendar } from '@postgpt/utils';
import { CriatyLogo, LoadingIndicator } from '@postgpt/ui-common';

import { PostCard } from '../../components';

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

const postsTemp: (Post | undefined)[] = [
  {
    date: new Date(),
    title: 'Hulk Kids Day',
    description:
      'No Dia das Crianças, nossos pequenos clientes se transformam em super-heróis com unhas de gel incríveis, micropigmentação de sobrancelhas estilosas e tratamentos faciais especiais. Todo o encanto da clínica de estética em uma experiência divertida e personalizada!',
    hashtags:
      '#diadascrianças #superheróis #autoestima #diversão #belezainfantil',
    format: 'story',
    type: 'carousel',
    typeDescription:
      'O carousel começa com uma imagem chamativa de uma criança sendo transformada em seu super-herói favorito. Em seguida, várias fotos mostram diferentes crianças com unhas de gel incríveis, micropigmentação de sobrancelhas estilosas e aproveitando os tratamentos faciais especiais. O carousel destaca a personalização dos serviços oferecidos pela clínica, proporcionando uma experiência única e divertida para as crianças no Dia das Crianças.',
    status: 'initial',
    setStatus: function (status: PostStatus): void {
      throw new Error('Function not implemented.');
    },
  },
  undefined,
];

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

  useEffect(() => {
    // fetch posts from Firebase
    const fetchPosts = async () => {
      const dbPosts = await getPosts(
        sessionStorage.getItem('userId') ?? '',
        date,
        addDays(date, 1),
      );
      console.log('posts', dbPosts);

      if (dbPosts.length === 0) {
        if (topic) {
          // TODO: create a new post for the day
          setPosts([undefined]);
        }
      } else {
        setPosts(dbPosts);
      }
    };

    fetchPosts();
  }, [date, topic]);

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
        <IconButton size="large">
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default DayPostsView;
