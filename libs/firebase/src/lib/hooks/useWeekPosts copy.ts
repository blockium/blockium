import { useEffect, useState } from 'react';

import { Post } from '@postgpt/types';

const useWeekPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('posts')
      .where('createdAt', '>=', startOfWeek(new Date()))
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const newPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];

        setPosts(newPosts);
      });

    return () => unsubscribe();
  }, []);

  return posts;
};
