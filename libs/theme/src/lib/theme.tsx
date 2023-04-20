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
} from '@mui/material';
import type { LinkProps } from '@mui/material/Link';

import '@fontsource/lora/400.css';
import '@fontsource/work-sans/400.css';

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

type ThemeConfig = {
  app: PaletteOptions;
  site: PaletteOptions;
  [key: string]: PaletteOptions;
};

const themes: ThemeConfig = {
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
const palette = themes[config] || themes.site;

const theme = createTheme({
  palette,
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
});

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <BaseThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </BaseThemeProvider>
  );
}

export default ThemeProvider;
