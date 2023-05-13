import { ReactNode } from 'react';
// mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

type LoadingIndicatorProps = {
  children?: ReactNode;
};

export const LoadingIndicator = ({ children }: LoadingIndicatorProps) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress size={80} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
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
