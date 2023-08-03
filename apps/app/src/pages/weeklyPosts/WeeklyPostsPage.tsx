import { useParams } from 'react-router';
import { addDays, getDay, startOfWeek } from 'date-fns';
import { Card, CardHeader, Grid, IconButton, Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { msg } from '@postgpt/i18n';
import { fDateCalendar } from '@postgpt/utils';
import { Post, PostStatus } from '@postgpt/types';

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

const posts: Post[] = [
  {
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
];

export const WeeklyPostsPage: React.FC = (props) => {
  const { isoStartDate } = useParams();
  const startDate = isoStartDate
    ? new Date(isoStartDate)
    : startOfWeek(new Date());

  return (
    <Stack gap="64px">
      <Grid container spacing={4}>
        <Grid item textAlign="center" xs={12}>
          {formatDate(startDate)}
        </Grid>
        <Grid item xs={12} md={6}>
          <PostCard post={posts[0]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '550px' }}>
            <CardHeader title="Post 2" />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '550px' }}>
            <CardHeader title="Post 3" />
          </Card>
        </Grid>
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
      <Grid container spacing={4}>
        <Grid item textAlign="center" xs={12}>
          {formatDate(addDays(startDate, 1))}
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '600px' }}>
            <CardHeader title="Post 4" />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '500px' }}>
            <CardHeader title="Post 5" />
          </Card>
        </Grid>
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
    </Stack>
  );
};

export default WeeklyPostsPage;
