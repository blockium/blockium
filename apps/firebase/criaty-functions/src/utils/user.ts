import admin from './admin';
import { UserRecord } from 'firebase-admin/auth';

import { User } from '@postgpt/types';

import { db } from './db';

export const USER_ERROR_DIFFERENT_USER_NAME = 'USER_ERROR_DIFFERENT_USER_NAME';
export const USER_ERROR_NON_UNIQUE_USER = 'USER_ERROR_NON_UNIQUE_USER';

// Save user's data (phone, name) in Firestore at users collection
export const createUser = async (
  phone: string,
  name: string,
  displayName?: string
) => {
  const user: User = {
    name,
    displayName,
    phone,
  };
  const userDoc = await db.users.add(user);
  user.id = userDoc.id;
  return user;
};

// Get all users with same phone
export const getAllUsers = async (phone: string) => {
  const userQuery = await db.users.where('phone', '==', phone).get();
  return userQuery.docs.map((userDoc) => {
    return { ...userDoc.data(), id: userDoc.id };
  });
};

// Get a user data filtered by phone, creating if it doesn't exist
export const getOrCreateUser = async (
  phone: string,
  name: string,
  displayName?: string,
  allowDifferentNames?: boolean
) => {
  const users = await getAllUsers(phone);

  switch (users.length) {
    case 0:
      return await createUser(phone, name, displayName || name);
    case 1:
      if (users[0].name === phone && phone !== name) {
        // Update user's name
        await updateUser(users[0].id, { name });
        users[0].name = name;
      }

      // If user's display names are different, updates the display name
      if (displayName && users[0].displayName !== displayName) {
        // Update user's name
        await updateUser(users[0].id, { displayName });
        users[0].displayName = displayName;
      }

      // If user's name is different from the one in the database,
      // it may indicate that phone number is being used by another person
      return users[0].name === name || allowDifferentNames
        ? users[0]
        : USER_ERROR_DIFFERENT_USER_NAME;
    default:
      return USER_ERROR_NON_UNIQUE_USER;
  }
};

export const updateUser = async (userId: string, dataToUpdate) => {
  const userRef = db.users.doc(userId);
  await userRef.update(dataToUpdate);
};

// Get Firebase authenticated user data filtered by authId
export const getAuthUser = async (authId: string) => {
  try {
    return await admin.auth().getUser(authId);
  } catch (error) {
    // console.log(error);
    return null;
  }
};

// Check if Firebase user is anonymous
export const isAnonymousUser = (authUser: UserRecord) => {
  return (
    authUser.providerData.length === 0 ||
    (authUser.providerData.length === 1 &&
      authUser.providerData[0].providerId === 'anonymous')
  );
};
