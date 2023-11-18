import { User as AuthUser } from 'firebase/auth';
import useAuth from './useAuth';

export const useSignIn = () => {
  const [, setUser] = useAuth();
  return (user: AuthUser | null) => {
    setUser(user);
  };
};

export default useSignIn;
