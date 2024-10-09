import { FirebaseApp } from 'firebase/app';
import { Analytics } from 'firebase/analytics';
import { Auth } from 'firebase/auth';
import { Functions } from 'firebase/functions';
import { Firestore } from 'firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';
import { Messaging } from 'firebase/messaging';

type FirebaseServices = {
  app?: FirebaseApp;
  auth?: Auth;
  analytics?: Analytics;
  functions?: Functions;
  firestore?: Firestore;
  storage?: FirebaseStorage;
  messaging?: Messaging;
  localEmulator?: boolean;
};

const fbServices: FirebaseServices = {};

export default fbServices;
