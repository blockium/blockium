import { Theme } from '@mui/material/styles/createTheme';

// ----------------------------------------------------------------------

export default function ScopedCssBaseline(theme: Theme) {
  return {
    MuiScopedCssBaseline: {
      styleOverrides: {
        // Note that we don't use global selectors like html, body here
        // Styles are applied to the root element of ScopedCssBaseline
        '&': {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        '& *': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        '& input': {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        '& img': {
          display: 'block',
          maxWidth: '100%',
        },
      },
    },
  };
}
