import { https } from 'firebase-functions';
import cors from 'cors';
import axios from 'axios';

import { PostGoal } from '@blockium/types';

import {
  getPostEventPrompt,
  getPostOfferPrompt,
  getPostProductPrompt,
  getPostTestimonialPrompt,
} from '../prompts';

const validateParams = (request, response) => {
  const { product, topic, type, slidesCount, format } = request.body;

  if (
    !product ||
    !topic ||
    !type ||
    !format ||
    (type === 'carousel' && !slidesCount)
  ) {
    response.status(400).send('Parâmetros ausentes.');
    return false;
  }

  return true;
};

export const newPostFamily1 = https.onRequest(async (request, response) => {
  // TODO: Review CORS policy
  const corsObj = cors({ origin: true });
  corsObj(request, response, async () => {
    if (!validateParams(request, response)) return;

    const { goal, product, topic, type, slidesCount, format, tone } =
      request.body;

    let getPostPrompt;
    switch (goal as PostGoal) {
      case 'Product':
        getPostPrompt = getPostProductPrompt;
        break;
      case 'Offer':
        getPostPrompt = getPostOfferPrompt;
        break;
      case 'Event':
        getPostPrompt = getPostEventPrompt;
        break;
      case 'Testimonial':
        getPostPrompt = getPostTestimonialPrompt;
        break;
      default:
        response.status(400).send('Parâmetros ausentes.');
        return;
    }

    const prompt = getPostPrompt(
      product,
      topic,
      type,
      slidesCount,
      format,
      tone,
    );
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
