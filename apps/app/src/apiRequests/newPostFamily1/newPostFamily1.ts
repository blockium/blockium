import axios from 'axios';
import { Post, PostFormat, PostGoal, PostType } from '@criaty/model-types';
import { msg } from '@blockium/i18n';

export const newPostFamily1 = async (
  goal: PostGoal,
  product: string,
  topic: string,
  type: PostType,
  slidesCount: number,
  format: PostFormat,
  tone?: string,
) => {
  const params = {
    goal,
    product,
    topic,
    type,
    slidesCount,
    format,
    tone,
  };

  // Sent a POST request to new post endpoint
  try {
    const answer = await axios({
      method: 'post',
      url: import.meta.env.VITE_NEW_POST_FAMILY1_URL,
      data: params,
      validateStatus: (status: number) => {
        return status < 600;
      },
    });

    let post: Post;
    if (typeof answer.data === 'string') {
      // Replace all line breaks that are not followed by a space or a closing curly brace
      let data = answer.data.replace(/(\n+)(?![\s}])/gm, '\\n');

      // Remove the last comma from JSON string
      data = data.replace(/(,)(\n?)(\s*)}/gm, '\n}');

      // TODO: !!! Remove double quotes inside 2 double quotes

      // console.log('data', answer.data, data);

      post = { ...JSON.parse(data), status: 'initial' };
    } else {
      post = { ...answer.data, status: 'initial' };
    }

    return post;
    //
  } catch (error) {
    console.error(error);
    return msg('app.error.newPost');
  }
};
