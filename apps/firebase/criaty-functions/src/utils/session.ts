import admin from './admin';

import { Session, User } from '@criaty/model-types';

import { db } from './db';
import { getAuthUser, isAnonymousUser } from './user';

export const SESSION_ERROR_NOT_FOUND = 'SESSION_ERROR_NOT_FOUND';

// Create a new session
export const createSession = async () => {
  const session: Session = {
    status: 'new',
    newAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  const sessionDoc = await db.sessions.add(session);
  session.id = sessionDoc.id;
  return session;
};

// Get a session data by sessionId
export const getSession = async (sessionId: string) => {
  const sessionRef = await db.sessions.doc(sessionId);
  const sessionDoc = await sessionRef.get();
  if (!sessionDoc.exists) {
    return SESSION_ERROR_NOT_FOUND;
  }

  const session = sessionDoc.data() as Session;
  session.id = sessionDoc.id;

  return session;
};

// Expire old sessions for a given userId
export const expireOldSessions = async (userId: string) => {
  // Get all sessions that are 'started' and have the same userId
  const sessionsRef = await db.sessions
    .where('userId', '==', userId)
    .where('status', '==', 'started')
    .get();

  // Create a batch to update all sessions at once
  const batch = admin.firestore().batch();

  // For all sessions that are 'started' and have the same userId
  for (const sessionDoc of sessionsRef.docs) {
    // Delete old anonymous Firebase users' accounts related to old sessions
    const { authId } = await sessionDoc.data();
    if (authId) {
      const authUser = await getAuthUser(authId);
      if (authUser && isAnonymousUser(authUser)) {
        await admin.auth().deleteUser(authId);
      }
    }

    // Update all old sessions to 'expired'
    batch.update(sessionDoc.ref, {
      status: 'expired',
      expiredAt: admin.firestore.FieldValue.serverTimestamp(),
      authId: null,
    });
  }

  await batch.commit();
};

// Update session data and return its new status
// If session is 'new', it will be updated to 'waiting'
// If session is 'waiting', it will be updated to 'started'
// If session is 'started' or 'expired', it will not be updated
export const updateSession = async (
  user: User,
  session: Session,
  authId?: string,
) => {
  switch (session.status) {
    case 'new':
      await db.sessions.doc(session.id || '-').update({
        status: 'waiting',
        waitingAt: admin.firestore.FieldValue.serverTimestamp(),
        userId: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
      return 'waiting';
    //
    case 'waiting':
      await db.sessions.doc(session.id || '-').update({
        status: 'started',
        startedAt: admin.firestore.FieldValue.serverTimestamp(),
        authId,
      });
      return 'started';
    //
    default:
      // Does not do anything when session is 'started' or 'expired'
      return session.status;
  }
};
