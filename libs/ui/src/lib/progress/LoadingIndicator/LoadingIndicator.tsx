import { ReactNode } from 'react';
// mui
import { Box, CircularProgress, Typography } from '@mui/material';

type LoadingIndicatorProps = {
  children?: ReactNode;
};

export const LoadingIndicator = ({ children }: LoadingIndicatorProps) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress size={80} />
      <Box
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {children}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingIndicator;
