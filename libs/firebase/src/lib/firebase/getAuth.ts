import { connectAuthEmulator, getAuth as fbGetAuth } from 'firebase/auth';
import fbServices from './fbServices';

export const getAuth = () => {
  if (!fbServices.app) {
    throw new Error('initFirebase must be called before using getAuth');
  }
  let auth = fbServices.auth;
  if (!auth) {
    auth = fbGetAuth(fbServices.app);
    auth.useDeviceLanguage();
    fbServices.auth = auth;

    const isDevLocal =
      typeof document !== 'undefined' &&
      document.location.hostname === 'localhost';

    if (isDevLocal) {
      connectAuthEmulator(fbServices.auth, 'http://localhost:9099');
    }
  }
  return auth;
};

export default getAuth;
