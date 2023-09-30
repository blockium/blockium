import { dataPoint } from '@blockium/firebase';

import { Post, User } from '@criaty/model-types';

const db = {
  users: dataPoint<User>(`users`),
  posts: (userId: string) => dataPoint<Post>(`users/${userId}/posts`),
};

export { db };
