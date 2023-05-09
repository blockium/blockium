import { https } from 'firebase-functions';
import cors from 'cors';

import { Session } from '@postgpt/types';

import {
  validateName,
  validatePhone,
  validateSession,
  validateSessionId,
} from '../utils/validate';
import { getSession, updateSession } from '../utils/session';

const validateParams = (request, response) => {
  return (
    validatePhone(request, response) &&
    validateName(request, response) &&
    validateSessionId(request, response)
  );
};

export const login = https.onRequest(async (request, response) => {
  // TODO: Review CORS policy
  const corsObj = cors({ origin: true });
  corsObj(request, response, async () => {
    if (!validateParams(request, response)) return;

    // Retrieve session from Firestore.
    const result = await getSession(request.body);
    if (!validateSession(result, response)) return;

    const session = result as Session;

    if (session.status !== 'new') {
      response.status(412).send('Sessão inválida');
      return;
    }

    try {
      const updateStatus = await updateSession(request, response, session);

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
