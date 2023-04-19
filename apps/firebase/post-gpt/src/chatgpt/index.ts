import { runWith } from 'firebase-functions';
import { defineSecret } from 'firebase-functions/params';
import { User, UserPrompt } from '@postgpt/types';

import { db } from '../utils/db';
import { chat } from './chat';

const openAiApiKey = defineSecret('OPENAI_API_KEY');

export const test = runWith({ secrets: [openAiApiKey] }).https.onRequest(
  async (request, response) => {
    const { prompt } = request.body;
    const result = {
      prompt,
    };
    response.status(200).send(result);
  }
);

const validateParams = (request, response) => {
  const { prompt, phone, name } = request.body;

  // Validate prompt
  if (prompt === undefined) {
    response.status(400).send('Por favor, diga o que você deseja');
    return false;
  }
  // Validate phone number format (Brazilian international format)
  if (!phone) {
    response.status(400).send('Por favor, informe seu telefone');
    return false;
  }

  // Check a Brazilian phone number
  if (!phone.match(/^\d{2}\d{2}\d{5}\d{4}$/)) {
    response.status(400).send('O telefone deve vir no formato +55XXYYYYYZZZZ');
    return false;
  }

  // Validate person name, accept only letters, letters with accents and spaces
  if (!name || !name.match(/^[A-Za-zÀ-ú ]+$/)) {
    response.status(400).send('Por favor, informe seu nome');
    return false;
  }

  return true;
};

const getUser = async (request, response) => {
  const { phone, name } = request.body;
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
        .status(500)
        .send(
          'O número de telefone informado está cadastrado para outra pessoa. Favor entrar em contato com o suporte.'
        );
      user = null;
    }
    //
    // more than one user:
  } else if (users.length > 1) {
    response
      .status(500)
      .send(
        'Foi encontrado mais de um usuário com esse número. Favor entrar em contato com o suporte.'
      );
  }

  return user;
};

const getUserPrompts = async (userId: string, limit: number) => {
  // Retrieve the user's prompt history
  const userPromptsQuery = await db
    .userPrompts(userId)
    .orderBy('createdAt', 'asc')
    .limit(limit)
    .get();

  const userPrompts: UserPrompt[] = userPromptsQuery.docs.map(
    (userPromptDoc) => {
      return { ...userPromptDoc.data(), id: userPromptDoc.id };
    }
  );

  return userPrompts;
};

const saveUserPrompt = async (
  userId: string,
  prompt: string,
  answer: string
) => {
  const userPrompt: UserPrompt = {
    userId,
    prompt,
    answer,
    createdAt: new Date(),
  };
  const userPromptDoc = await db.userPrompts(userId).add(userPrompt);
  userPrompt.id = userPromptDoc.id;
};

export const chatgpt = runWith({ secrets: [openAiApiKey] }).https.onRequest(
  async (request, response) => {
    if (!validateParams(request, response)) return;

    // Retrieve user id from Firestore. Saves new users if they don't exist
    const user = await getUser(request, response);
    if (!user) return;

    // Retrieve the user's prompt history
    const prevPrompts = await getUserPrompts(
      user.id,
      Number(process.env.PROMPT_HISTORY_LIMIT)
    );

    // Send the prompt to the OpenAI API
    const { prompt } = request.body;
    const apiKey = openAiApiKey.value();
    const answer = await chat(prompt, prevPrompts, apiKey);

    if (typeof answer === 'boolean' && answer === false) {
      response
        .status(500)
        .send(
          'Houve um erro ao processar a solicitação. Por favor, tente novamente.'
        );
    } else {
      // Save the user's prompt and answer to the history
      await saveUserPrompt(user.id, prompt, answer);
      response.status(200).send(answer);
    }
  }
);
