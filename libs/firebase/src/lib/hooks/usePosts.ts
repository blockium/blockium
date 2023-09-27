import { useEffect, useState } from 'react';

import { Post } from '@blockium/types';
import { getPosts } from '../posts';
import { addDays } from 'date-fns';

export const usePosts = (firstDate: Date, daysInterval = 7) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const dbPosts = await getPosts(
        sessionStorage.getItem('userId') ?? '',
        firstDate,
        addDays(firstDate, daysInterval),
      );

      if (dbPosts.length > 0) {
        setPosts(dbPosts);
      }
    };

    fetchPosts();
  }, []);

  return posts;
};

export default usePosts;
