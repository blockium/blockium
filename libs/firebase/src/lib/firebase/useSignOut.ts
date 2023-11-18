import { signOut } from 'firebase/auth';
import useAuth from './useAuth';
import getAuth from './getAuth';

export const useSignOut = () => {
  const [, setAuthUser] = useAuth();
  return async () => {
    const auth = getAuth();
    if (auth.currentUser) {
      await signOut(auth);
    }
    setAuthUser(null);
  };
};

export default useSignOut;
