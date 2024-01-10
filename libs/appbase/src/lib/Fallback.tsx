import { Box, Stack } from '@mui/material';

type FallbackProps = {
  error: Error;
};

export const Fallback: React.FC<FallbackProps> = ({ error }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        width: '100% ',
        height: '100vh',
        bgcolor: (theme) => theme.palette.error.lighter,
      }}
    >
      <Stack alignItems="center" gap={2} marginTop="25vh">
        <p>Ooops:</p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
      </Stack>
    </Box>
  );
};
