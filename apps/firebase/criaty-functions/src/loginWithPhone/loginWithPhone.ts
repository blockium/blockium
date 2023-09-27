import { https } from 'firebase-functions';
import cors from 'cors';

import { User } from '@criaty/model';

import {
  createSession,
  expireOldSessions,
  updateSession,
} from '../utils/session';
import { getAuthUser, getOrCreateUser, updateUser } from '../utils/user';
import {
  validateAuthId,
  validateAuthPhone,
  validateAuthUser,
  validateUser,
} from '../utils/validate';

const validateParams = (request, response) => {
  return validateAuthId(request, response);
};

export const loginWithPhone = https.onRequest(async (request, response) => {
  // TODO: Review CORS policy
  const corsObj = cors({ origin: true });
  corsObj(request, response, async () => {
    if (!validateParams(request, response)) return;

    try {
      // Get Firebase authenticated user data filtered by authId
      const authUser = await getAuthUser(request.body.authId);
      if (!validateAuthUser(authUser, response)) return;

      // Validates the user if it has a phone number
      if (!validateAuthPhone(authUser.phoneNumber, response)) return;

      const authPhone = authUser.phoneNumber.replace(/\D/g, '');
      const phone = authPhone;

      // Get a user data filtered by phone, creating if it doesn't exist
      const user = (await getOrCreateUser(
        phone,
        phone,
        authUser.displayName,
        true,
      )) as User;
      if (!validateUser(user, response)) return;

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

      const { id: userId, name, displayName } = user;
      response
        .status(200)
        .send(JSON.stringify({ userId, phone, name, displayName }));
    } catch (error) {
      console.log(error);
      response.status(424).send('Houve um erro ao realizar o login.');
    }
  });
});
