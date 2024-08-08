import {
  connectFirestoreEmulator,
  getFirestore as fbGetFirestore,
} from 'firebase/firestore';
import fbServices from './fbServices';

export const getFirestore = () => {
  if (!fbServices.app) {
    throw new Error('initFirebase must be called before using getFirestore');
  }
  let firestore = fbServices.firestore;
  if (!firestore) {
    firestore = fbGetFirestore(fbServices.app);
    fbServices.firestore = firestore;

    // Check if local emulator is used
    if (!fbServices.localEmulator) {
      return firestore;
    }

    // If local emulator, check it is a localhost
    const isDevLocal =
      typeof document !== 'undefined' &&
      document.location.hostname === 'localhost';

    if (isDevLocal) {
      // Connects local emulator for firestore
      connectFirestoreEmulator(fbServices.firestore, 'localhost', 8080);
    }
  }
  return firestore;
};

export default getFirestore;
