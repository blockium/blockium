import { https } from 'firebase-functions';
import cors from 'cors';
import axios from 'axios';

import { User } from '@postgpt/types';

import { validateName, validatePhone, validateUser } from '../utils/validate';
import { getUser } from '../utils/user';
import { getPostsPrompt } from '../utils/prompts';

const validatePostQuantity = (request, response) => {
  const { postQuantity } = request.body;
  if (
    postQuantity === undefined ||
    !Number.isInteger(Number(postQuantity)) ||
    Number(postQuantity) < 1
  ) {
    response.status(400).send('postQuantity param must be a positive integer');
    return false;
  }
  return true;
};

const validateParams = (request, response) => {
  return (
    validatePhone(request, response) &&
    validateName(request, response) &&
    validatePostQuantity(request, response)
  );
};

export const newPosts = https.onRequest(async (request, response) => {
  // TODO: Review CORS policy
  const corsObj = cors({ origin: true });
  corsObj(request, response, async () => {
    if (!validateParams(request, response)) return;

    // Retrieve user id from Firestore. Saves new users if they don't exist
    const { phone, name } = request.body;
    const result = await getUser(phone, name || phone);
    if (!validateUser(result, response)) return;

    const user = result as User;

    const postQuantity = request.body.postQuantity ?? 1;

    const prompt = await getPostsPrompt(user.id, postQuantity);
    console.log(prompt);

    // Sent a POST request to chatgpt endpoint
    try {
      const answer = await axios({
        method: 'post',
        url: process.env.POST_GPT_URL,
        data: {
          prompt,
          phone,
          name,
          historyLimit: 0,
        },
        validateStatus: (status: number) => {
          return status < 600;
        },
      });

      const posts = answer.data;

      response.status(200).send(JSON.stringify(posts));
      //
    } catch (error) {
      console.log(error);
      response
        .status(424)
        .send('Houve um erro ao gerar os posts. Por favor, tente novamente.');
    }
  });
});
