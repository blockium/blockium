import { getFunctions as fbGetFunctions } from 'firebase/functions';
import fbServices from './fbServices';

export const getFunctions = () => {
  if (!fbServices.app) {
    throw new Error('initFirebase must be called before using getFunctions');
  }
  let functions = fbServices.functions;
  if (!functions) {
    functions = fbGetFunctions(fbServices.app);
    fbServices.functions = functions;
  }
  return functions;
};

export default getFunctions;
