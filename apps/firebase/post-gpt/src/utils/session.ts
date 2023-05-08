import admin from 'firebase-admin';

import { Session } from '@postgpt/types';

import { db } from './db';
import { getUser } from './user';

export const getSession = async (request, response) => {
  const { sessionId } = request.body;

  // Get a session data by sessionId
  const sessionRef = await db.sessions.doc(sessionId);
  const sessionDoc = await sessionRef.get();
  if (!sessionDoc.exists) {
    response.status(412).send('Sessão não encontrada');
    return null;
  }

  const session = sessionDoc.data();
  session.id = sessionDoc.id;

  return session;
};

export const updateSession = async (request, response, session: Session) => {
  // Get a session data by sessionId
  const sessionRef = await db.sessions.doc(session.id);
  const sessionDoc = await sessionRef.get();
  if (!sessionDoc.exists) {
    response.status(412).send('Sessão não encontrada');
    return null;
  }

  const user = await getUser(request, response);
  if (!user) return;

  if (session.status === 'new') {
    await sessionRef.update({
      status: 'waiting',
      startedAt: admin.firestore.FieldValue.serverTimestamp(),
      userId: user.id,
      phone: user.phone,
      name: user.name,
    });
  }

  return true;
};
