import { https } from 'firebase-functions';
import cors from 'cors';

import { Session, User } from '@criaty/model-types';

import {
  validateName,
  validatePhone,
  validateSession,
  validateSessionId,
  validateUser,
} from '../../utils/validate';
import { getSession, updateSession } from '../../utils/session';
import { getOrCreateUser } from '../../utils/user';

const validateParams = (request, response) => {
  return (
    validatePhone(request, response) &&
    validateName(request, response) &&
    validateSessionId(request, response)
  );
};

export const loginWhatsApp = https.onRequest(async (request, response) => {
  // TODO: Review CORS policy
  const corsObj = cors({ origin: true });
  corsObj(request, response, async () => {
    if (!validateParams(request, response)) return;

    try {
      // Retrieve session from Firestore.
      const session = (await getSession(request.body.sessionId)) as Session;
      // Validate session on login - must have status = 'new'
      if (!validateSession(session, response, ['new'])) return;

      // Get a user data filtered by phone, creating if it doesn't exist
      const { phone, name } = request.body;
      const user = (await getOrCreateUser(phone, name || phone)) as User;
      if (!validateUser(user, response)) return;

      // Update session status - from 'new to 'waiting'
      const updateStatus = await updateSession(user, session);

      response
        .status(200)
        .send(JSON.stringify({ sessionId: session.id, status: updateStatus }));
      //
    } catch (error) {
      console.log(error);
      response.status(424).send('Houve um erro ao realizar o login.');
    }
  });
});
