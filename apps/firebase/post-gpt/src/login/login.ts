import { https } from 'firebase-functions';
import cors from 'cors';

import {
  validateName,
  validatePhone,
  validateSession,
} from '../utils/validate';
import { getSession, updateSession } from '../utils/session';

const validateParams = (request, response) => {
  return (
    validatePhone(request, response) &&
    validateName(request, response) &&
    validateSession(request, response)
  );
};

export const login = https.onRequest(async (request, response) => {
  // TODO: Review CORS policy
  const corsObj = cors({ origin: true });
  corsObj(request, response, async () => {
    if (!validateParams(request, response)) return;

    // Retrieve session from Firestore.
    const session = await getSession(request, response);
    if (!session) return;

    const { status } = session;
    if (status !== 'new') {
      response.status(412).send('Sessão inválida');
      return;
    }

    try {
      await updateSession(request, response, session);

      response
        .status(200)
        .send(JSON.stringify({ sessionId: session.id, status: 'waiting' }));
      //
    } catch (error) {
      console.log(error);
      response
        .status(424)
        .send('Houve um erro ao realizar o login. Por favor, tente novamente.');
    }
  });
});
