import { auth, logger } from 'firebase-functions';

import {
  USER_ERROR_DIFFERENT_USER_NAME,
  getAllUsers,
  getUser,
  isAnonymousUser,
} from '../utils/user';
import { db } from '../utils/db';
import { UserRecord } from 'firebase-admin/auth';

export const createUserOnAuth = auth.user().onCreate(async (authUser) => {
  if (isAnonymousUser(authUser as UserRecord)) {
    logger.log('Can not create app user for anonymous user');
    return;
  }

  const { phoneNumber, displayName: name } = authUser;

  // Creates new user only if it has a phone number
  if (!phoneNumber) {
    logger.log('Can not create app user without phone number');
    return;
  }

  const phone = phoneNumber.replace(/\D/g, '');
  let user = await getUser(phone, name || phone);
  if (typeof user === 'string') {
    if (user !== USER_ERROR_DIFFERENT_USER_NAME) {
      logger.log(user);
      return;
    }
    // user === USER_ERROR_DIFFERENT_USER_NAME means only that the
    // app user's name is different from auth user
    const users = await getAllUsers(phone);
    user = users[0];
  }

  // Update app user's auth id in Firestore
  const userRef = await db.users.doc(user.id);
  await userRef.update({
    authId: authUser.uid,
  });
});
