import {
  connectFunctionsEmulator,
  getFunctions as fbGetFunctions,
} from 'firebase/functions';
import fbServices from './fbServices';

export const getFunctions = () => {
  if (!fbServices.app) {
    throw new Error('initFirebase must be called before using getFunctions');
  }
  let functions = fbServices.functions;
  if (!functions) {
    functions = fbGetFunctions(fbServices.app);
    fbServices.functions = functions;

    // Check if local emulator is used
    if (!fbServices.localEmulator) {
      return functions;
    }

    // If local emulator, check it is a localhost
    const isDevLocal =
      typeof document !== 'undefined' &&
      document.location.hostname === 'localhost';

    if (isDevLocal) {
      // Connects local emulator for functions
      connectFunctionsEmulator(functions, 'localhost', 5001);
    }
  }

  return functions;
};

export default getFunctions;
