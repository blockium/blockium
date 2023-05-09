import { User } from '@postgpt/types';

import { db } from './db';

export const USER_ERROR_DIFFERENT_USER_NAME = 'USER_ERROR_DIFFERENT_USER_NAME';
export const USER_ERROR_NON_UNIQUE_USER = 'USER_ERROR_NON_UNIQUE_USER';

export const getUser = async (phone: string, name: string) => {
  // const { phone } = request.body;
  // const name = request.body.name || phone;

  let user: User = null;

  // Get a user data filtered by phone
  const userQuery = await db.users.where('phone', '==', phone).get();
  const users = userQuery.docs.map((userDoc) => {
    return { ...userDoc.data(), id: userDoc.id };
  });

  // new user:
  if (users.length === 0) {
    // Save user's data (phone, name) in Firestore at users collection
    user = {
      name,
      phone,
    };
    const userDoc = await db.users.add(user);
    user.id = userDoc.id;
    //
    // existing user:
  } else if (users.length === 1) {
    // If user's name is different from the one in the database,
    // it may indicate that phone number is being used by another person
    if (users[0].name !== name) {
      return USER_ERROR_DIFFERENT_USER_NAME;
    }
    user = users[0]; // VALID USER
    //
    // more than one user:
  } else if (users.length > 1) {
    return USER_ERROR_NON_UNIQUE_USER;
  }

  return user;
};
