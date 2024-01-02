import { createContext } from 'react';

// Dark vs Light mode
export type Mode = 'light' | 'dark';

type ColorModeContextProps = {
  mode: Mode;
  toggleColorMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextProps>({
  mode: 'light',
  toggleColorMode: () => {
    void 0;
  },
});
