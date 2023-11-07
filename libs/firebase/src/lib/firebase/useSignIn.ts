import { User as UserAuth } from 'firebase/auth';
import useAuth from './useAuth';

export const useSignIn = () => {
  const [, setUser] = useAuth();
  return (user: UserAuth | null) => {
    setUser(user);
  };
};

export default useSignIn;
