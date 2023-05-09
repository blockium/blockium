import admin from 'firebase-admin';

import { Session, User } from '@postgpt/types';

import { db } from './db';
import { getUser } from './user';
import { validateUser } from './validate';

export const SESSION_ERROR_NOT_FOUND = 'SESSION_ERROR_NOT_FOUND';

export const getSession = async (sessionId: string) => {
  // Get a session data by sessionId
  const sessionRef = await db.sessions.doc(sessionId);
  const sessionDoc = await sessionRef.get();
  if (!sessionDoc.exists) {
    return SESSION_ERROR_NOT_FOUND;
  }

  const session = sessionDoc.data();
  session.id = sessionDoc.id;

  return session;
};

export const updateSession = async (request, response, session: Session) => {
  let updateStatus;
  if (session.status === 'new') {
    const { phone, name } = request.body;
    const result = await getUser(phone, name || phone);
    if (!validateUser(result, response)) return;

    const user = result as User;

    updateStatus = 'waiting';
    const sessionRef = await db.sessions.doc(session.id);
    await sessionRef.update({
      status: updateStatus,
      waitingAt: admin.firestore.FieldValue.serverTimestamp(),
      userId: user.id,
      phone: user.phone,
      name: user.name,
    });
  } else if (session.status === 'waiting') {
    updateStatus = 'started';
    const sessionRef = await db.sessions.doc(session.id);
    await sessionRef.update({
      status: updateStatus,
      startedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } else {
    // Does not do anything when session is 'started' or 'expired'
    updateStatus = session.status;
  }

  return updateStatus;
};
