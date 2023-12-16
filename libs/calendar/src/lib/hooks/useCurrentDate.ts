import { createGlobalState } from 'react-use';

export const useCurrentDate = createGlobalState<Date>(new Date());
