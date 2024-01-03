import { alpha, PaletteColor, PaletteOptions } from '@mui/material/styles';
import { ColorPartial } from '@mui/material/styles/createPalette';

// In TypeScript, we need to use module augmentation for the theme to accept  aditional values:
declare module '@mui/material' {
  interface Color {
    0: string;
    500_8: string;
    500_12: string;
    500_16: string;
    500_24: string;
    500_32: string;
    500_48: string;
    500_56: string;
    500_80: string;
  }
}

declare module '@mui/material/styles' {
  interface TypeBackground {
    neutral: string;
  }
  interface PaletteColor {
    lighter: string;
    light: string;
    main: string;
    dark: string;
    darker: string;
    contrastText: string;
  }
  interface Palette {
    gradients?: {
      primary: string;
      info: string;
      success: string;
      warning: string;
      error: string;
    };
    chart: {
      violet: string[];
      blue: string[];
      green: string[];
      yellow: string[];
      red: string[];
    };
  }
  interface PaletteOptions {
    grey?: ColorPartial;
    gradients?: {
      primary: string;
      info: string;
      success: string;
      warning: string;
      error: string;
    };
    chart?: {
      violet: string[];
      blue: string[];
      green: string[];
      yellow: string[];
      red: string[];
    };
  }
}

export interface BackgroundColor {
  paper?: string;
  default?: string;
  neutral?: string;
}

export interface PalleteConfig {
  light?: {
    primary?: Omit<PaletteColor, 'contrastText'>;
    secondary?: Omit<PaletteColor, 'contrastText'>;
    background?: BackgroundColor;
  };
  dark?: {
    primary?: Omit<PaletteColor, 'contrastText'>;
    secondary?: Omit<PaletteColor, 'contrastText'>;
    background?: BackgroundColor;
  };
}

// ----------------------------------------------------------------------

function createGradient(color1: string, color2: string) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

// Colors generated by https://colors.eva.design/ based on main color: #329273
// Got colors 100, 300, 500, 700, 900 from the generated palette
// Except for SECONDARY color (see comment below)

const PRIMARY = {
  lighter: '#D8F9E2',
  light: '#86DEB0',
  main: '#329273',
  dark: '#19695F',
  darker: '#094146',
  contrastText: GREY[0],
};

const PRIMARY_DARK = {
  lighter: '#E7F8EF',
  light: '#D8F9E2',
  main: '#86DEB0',
  dark: '#329273',
  darker: '#19695F',
  contrastText: GREY[0],
};

// Secondary colors generated by https://www.tints.dev/ based on colors:
// #030B09 (light theme) and #ECF8F5 (dark theme)

const SECONDARY = {
  lighter: '#2EA88A', // 300
  light: '#185848', // 400
  main: '#030B09', // 500
  dark: '#020807', // 700
  darker: '#010403', // 900
  contrastText: GREY[900],
};

const SECONDARY_DARK = {
  lighter: '#F4FBF9', // 300
  light: '#F0FAF7', // 400
  main: '#ECF8F5', // 500
  dark: '#A6DED0', // 600
  darker: '#5FC4AB', // 700
  contrastText: GREY[900],
};

const SUCCESS = {
  lighter: '#CBFBD1',
  light: '#64EB8F',
  main: '#09BF67',
  dark: '#048963',
  darker: '#015B54',
  contrastText: GREY[900],
};

const INFO = {
  lighter: '#CAF4FD',
  light: '#62CAF3',
  main: '#0282D8',
  dark: '#014B9B',
  darker: '#002567',
  contrastText: GREY[900],
};

const WARNING = {
  lighter: '#FEFBCD',
  light: '#FEEE6B',
  main: '#FCDC0A',
  dark: '#B59905',
  darker: '#786201',
  contrastText: GREY[900],
};

const ERROR = {
  lighter: '#FCE3D4',
  light: '#F1947D',
  main: '#D32F2A',
  dark: '#971527',
  darker: '#650825',
  contrastText: GREY[900],
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

const LIGHT_BACKGROUND: BackgroundColor = {
  paper: '#fff',
  default: GREY[100],
  neutral: GREY[200],
};

const DARK_BACKGROUND: BackgroundColor = {
  paper: '#212B36',
  default: '#171C23',
  neutral: GREY[800],
};

export const paletteLight: (config?: PalleteConfig) => PaletteOptions = (
  config?: PalleteConfig,
) => {
  const primaryGradient =
    config?.light?.primary?.light && config?.light?.primary?.main
      ? createGradient(
          config.light?.primary?.light,
          config.light?.primary?.main,
        )
      : GRADIENTS.primary;

  return {
    mode: 'light',
    common: { black: '#000', white: '#fff' },
    primary: { ...PRIMARY, ...config?.light?.primary },
    secondary: { ...SECONDARY, ...config?.light?.secondary },
    info: { ...INFO },
    success: { ...SUCCESS },
    warning: { ...WARNING },
    error: { ...ERROR },
    grey: GREY,
    gradients: { ...GRADIENTS, primary: primaryGradient },
    chart: CHART_COLORS,
    divider: GREY[500_24],
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: config?.light?.background || LIGHT_BACKGROUND,
    action: {
      active: GREY[600],
      hover: GREY[500_8],
      selected: GREY[500_16],
      disabled: GREY[500_80],
      disabledBackground: GREY[500_24],
      focus: GREY[500_24],
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
  };
};

export const paletteDark: (config?: PalleteConfig) => PaletteOptions = (
  config?: PalleteConfig,
) => {
  const primaryGradient =
    config?.dark?.primary?.light && config?.dark?.primary?.main
      ? createGradient(config.dark?.primary?.light, config.dark?.primary?.main)
      : GRADIENTS.primary;

  return {
    mode: 'dark',
    common: { black: '#000', white: '#fff' },
    primary: { ...PRIMARY_DARK, ...config?.dark?.primary },
    secondary: { ...SECONDARY_DARK, ...config?.dark?.secondary },
    info: { ...INFO },
    success: { ...SUCCESS },
    warning: { ...WARNING },
    error: { ...ERROR },
    grey: GREY,
    gradients: { ...GRADIENTS, primary: primaryGradient },
    chart: CHART_COLORS,
    divider: alpha('#FFF', 0.24),
    text: { primary: GREY[0], secondary: GREY[100], disabled: GREY[300] },
    background: config?.dark?.background || DARK_BACKGROUND,
    action: {
      active: GREY[600],
      hover: GREY[500_8],
      selected: GREY[500_16],
      disabled: GREY[500_80],
      disabledBackground: GREY[500_24],
      focus: GREY[500_24],
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
  };
};

const createPalette: (
  mode: 'light' | 'dark',
  config?: PalleteConfig,
) => PaletteOptions = (mode, config) => {
  return mode === 'light' ? paletteLight(config) : paletteDark(config);
};

export default createPalette;
