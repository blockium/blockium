import { createGlobalState } from 'react-use';
import { User as AuthUser } from 'firebase/auth';

export const useAuth = createGlobalState<AuthUser | null>(null);
export default useAuth;
