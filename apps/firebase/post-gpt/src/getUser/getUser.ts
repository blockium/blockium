import { https } from 'firebase-functions';
import cors from 'cors';

import { validateSession } from '../utils/validate';
import { getSession, updateSession } from '../utils/session';

const validateParams = (request, response) => {
  return validateSession(request, response);
};

export const getUser = https.onRequest(async (request, response) => {
  // TODO: Review CORS policy
  const corsObj = cors({ origin: true });
  corsObj(request, response, async () => {
    if (!validateParams(request, response)) return;

    // Retrieve session from Firestore.
    const session = await getSession(request, response);
    if (!session) return;

    const { status } = session;
    if (status === 'new' || status === 'expired') {
      response.status(412).send('Sessão inválida');
      return;
    }

    try {
      await updateSession(request, response, session);

      const { userId, phone, name } = session;
      response.status(200).send(JSON.stringify({ userId, phone, name }));
      //
    } catch (error) {
      console.log(error);
      response.status(424).send('Houve um erro ao obter o usuário.');
    }
  });
});
