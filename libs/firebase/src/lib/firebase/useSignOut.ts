import { signOut } from 'firebase/auth';
import useFirebaseUser from './useFirebaseUser';
import getAuth from './getAuth';
import { useUser } from '../auth';

export const useSignOut = () => {
  const [, setFirebaseUser] = useFirebaseUser();
  const [, setUser] = useUser();
  return async () => {
    const auth = getAuth();
    if (auth.currentUser) {
      await signOut(auth);
    }
    setFirebaseUser(null);
    setUser(null);
    sessionStorage.clear();
  };
};

export default useSignOut;
