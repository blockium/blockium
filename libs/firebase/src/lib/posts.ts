import { query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

import { Post } from '@postgpt/types';

export const getPosts = async (
  userId: string,
  startDate: Date,
  endDate: Date,
) => {
  const q = query(
    db.posts(userId),
    where('date', '>=', startDate.toISOString()),
    where('date', '<=', endDate.toISOString()),
  );

  const posts: Post[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    posts.push(doc.data());
  });
  return posts;
};
