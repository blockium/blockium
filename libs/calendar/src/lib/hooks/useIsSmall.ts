import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const useIsSmall = () => {
  const theme = useTheme();
  const isSmall = !useMediaQuery(theme.breakpoints.up('md'));
  return isSmall;
};
