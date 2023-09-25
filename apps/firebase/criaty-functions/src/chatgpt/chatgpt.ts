import { runWith } from 'firebase-functions';
import { defineSecret } from 'firebase-functions/params';
import cors from 'cors';

import { User, UserPrompt } from '@optilib/types';

import { db } from '../utils/db';
import { chat } from './chat';
import { getOrCreateUser } from '../utils/user';
import { validatePrompt, validateUser } from '../utils/validate';

const openAiApiKey = defineSecret('OPENAI_API_KEY');

const validateParams = (request, response) => {
  return validatePrompt(request, response);
  // validatePhone(request, response) &&
  // validateName(request, response)
};

const getUserPrompts = async (userId: string, limit: number) => {
  // Retrieve the user's prompt history
  const userPromptsQuery = await db
    .userPrompts(userId)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  const userPrompts: UserPrompt[] = userPromptsQuery.docs.map(
    (userPromptDoc) => {
      return { ...userPromptDoc.data(), id: userPromptDoc.id };
    },
  );

  return userPrompts.reverse();
};

const saveUserPrompt = async (
  userId: string,
  prompt: string,
  answer: string,
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
    // TODO: Review CORS policy
    const corsObj = cors({ origin: true });
    corsObj(request, response, async () => {
      if (!validateParams(request, response)) return;

      let user: User;
      let prevPrompts = [];

      // Retrieve user id from Firestore. Saves new users if they don't exist
      const { phone, name } = request.body;
      if (phone) {
        const result = await getOrCreateUser(phone, name || phone);
        if (!validateUser(result, response)) return;

        user = result as User;

        // Retrieve the user's prompt history
        const limit = Number(
          request.body.historyLimit ?? process.env.PROMPT_HISTORY_LIMIT,
        );
        if (limit > 0) {
          prevPrompts = await getUserPrompts(user.id, limit);
        }
      }

      // Send the prompt to the OpenAI API
      const { prompt } = request.body;
      const apiKey = openAiApiKey.value();
      const answer = await chat(prompt, prevPrompts, apiKey);

      if (typeof answer === 'boolean' && answer === false) {
        response
          .status(424)
          .send(
            'Houve um erro ao processar a solicitação. Por favor, tente novamente.',
          );
      } else {
        // Save the user's prompt and answer to the history
        if (user) {
          await saveUserPrompt(user.id, prompt, answer);
        }
        response.status(200).send(answer);
      }
    });
  },
);
