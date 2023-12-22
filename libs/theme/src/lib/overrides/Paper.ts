import { Theme } from '@mui/material/styles/createTheme';

// ----------------------------------------------------------------------

export default function Paper(theme: Theme) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },

      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: theme.shadows[2],
        },
      },
    },
  };
}
