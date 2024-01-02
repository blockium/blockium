import { useCallback } from 'react';
import { createGlobalState, useEffectOnce } from 'react-use';
import { useMediaQuery } from '@mui/material';

// Dark vs Light mode
type Mode = 'light' | 'dark';

const useColorModeGlobal = createGlobalState<Mode>('light');

export const useColorMode = (initialMode: Mode | 'system' = 'system') => {
  const systemMode = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';

  const startMode: Mode =
    !initialMode || initialMode === 'system' ? systemMode : initialMode;

  const [colorMode, setColorMode] = useColorModeGlobal();

  const toggleColorMode = useCallback(() => {
    const newColorMode = colorMode === 'light' ? 'dark' : 'light';
    setColorMode(newColorMode);
    localStorage.setItem('color-mode', newColorMode);
  }, [colorMode, setColorMode]);

  useEffectOnce(() => {
    const storedMode =
      (localStorage.getItem('color-mode') as Mode) || startMode;
    setColorMode(storedMode);
  });

  return { colorMode, toggleColorMode };
};
