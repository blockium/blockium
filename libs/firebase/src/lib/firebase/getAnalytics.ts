import { getAnalytics as fbGetAnalytics } from 'firebase/analytics';
import fbServices from './fbServices';

export const getAnalytics = () => {
  if (!fbServices.app) {
    throw new Error('initFirebase must be called before using getAnalytics');
  }
  let analytics = fbServices.analytics;
  if (!analytics) {
    analytics = fbGetAnalytics(fbServices.app);
    fbServices.analytics = analytics;
  }
  return analytics;
};

export default getAnalytics;
