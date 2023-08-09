import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export const getUser = async (userId: string) => {
  const docRef = doc(db.users, userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};
