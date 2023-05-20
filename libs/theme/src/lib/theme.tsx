import {
  PropsWithChildren,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

import {
  createTheme,
  ThemeProvider as BaseThemeProvider,
  CssBaseline,
  ThemeOptions,
  useMediaQuery,
} from '@mui/material';
import type { LinkProps } from '@mui/material/Link';
import { ptBR } from '@mui/material/locale';

import componentsOverride from './overrides';
import createPalette, { PalleteConfig } from './palette';
import createTypography, { FontConfig } from './typography';
import createShadows, { CustomShadows, createCustomShadows } from './shadows';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
    shape: { borderRadius: number };
    customShadows: CustomShadows;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
    shape: { borderRadius: number };
    customShadows: CustomShadows;
  }
}

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

// Dark vs Light mode
type Mode = 'light' | 'dark';

type ColorModeContextProps = {
  mode: Mode;
  toggleColorMode: () => void;
};
const ColorModeContext = createContext<ColorModeContextProps>({
  mode: 'light',
  toggleColorMode: () => {
    void 0;
  },
});

export const useColorMode = () => useContext(ColorModeContext);

export interface ThemeConfig {
  fontConfig?: FontConfig;
  palleteConfig?: PalleteConfig;
}
interface ThemeProviderProps extends PropsWithChildren {
  config?: ThemeConfig;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  config,
  children,
}) => {
  const systemMode = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';
  // const systemMode = 'light';

  const started = useRef<boolean>(false);
  const [mode, setMode] = useState<Mode>(systemMode);
  const toggleColorMode = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    const storedMode = localStorage.getItem('color-mode') as Mode;

    !storedMode || started.current
      ? // Mode not stored or it just changed, save it
        localStorage.setItem('color-mode', mode)
      : // Otherwise, restore it
        setMode(storedMode);

    started.current = true;
  }, [mode]);

  const themeOptions: ThemeOptions = useMemo(() => {
    const palette = createPalette(mode, config?.palleteConfig);
    const typography = createTypography(config?.fontConfig);
    const shadows = createShadows(palette);
    const customShadows: CustomShadows = createCustomShadows(palette);

    return {
      palette,
      shape: { borderRadius: 8 },
      typography,
      shadows,
      customShadows,
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
        MuiUseMediaQuery: {
          defaultProps: {
            noSsr: true,
          },
        },
      },
    };
  }, [config, mode]);

  const theme = createTheme(
    themeOptions,
    ptBR // TODO: dynamically define locale
  );
  theme.components = { ...componentsOverride(theme), ...theme.components };

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <BaseThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </BaseThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProvider;
