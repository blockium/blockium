import { createGlobalState } from 'react-use';
import { User } from 'firebase/auth';

export const useFirebaseUser = createGlobalState<User | null>(null);
export default useFirebaseUser;
