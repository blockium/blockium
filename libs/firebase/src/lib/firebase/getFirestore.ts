import {
  connectFirestoreEmulator,
  getFirestore as fbGetFirestore,
} from 'firebase/firestore/lite';
import fbServices from './fbServices';

export const getFirestore = () => {
  if (!fbServices.app) {
    throw new Error('initFirebase must be called before using getFirestore');
  }
  let firestore = fbServices.firestore;
  if (!firestore) {
    firestore = fbGetFirestore(fbServices.app);
    fbServices.firestore = firestore;

    const isDevLocal =
      typeof document !== 'undefined' &&
      document.location.hostname === 'localhost';

    if (isDevLocal) {
      connectFirestoreEmulator(fbServices.firestore, 'localhost', 8080);
    }
  }
  return firestore;
};

export default getFirestore;
