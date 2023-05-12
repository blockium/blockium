import { Container, Typography, IconButton, Box, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Post } from '@postgpt/types';
import { useIntlMessage } from '@postgpt/i18n';

import { PostCard } from '../PostCard';

export const WeeklyPostsBoard: React.FC<Post[]> = (posts) => {
  const msg = useIntlMessage();

  const days = [
    msg('app.monday'),
    msg('app.tuesday'),
    msg('app.wednesday'),
    msg('app.thursday'),
    msg('app.friday'),
    msg('app.saturday'),
    msg('app.sunday'),
  ];

  return (
    <Container maxWidth="lg" sx={{ marginTop: '4rem' }}>
      <Typography variant="h4" marginBottom="3rem">
        {msg('app.weeklyview.title')}
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 2,
        }}
      >
        {days.map((day, index) => (
          <Stack key={index} gap={0.5}>
            <Typography
              variant="h5"
              textAlign="center"
              gutterBottom
              fontFamily="Work Sans"
            >
              {day}
            </Typography>
            <PostCard {...posts[index]} />
            <IconButton color="primary" sx={{ alignSelf: 'center' }}>
              <AddIcon fontSize="large" />
            </IconButton>
          </Stack>
        ))}
      </Box>{' '}
    </Container>
  );
};
