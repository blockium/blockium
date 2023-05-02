import { runWith } from 'firebase-functions';
import { defineSecret } from 'firebase-functions/params';
import cors from 'cors';

import { UserPrompt } from '@postgpt/types';

import { db } from '../utils/db';
import { chat } from './chat';
import { getUser } from '../utils/user';
import { validateName, validatePhone, validatePrompt } from '../utils/validate';

const openAiApiKey = defineSecret('OPENAI_API_KEY');

const validateParams = (request, response) => {
  return (
    validatePrompt(request, response) &&
    validatePhone(request, response) &&
    validateName(request, response)
  );
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
    }
  );

  return userPrompts.reverse();
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
    // TODO: Review CORS policy
    const corsObj = cors({ origin: true });
    corsObj(request, response, async () => {
      if (!validateParams(request, response)) return;

      // Retrieve user id from Firestore. Saves new users if they don't exist
      const user = await getUser(request, response);
      if (!user) return;

      // Retrieve the user's prompt history
      const limit = Number(process.env.PROMPT_HISTORY_LIMIT);
      const prevPrompts = limit > 0 ? await getUserPrompts(user.id, limit) : [];

      // Send the prompt to the OpenAI API
      const { prompt } = request.body;
      const apiKey = openAiApiKey.value();
      const answer = await chat(prompt, prevPrompts, apiKey);

      if (typeof answer === 'boolean' && answer === false) {
        response
          .status(424)
          .send(
            'Houve um erro ao processar a solicitação. Por favor, tente novamente.'
          );
      } else {
        // Save the user's prompt and answer to the history
        await saveUserPrompt(user.id, prompt, answer);
        response.status(200).send(answer);
      }
    });
  }
);
