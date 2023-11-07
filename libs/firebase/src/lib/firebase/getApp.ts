import fbServices from './fbServices';

export const getApp = () => {
  const app = fbServices.app;
  if (!app) {
    throw new Error('initFirebase must be called before using getApp');
  }
  return app;
};

export default getApp;
