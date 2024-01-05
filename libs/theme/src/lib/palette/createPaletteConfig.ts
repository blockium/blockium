import tinycolor from 'tinycolor2';
import { PaletteConfig } from './palette';

export const createPaletteConfig = (mainColor: string) => {
  const lightSecondary = tinycolor(mainColor)
    .complement()
    .darken(20)
    .toHexString();

  const darkSecondary = tinycolor(mainColor).lighten(40).toString();

  const paletteConfig: PaletteConfig = {
    light: {
      primary: { main: mainColor },
      secondary: { main: lightSecondary },
    },
    dark: {
      primary: { main: mainColor },
      secondary: { main: darkSecondary },
    },
  };

  return paletteConfig;
};
