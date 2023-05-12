import { https } from 'firebase-functions';
import cors from 'cors';

import { Session } from '@postgpt/types';

import {
  validateAuthId,
  validateSession,
  validateSessionId,
} from '../utils/validate';
import { getSession, updateSession } from '../utils/session';

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

    const { sessionId, authId } = request.body;

    // Retrieve session from Firestore.
    const result = await getSession(sessionId);
    if (!validateSession(result, response)) return;

    const session = result as Session;

    const { status } = session;
    if (status === 'new' || status === 'expired') {
      response.status(412).send('Sessão inválida');
      return;
    }

    try {
      await updateSession(request, response, session, authId);

      const { userId, phone, name } = session;
      response.status(200).send(JSON.stringify({ userId, phone, name }));
      //
    } catch (error) {
      console.log(error);
      response.status(424).send('Houve um erro ao obter o usuário.');
    }
  });
});
