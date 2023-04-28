import { User } from '@postgpt/types';

import { db } from './db';

export const getUser = async (request, response) => {
  const { phone } = request.body;
  const name = request.body.name || phone;

  let user: User = null;

  // Get a user data filtered by phone
  const userQuery = await db.users.where('phone', '==', phone).get();
  const users = userQuery.docs.map((userDoc) => {
    return { ...userDoc.data(), id: userDoc.id };
  });

  // new user:
  if (users.length === 0) {
    // Save user's data (phone, name) in Firestore at users collection
    user = {
      name,
      phone,
    };
    const userDoc = await db.users.add(user);
    user.id = userDoc.id;
    //
    // existing user:
  } else if (users.length === 1) {
    user = users[0];
    // If user's name is different from the one in the database,
    // it may indicate that phone number is being used by another person
    if (user.name !== name) {
      response
        .status(412)
        .send(
          'O número de telefone informado está cadastrado para outra pessoa. Favor entrar em contato com o suporte.'
        );
      user = null;
    }
    //
    // more than one user:
  } else if (users.length > 1) {
    response
      .status(412)
      .send(
        'Foi encontrado mais de um usuário com esse número. Favor entrar em contato com o suporte.'
      );
  }

  return user;
};
