import { Firebase } from '@blockium/firebase';

import { Post, User } from '@criaty/model-types';

const db = {
  users: () => Firebase.dataPoint<User>(`users`),
  posts: (userId: string) => Firebase.dataPoint<Post>(`users/${userId}/posts`),
};

export { db };
