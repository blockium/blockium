import { useCallback } from 'react';
import { signOut } from 'firebase/auth';
import useFirebaseUser from './useFirebaseUser';
import getAuth from './getAuth';
import { useUser } from '../auth';

export const useSignOut = () => {
  const [, setFirebaseUser] = useFirebaseUser();
  const [, setUser] = useUser();
  return useCallback(async () => {
    const auth = getAuth();
    if (auth.currentUser) {
      await signOut(auth);
    }
    setFirebaseUser(null);
    setUser(null);
    localStorage.setItem('userId', '');
  }, [setFirebaseUser, setUser]);
};

export default useSignOut;
