import {
  QueryDocumentSnapshot,
  WithFieldValue,
  collection,
} from 'firebase/firestore/lite';
import getFirestore from './getFirestore';

const converter = <T>() => ({
  toFirestore: (data: WithFieldValue<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

export const dataPoint = <T>(collectionPath: string) => {
  const firestore = getFirestore();
  return collection(firestore, collectionPath).withConverter(converter<T>());
};

export default dataPoint;
