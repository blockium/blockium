import { createGlobalState } from 'react-use';
import { createPaletteConfig } from '../palette';
import { ThemeConfig } from './theme';
import { green } from '../colors';

export const useThemeConfig = createGlobalState<ThemeConfig>({
  paletteConfig: createPaletteConfig(green),
});
