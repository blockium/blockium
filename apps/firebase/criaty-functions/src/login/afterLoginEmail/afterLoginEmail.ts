import { https } from 'firebase-functions';
import cors from 'cors';

import { User } from '@criaty/model-types';

import {
  createSession,
  expireOldSessions,
  updateSession,
} from '../../utils/session';
import {
  getAuthUser,
  getOrCreateUserByAuthId,
  updateUser,
} from '../../utils/user';
import {
  validateAuthEmail,
  validateAuthId,
  validateAuthUser,
  validateUser,
} from '../../utils/validate';

const validateParams = (request, response) => {
  return validateAuthId(request, response);
};

export const afterLoginEmail = https.onRequest(async (request, response) => {
  // TODO: Review CORS policy
  const corsObj = cors({ origin: true });
  corsObj(request, response, async () => {
    if (!validateParams(request, response)) return;

    try {
      // Get Firebase authenticated user data filtered by authId
      const authUser = await getAuthUser(request.body.authId);
      if (!validateAuthUser(authUser, response)) return;

      // This should never occur as null is treated in validateAuthUser
      // Just for Typescript not complaining below
      if (authUser === null) return;

      // Validates the user if it has an email
      if (!validateAuthEmail(authUser.email, response)) return;

      // Get a user data filtered by phone, creating if it doesn't exist
      const user = (await getOrCreateUserByAuthId(
        authUser.uid,
        authUser.displayName ||
          authUser.email ||
          authUser.phoneNumber ||
          'No name',
        authUser.displayName,
        authUser.email,
        authUser.phoneNumber?.replace(/\D/g, ''),
      )) as User;
      if (!validateUser(user, response)) return;

      // This should never occur as null is treated in validateUser
      // Just for Typescript not complaining below
      if (!user.id) return;

      // Update app user's auth id in Firestore
      await updateUser(user.id, {
        authId: authUser.uid,
      });

      const session = await createSession();

      // Update session status - from 'new to 'waiting'
      await updateSession(user, session);
      session.status = 'waiting';

      // Expire old sessions for a given userId
      await expireOldSessions(user.id);

      // Update session - from 'waiting' to 'started'
      await updateSession(user, session, authUser.uid);

      const { id: userId, name, displayName, email, phone } = user;
      response
        .status(200)
        .send(JSON.stringify({ userId, name, displayName, email, phone }));
    } catch (error) {
      console.log(error);
      response.status(424).send('Houve um erro ao realizar o after login.');
    }
  });
});
