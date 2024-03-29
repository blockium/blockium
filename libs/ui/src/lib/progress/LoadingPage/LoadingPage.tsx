import { Box, useMediaQuery, useTheme } from '@mui/material';

import { LoadingIndicator } from '../LoadingIndicator';

const DRAWER_WIDTH = 280;

interface LoadingPageProps {
  logo?: React.ReactElement;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({ logo }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  // left on 0 or DRAWER_WIDTH depending on screen size
  return (
    <Box
      position="absolute"
      top={0}
      left={isDesktop ? DRAWER_WIDTH : 0}
      bottom={0}
      right={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <LoadingIndicator>{logo}</LoadingIndicator>
    </Box>
  );
};

export default LoadingPage;
