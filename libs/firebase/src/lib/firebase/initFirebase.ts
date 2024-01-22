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
  localEmulator?: boolean;
};

// Initialize Firebase
export const initFirebase = (firebaseConfig: FirebaseConfig) => {
  fbServices.app = initializeApp(firebaseConfig);
  // Assumes there is a local Firebase emulator by default
  fbServices.localEmulator = firebaseConfig.localEmulator ?? true;
};

export default initFirebase;
