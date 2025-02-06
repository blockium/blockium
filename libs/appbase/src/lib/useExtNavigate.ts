import { createGlobalState } from 'react-use';

export const useExtNavigate = createGlobalState<string | undefined>();
