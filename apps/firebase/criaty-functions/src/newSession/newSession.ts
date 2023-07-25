import { https } from 'firebase-functions';
import cors from 'cors';

import { createSession } from '../utils/session';

export const newSession = https.onRequest(async (request, response) => {
  // TODO: Review CORS policy
  const corsObj = cors({ origin: true });
  corsObj(request, response, async () => {
    try {
      const session = await createSession();
      response.status(201).send(JSON.stringify({ sessionId: session.id }));
      //
    } catch (error) {
      console.log(error);
      response.status(424).send('Houve um erro ao criar uma nova sessão.');
    }
  });
});
