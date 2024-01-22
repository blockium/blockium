import { PropsWithChildren, forwardRef, useMemo } from 'react';
import { useEffectOnce } from 'react-use';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

import {
  createTheme,
  ThemeProvider as BaseThemeProvider,
  CssBaseline,
  ThemeOptions,
  LinkProps,
} from '@mui/material';

import componentsOverride from '../overrides';
import createPalette, { PaletteConfig } from '../palette/palette';
import createTypography, { FontConfig } from '../typography/typography';
import createShadows, {
  CustomShadows,
  createCustomShadows,
} from '../shadows/shadows';

import { useColorMode } from './useColorMode';
import { useThemeConfig } from './useThemeConfig';
import { useInitialThemeConfig } from './useInitialThemeConfig';
import { createPaletteConfig } from '../palette';
import { emerald } from '../colors';

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

export interface ThemeConfig {
  fontConfig?: FontConfig;
  paletteConfig?: PaletteConfig;
  initialMode?: 'system' | 'light' | 'dark';
}
interface ThemeProviderProps extends PropsWithChildren {
  config?: ThemeConfig;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  config,
  children,
}) => {
  const [themeConfig, setThemeConfig] = useThemeConfig();
  const [, setInitialConfig] = useInitialThemeConfig();

  useEffectOnce(() => {
    const localThemeConfig = localStorage.getItem('theme-config');
    if (localThemeConfig) {
      // Prefers saved theme config
      setThemeConfig(JSON.parse(localThemeConfig) as ThemeConfig);
    } else if (config) {
      // Initial config
      setThemeConfig(config);
    } else {
      // Default config
      setThemeConfig({
        paletteConfig: createPaletteConfig(emerald),
      });
    }

    if (config) {
      // Initial config
      setInitialConfig(config);
    } else {
      // Default config
      setInitialConfig({
        paletteConfig: createPaletteConfig(emerald),
      });
    }
  });

  const { fontConfig, paletteConfig, initialMode } = themeConfig || {};

  const { colorMode } = useColorMode(initialMode);

  const themeOptions: ThemeOptions = useMemo(() => {
    const palette = createPalette(colorMode, paletteConfig);
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
  }, [colorMode, fontConfig, paletteConfig]);

  // I18n
  const { i18n } = useTranslation();
  const locale = locales[i18n.language as LocaleKey];

  const theme = createTheme(themeOptions, locale);
  theme.components = { ...componentsOverride(theme), ...theme.components };

  return (
    <BaseThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </BaseThemeProvider>
  );
};

export default ThemeProvider;
