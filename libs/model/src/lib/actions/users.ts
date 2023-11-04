import { doc, getDoc, setDoc } from 'firebase/firestore/lite';

import { db } from '../db';
import { User } from '@criaty/model-types';

export const getUser = async (userId: string) => {
  const docRef = doc(db.users(), userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { ...docSnap.data(), id: docSnap.id } : null;
};

export const saveUser = async (user: User) => {
  const docRef = doc(db.users(), user.id);
  await setDoc(docRef, user, { merge: true });
};

export const saveUserBusiness = async (user: User) => {
  const docRef = doc(db.users(), user.id);
  await setDoc(docRef, { business: user.business }, { merge: true });
};
