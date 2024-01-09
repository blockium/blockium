import { createGlobalState } from 'react-use';
import { ThemeConfig } from './theme';

export const useInitialThemeConfig = createGlobalState<ThemeConfig>();
