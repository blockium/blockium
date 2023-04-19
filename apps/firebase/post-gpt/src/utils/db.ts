import admin from 'firebase-admin';
import { User, UserPrompt } from '@postgpt/types';

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
};
export { db };
