import { https } from 'firebase-functions';
import cors from 'cors';

import { validateAuthId, validateUser } from '../utils/validate';
import {
  USER_ERROR_DIFFERENT_USER_NAME,
  getAllUsers,
  getAuthUser,
  getUser,
} from '../utils/user';
import { db } from '../utils/db';

const validateParams = (request, response) => {
  return validateAuthId(request, response);
};

export const updateUserOnAuth = https.onRequest(async (request, response) => {
  // TODO: Review CORS policy
  const corsObj = cors({ origin: true });
  corsObj(request, response, async () => {
    if (!validateParams(request, response)) return;

    const { authId } = request.body;
    const authUser = await getAuthUser(authId);
    if (!authUser) {
      response.status(412).send('Usuário inexistente');
      return;
    }

    const { phoneNumber, displayName: name } = authUser;

    // Creates new user only if it has a phone number
    if (!phoneNumber) {
      response.status(412).send('Usuário sem número de telefone');
      return;
    }

    const phone = phoneNumber.replace(/\D/g, '');
    let user = await getUser(phone, name || phone);

    if (typeof user === 'string') {
      if (user !== USER_ERROR_DIFFERENT_USER_NAME) {
        // Respond with the corresponding error message
        validateUser(user, response);
        return;
      }
      // user === USER_ERROR_DIFFERENT_USER_NAME means only that the
      // app user's name is different from auth user
      const users = await getAllUsers(phone);
      user = users[0];
    }

    // Update app user's auth id in Firestore
    const userRef = await db.users.doc(user.id);
    await userRef.update({
      authId: authUser.uid,
    });

    response
      .status(200)
      .send(JSON.stringify({ userId: user.id, phone, name: user.name }));
  });
});
