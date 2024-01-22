import { initializeApp } from 'firebase/app';

import fbServices from './fbServices';

export type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
};

// Initialize Firebase
export const initFirebase = (firebaseConfig: FirebaseConfig) => {
  fbServices.app = initializeApp(firebaseConfig);
};

export default initFirebase;
