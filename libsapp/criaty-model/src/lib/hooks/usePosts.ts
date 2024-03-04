import { useEffect, useState } from 'react';
import { addDays } from 'date-fns';

import { Post } from '@criaty/model-types';
import { getPosts } from '../actions/posts';
import { useUser } from '@blockium/firebase';

export const usePosts = (firstDate: Date, daysInterval = 7) => {
  const [user] = useUser();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const dbPosts = await getPosts(
        user?.id ?? '',
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
