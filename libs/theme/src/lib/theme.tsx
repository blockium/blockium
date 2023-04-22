import React, { PropsWithChildren } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

import {
  createTheme,
  ThemeProvider as BaseThemeProvider,
  CssBaseline,
  PaletteOptions,
  responsiveFontSizes,
} from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import type { LinkProps } from '@mui/material/Link';

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

type PaletteConfig = {
  app: PaletteOptions;
  site: PaletteOptions;
  [key: string]: PaletteOptions;
};

const palettes: PaletteConfig = {
  app: {
    primary: {
      main: '#53CCA5',
    },
    secondary: {
      main: '#0F172A',
    },
  },
  site: {
    primary: {
      main: '#53CCA5',
    },
    secondary: {
      main: '#0F172A',
    },
  },
};

const { host } = window.location;
const config = host.split('.')[0];
const palette = palettes[config] || palettes.site;

const fontFamilyLora = {
  fontFamily: 'Lora',
};
const typography: TypographyOptions = {
  fontFamily: [
    'Work Sans',
    'Roboto',
    '"Helvetica Neue"',
    'Lora',
    '-apple-system',
    'sans-serif',
  ].join(','),
  h1: fontFamilyLora,
  h2: fontFamilyLora,
  h3: fontFamilyLora,
  h4: fontFamilyLora,
  h5: fontFamilyLora,
  h6: fontFamilyLora,
  htmlFontSize: 10,
};

const theme = responsiveFontSizes(
  createTheme({
    palette,
    typography,
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        } as LinkProps,
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
      MuiTableCell: {
        styleOverrides: {
          sizeSmall: { padding: 6 },
        },
      },
    },
  })
);

theme.typography.h1 = {
  ...theme.typography.h1,
  // fontSize: '8.4rem',
  [theme.breakpoints.up('xl')]: {
    fontSize: '8.4rem',
  },
  [theme.breakpoints.down('xl')]: {
    fontSize: '7.2rem',
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: '6.4rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '5.6rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '4.8rem',
  },
};

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <BaseThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </BaseThemeProvider>
  );
}

export default ThemeProvider;
