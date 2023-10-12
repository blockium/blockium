import { Box } from '@mui/material';

import { LoadingIndicator } from '../LoadingIndicator';

interface LoadingPageProps {
  logo: React.ReactElement;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({ logo }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ width: '100% ', height: '100vh' }}
    >
      <LoadingIndicator>{logo}</LoadingIndicator>
    </Box>
  );
};

export default LoadingPage;
