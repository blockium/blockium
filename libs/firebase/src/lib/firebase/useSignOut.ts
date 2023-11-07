import { signOut } from 'firebase/auth';
import useAuth from './useAuth';
import getAuth from './getAuth';

export const useSignOut = () => {
  const [, setUser] = useAuth();
  return async () => {
    const auth = getAuth();
    if (auth.currentUser) {
      await signOut(auth);
    }
    setUser(null);
  };
};

export default useSignOut;
