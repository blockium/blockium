import { dataPoint } from '@blockium/firebase';

import { Post, User } from '@criaty/model-types';

// TODO: How to dynamically import Firebase from @blockium/firebase?
// let Firebase: typeof import('@blockium/firebase').Firebase;
// import('@blockium/firebase').then((module) => {
//   Firebase = module.Firebase;
// });

const db = {
  users: () => dataPoint<User>(`users`),
  posts: (userId: string) => dataPoint<Post>(`users/${userId}/posts`),
};

export { db };
