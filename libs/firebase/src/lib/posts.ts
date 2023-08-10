import {
  query,
  where,
  getDocs,
  Timestamp,
  doc,
  setDoc,
  addDoc,
} from 'firebase/firestore';
import { db } from './firebase';

import { Post } from '@postgpt/types';

export const getPosts = async (
  userId: string,
  startDate: Date,
  endDate: Date,
) => {
  const q = query(
    db.posts(userId),
    where('date', '>=', startDate),
    where('date', '<', endDate),
  );

  const posts: Post[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    posts.push({
      ...doc.data(),
      id: doc.id,
      date: (doc.data().date as unknown as Timestamp).toDate(),
    });
  });
  return posts;
};

export const addPost = async (userId: string, post: Post) => {
  return await addDoc(db.posts(userId), post);
};

export const savePost = async (userId: string, post: Post) => {
  const docRef = doc(db.posts(userId), post.id);
  await setDoc(docRef, post, { merge: true });
};
