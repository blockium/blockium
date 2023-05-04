import { Container, Typography, IconButton, Box, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Post } from '@postgpt/types';
import { PostCard } from '../PostCard/PostCard';

export const WeeklyPostView: React.FC<Post[]> = (posts) => {
  const days = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ];

  return (
    <Container maxWidth="lg" sx={{ marginTop: '4rem' }}>
      <Typography variant="h4" marginBottom="3rem">
        Calendário de Postagem
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
