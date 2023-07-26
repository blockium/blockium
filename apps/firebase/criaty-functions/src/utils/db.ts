import admin from './admin';

import { Session, User, UserPrompt } from '@postgpt/types';

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

const dataPoint = <T>(collectionPath: string) =>
  admin.firestore().collection(collectionPath).withConverter(converter<T>());

const db = {
  users: dataPoint<User>('users'),
  userPrompts: (userId: string) =>
    dataPoint<UserPrompt>(`users/${userId}/prompts`),
  sessions: dataPoint<Session>('sessions'),
};
export { db };
