import { createGlobalState } from 'react-use';
import { User as UserAuth } from 'firebase/auth';

export const useAuth = createGlobalState<UserAuth | null>(null);
export default useAuth;
