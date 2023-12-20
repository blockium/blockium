import { createGlobalState } from 'react-use';

// Used to set the main content on top in the layout
// A use case is to put something in fullscreen
export const useIsMainOnTop = createGlobalState<boolean>(false);
