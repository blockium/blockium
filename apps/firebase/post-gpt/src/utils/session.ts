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

export const expireOldSessions = async (userId: string) => {
  // Expire old sessions
  const sessionsRef = await db.sessions
    .where('userId', '==', userId)
    .where('status', '==', 'started')
    .get();
  const batch = admin.firestore().batch();
  for (const sessionDoc of sessionsRef.docs) {
    // Delete old anonymours users
    const { authId } = await sessionDoc.data();
    if (authId) {
      const authUser = await admin.auth().getUser(authId);
      const isAnonymous =
        authUser &&
        (authUser.providerData.length === 0 ||
          (authUser.providerData.length === 1 &&
            authUser.providerData[0].providerId === 'anonymous'));

      if (isAnonymous) {
        await admin.auth().deleteUser(authId);
      }
    }

    batch.update(sessionDoc.ref, {
      status: 'expired',
      expiredAt: admin.firestore.FieldValue.serverTimestamp(),
      authId: null,
    });
  }
  await batch.commit();
};

export const updateSession = async (
  request,
  response,
  session: Session,
  authId?: string
) => {
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
      authId,
    });
  } else {
    // Does not do anything when session is 'started' or 'expired'
    updateStatus = session.status;
  }

  return updateStatus;
};
