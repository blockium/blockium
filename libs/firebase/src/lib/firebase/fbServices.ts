import { FirebaseApp } from 'firebase/app';
import { Analytics } from 'firebase/analytics';
import { Auth } from 'firebase/auth';
import { Functions } from 'firebase/functions';
import { Firestore } from 'firebase/firestore/lite';
import { FirebaseStorage } from 'firebase/storage';

type FirebaseServices = {
  app?: FirebaseApp;
  auth?: Auth;
  analytics?: Analytics;
  functions?: Functions;
  firestore?: Firestore;
  storage?: FirebaseStorage;
  localEmulator?: boolean;
};

const fbServices: FirebaseServices = {};

export default fbServices;
