import { https } from 'firebase-functions';
import cors from 'cors';
import axios from 'axios';

import { Post, PostFormat, PostType, User } from '@criaty/model';

import { validateName, validatePhone, validateUser } from '../utils/validate';
import { getOrCreateUser } from '../utils/user';
import { getWeeklyPostsPrompt } from '../utils/prompts';

const validateParams = (request, response) => {
  return validatePhone(request, response) && validateName(request, response);
};

function parseWeeklyPosts(answer: string): Post[][] {
  const days = answer
    .split(/\[(SEG|TER|QUA|QUI|SEX|SAB|SÁB|DOM)\]/)
    .filter((str) => !str.match(/(SEG|TER|QUA|QUI|SEX|SAB|SÁB|DOM|^$)/))
    .map((str) => str.trim());

  // console.log(days);

  const posts: Post[][] = [];

  for (let i = 0; i < days.length; i++) {
    const lines = days[i]
      .split(/(1:|2:|3:|4:|5:|6:)/)
      .filter((str) => !str.match(/(1:|2:|3:|4:|5:|6:|^$)/))
      .map((str) => str.trim());
    // console.log(lines);

    const post: Post = {
      date: new Date(),
      title: lines[0],
      description: lines[1],
      hashtags: lines[2],
      format: lines[3].toLowerCase() as PostFormat,
      type: lines[4].toLowerCase() as PostType,
      typeDescription: lines[5],
      status: 'initial',
      params: {
        goal: 'Product',
        type: 'image',
        slidesCount: 0,
        format: 'feed',
        extra: {
          product: '',
          topic: '',
        },
        tone: '',
      },
      createdAt: new Date(),
      deletedAt: null,
    };

    posts.push([post]);
  }

  return posts;
}

export const newWeeklyPosts = https.onRequest(async (request, response) => {
  // TODO: Review CORS policy
  const corsObj = cors({ origin: true });
  corsObj(request, response, async () => {
    if (!validateParams(request, response)) return;

    // Retrieve user id from Firestore. Saves new users if they don't exist
    const { phone, name } = request.body;
    const result = await getOrCreateUser(phone, name || phone);
    if (!validateUser(result, response)) return;

    const user = result as User;

    const prompt = await getWeeklyPostsPrompt(user);

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

      const posts = parseWeeklyPosts(answer.data);

      response.status(200).send(JSON.stringify(posts));
      //
    } catch (error) {
      console.log(error);
      response
        .status(424)
        .send(
          'Houve um erro ao gerar as postagem da semana. Por favor, tente novamente.',
        );
    }
  });
});
