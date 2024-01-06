import { createGlobalState } from 'react-use';
import { ThemeConfig } from './theme';

export const useThemeConfig = createGlobalState<ThemeConfig>();
