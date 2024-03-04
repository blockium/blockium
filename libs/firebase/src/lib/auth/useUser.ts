import { createGlobalState } from 'react-use';
import { IUser } from '.';

export const useUser = createGlobalState<IUser | null>(null);
export default useUser;
