import {
  DocumentData,
  QueryDocumentSnapshot,
  WithFieldValue,
  collection,
} from 'firebase/firestore';
import getFirestore from './getFirestore';

const converter = <T>() => ({
  toFirestore: (data: WithFieldValue<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

export const dataPoint = <T extends DocumentData>(collectionPath: string) => {
  const firestore = getFirestore();
  return collection(firestore, collectionPath).withConverter(converter<T>());
};

export default dataPoint;
