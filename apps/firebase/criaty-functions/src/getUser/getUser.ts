import { https } from 'firebase-functions';
import cors from 'cors';

import { Session, User } from '@criaty/model-types';

import {
  validateAuthId,
  // validateAuthPhone,
  validateAuthUser,
  validatePhone,
  validateSession,
  validateSessionId,
  validateUser,
} from '../utils/validate';
import { getAuthUser, getOrCreateUser, updateUser } from '../utils/user';
import { expireOldSessions, getSession, updateSession } from '../utils/session';

const validateParams = (request, response) => {
  return (
    validateSessionId(request, response) && validateAuthId(request, response)
  );
};

export const getUser = https.onRequest(async (request, response) => {
  // TODO: Review CORS policy
  const corsObj = cors({ origin: true });
  corsObj(request, response, async () => {
    if (!validateParams(request, response)) return;

    try {
      // Retrieve session from Firestore.
      const session = (await getSession(request.body.sessionId)) as Session;
      // Validate session - must have status = 'waiting'
      if (!validateSession(session, response, ['waiting'])) return;

      // Get Firebase authenticated user data filtered by authId
      const authUser = await getAuthUser(request.body.authId);
      if (!validateAuthUser(authUser, response)) return;

      // Commented to allow anonymous auth users
      // if (!validateAuthPhone(authUser.phoneNumber, response)) return;

      const authPhone = authUser.phoneNumber?.replace(/\D/g, '');
      const phone = session.phone || authPhone;
      if (!validatePhone({ body: { phone } }, response)) return;

      const name = session.name || authUser.displayName || phone;

      // Get a user data filtered by phone, creating if it doesn't exist
      const user = (await getOrCreateUser(phone, name)) as User;
      if (!validateUser(user, response)) return;

      // Update app user's auth id in Firestore
      await updateUser(user.id, {
        authId: authUser.uid,
      });

      // Expire old sessions for a given userId
      await expireOldSessions(session.userId);

      // Update session
      await updateSession(user, session, authUser.uid);

      const { id: userId, displayName } = user;
      response
        .status(200)
        .send(JSON.stringify({ userId, phone, name, displayName }));
      //
    } catch (error) {
      console.log(error);
      response.status(424).send('Houve um erro ao obter o usuário.');
    }
  });
});
