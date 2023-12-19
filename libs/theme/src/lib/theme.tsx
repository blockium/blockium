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
  LinkProps,
} from '@mui/material';

import componentsOverride from './overrides';
import createPalette, { PalleteConfig } from './palette';
import createTypography, { FontConfig } from './typography';
import createShadows, { CustomShadows, createCustomShadows } from './shadows';

// Current supported languages
import { useTranslation } from 'react-i18next';
import { ptBR } from '@mui/material/locale';
const locales = {
  'pt-BR': ptBR,
  // Add new locales here, using the i18next.language as the key
};
type LocaleKey = keyof typeof locales;

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
  initialMode?: 'system' | 'light' | 'dark';
}
interface ThemeProviderProps extends PropsWithChildren {
  config?: ThemeConfig;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  config,
  children,
}) => {
  const { fontConfig, palleteConfig, initialMode } = config || {};

  const systemMode = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';
  const startMode =
    !initialMode || initialMode === 'system' ? systemMode : initialMode;

  const started = useRef<boolean>(false);
  const [mode, setMode] = useState<Mode>(startMode);
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
    const palette = createPalette(mode, palleteConfig);
    const typography = createTypography(fontConfig);
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
  }, [fontConfig, mode, palleteConfig]);

  // I18n
  const { i18n } = useTranslation();
  const locale = locales[i18n.language as LocaleKey];

  const theme = createTheme(themeOptions, locale);
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
