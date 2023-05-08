import admin from 'firebase-admin';
import { https } from 'firebase-functions';
import cors from 'cors';

import { Session } from '@postgpt/types';

import { db } from '../utils/db';

export const newSession = https.onRequest(async (request, response) => {
  // TODO: Review CORS policy
  const corsObj = cors({ origin: true });
  corsObj(request, response, async () => {
    try {
      const session: Session = {
        status: 'new',
        newAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      const sessionDoc = await db.sessions.add(session);
      const sessionId = sessionDoc.id;

      response.status(200).send(JSON.stringify({ sessionId }));
      //
    } catch (error) {
      console.log(error);
      response.status(424).send('Houve um erro ao criar uma nova sessão.');
    }
  });
});
