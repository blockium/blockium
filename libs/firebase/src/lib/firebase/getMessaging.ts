import { getMessaging as fbGetMessaging } from 'firebase/messaging';
import fbServices from './fbServices';

export const getMessaging = () => {
  if (!fbServices.app) {
    throw new Error('initFirebase must be called before using getMessaging');
  }
  let messaging = fbServices.messaging;
  if (!messaging) {
    messaging = fbGetMessaging(fbServices.app);
    fbServices.messaging = messaging;
  }
  return messaging;
};

export default getMessaging;
