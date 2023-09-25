import { https } from 'firebase-functions';
import cors from 'cors';
import axios from 'axios';

import { PostGoal } from '@optilib/types';

import {
  getPostBehindTheScenesPrompt,
  getPostNoveltyPrompt,
  getPostTipsPrompt,
  getPostTutorialPrompt,
} from '../prompts';

const validateParams = (request, response) => {
  const { topic, type, slidesCount, format } = request.body;

  if (!topic || !type || !format || (type === 'carousel' && !slidesCount)) {
    response.status(400).send('Parâmetros ausentes.');
    return false;
  }

  return true;
};

export const newPostFamily2 = https.onRequest(async (request, response) => {
  // TODO: Review CORS policy
  const corsObj = cors({ origin: true });
  corsObj(request, response, async () => {
    if (!validateParams(request, response)) return;

    const { goal, topic, type, slidesCount, format, tone } = request.body;

    let getPostPrompt;
    switch (goal as PostGoal) {
      case 'Novelty':
        getPostPrompt = getPostNoveltyPrompt;
        break;
      case 'Tutorial':
        getPostPrompt = getPostTutorialPrompt;
        break;
      case 'Tips':
        getPostPrompt = getPostTipsPrompt;
        break;
      case 'Behind-the-Scenes':
        getPostPrompt = getPostBehindTheScenesPrompt;
        break;
      default:
        response.status(400).send('Parâmetros ausentes.');
        return;
    }

    const prompt = getPostPrompt(topic, type, slidesCount, format, tone);
    // console.log('prompt', prompt);

    try {
      // Sent a POST request to chatgpt endpoint
      const answer = await axios({
        method: 'post',
        url: process.env.POST_GPT_URL,
        data: {
          prompt,
        },
        validateStatus: (status: number) => {
          return status < 600;
        },
      });

      const post = answer.data;

      response.status(200).send(JSON.stringify(post));
      //
    } catch (error) {
      console.log(error);
      response
        .status(424)
        .send('Houve um erro ao gerar os posts. Por favor, tente novamente.');
    }
  });
});
