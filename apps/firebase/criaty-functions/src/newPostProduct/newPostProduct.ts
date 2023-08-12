import { https } from 'firebase-functions';
import cors from 'cors';
import axios from 'axios';

import { getPostProductPrompt } from '../prompts';

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

export const newPostProduct = https.onRequest(async (request, response) => {
  // TODO: Review CORS policy
  const corsObj = cors({ origin: true });
  corsObj(request, response, async () => {
    if (!validateParams(request, response)) return;

    const { product, topic, type, slidesCount, format, character } =
      request.body;

    const prompt = getPostProductPrompt(
      product,
      topic,
      type,
      slidesCount,
      format,
      character,
    );
    console.log('prompt', prompt);

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
