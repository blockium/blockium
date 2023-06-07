// ----------------------------------------------------------------------

import { Typography } from '@mui/material/styles/createTypography';

type FontType = {
  fontFamily: string;
  fontWeight: number;
  lineHeight: number;
  fontSize: string;
};

declare module '@mui/material/styles/createTypography' {
  interface Typography {
    h1: FontType;
    h2: FontType;
    h3: FontType;
    h4: FontType;
    h5: FontType;
    h6: FontType;
    subtitle1: FontType;
    subtitle2: FontType;
  }
}

export interface FontConfig {
  primaryFonts: string[];
  headerFonts: string[];
}

const htmlFontSize = 10;
const fontSize = 14;
const coef = fontSize / 14;

function pxToRem(value: number) {
  return `${value / htmlFontSize}rem`;
}

function responsiveFontSizes({
  sm,
  md,
  lg,
}: {
  sm: number;
  md: number;
  lg: number;
}) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

const FONT_PRIMARY = [
  '"Work Sans"',
  'Roboto',
  '"Helvetica Neue"',
  '-apple-system',
  'sans-serif',
].join(',');

const FONT_HEADERS = 'Poppins, sans-serif';

const typography: (config?: FontConfig) => Typography = (
  config?: FontConfig
) => {
  const headerFonts = config?.headerFonts.join(',');
  return {
    fontFamily: config?.primaryFonts.join(',') || FONT_PRIMARY,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontFamily: headerFonts || FONT_HEADERS,
      fontWeight: 600,
      lineHeight: 80 / 64,
      fontSize: pxToRem(40),
      ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
    },
    h2: {
      fontFamily: headerFonts || FONT_HEADERS,
      fontWeight: 600,
      lineHeight: 64 / 48,
      fontSize: pxToRem(32),
      ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
    },
    h3: {
      fontFamily: headerFonts || FONT_HEADERS,
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: pxToRem(24),
      ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
    },
    h4: {
      fontFamily: headerFonts || FONT_HEADERS,
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: pxToRem(20),
      ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
    },
    h5: {
      fontFamily: headerFonts || FONT_HEADERS,
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: pxToRem(18),
      ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
    },
    h6: {
      fontFamily: headerFonts || FONT_HEADERS,
      fontWeight: 600,
      lineHeight: 28 / 18,
      fontSize: pxToRem(17),
      ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
    },
    subtitle1: {
      fontFamily: headerFonts || FONT_HEADERS,
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: pxToRem(16),
    },
    subtitle2: {
      fontFamily: headerFonts || FONT_HEADERS,
      fontWeight: 600,
      lineHeight: 22 / 14,
      fontSize: pxToRem(14),
    },
    body1: {
      lineHeight: 1.5,
      fontSize: pxToRem(16),
    },
    body2: {
      lineHeight: 22 / 14,
      fontSize: pxToRem(14),
    },
    caption: {
      lineHeight: 1.5,
      fontSize: pxToRem(12),
    },
    overline: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: pxToRem(12),
      letterSpacing: 1.1,
      textTransform: 'uppercase',
    },
    button: {
      fontWeight: 500,
      lineHeight: 24 / 14,
      fontSize: pxToRem(14),
      textTransform: 'uppercase',
    },
    fontSize,
    htmlFontSize,
    pxToRem: (size) => `${(size / htmlFontSize) * coef}rem`,
  };
};

const createTypography = (config?: FontConfig) => typography(config);

export default createTypography;