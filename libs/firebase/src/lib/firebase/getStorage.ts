import {
  connectStorageEmulator,
  getStorage as fbGetStorage,
} from 'firebase/storage';
import fbServices from './fbServices';

export const getStorage = () => {
  if (!fbServices.app) {
    throw new Error('initFirebase must be called before using getStorage');
  }
  let storage = fbServices.storage;
  if (!storage) {
    storage = fbGetStorage(fbServices.app);
    fbServices.storage = storage;

    // Check if local emulator is used
    if (!fbServices.localEmulator) {
      return storage;
    }

    // If local emulator, check it is a localhost
    const isDevLocal =
      typeof document !== 'undefined' &&
      document.location.hostname === 'localhost';

    if (isDevLocal) {
      // Connects local emulator for storage
      connectStorageEmulator(fbServices.storage, 'localhost', 9199);
    }
  }
  return storage;
};

export default getStorage;
