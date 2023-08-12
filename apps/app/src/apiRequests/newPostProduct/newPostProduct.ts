import axios from 'axios';
import { Post, PostFormat, PostType } from '@postgpt/types';
import { msg } from '@postgpt/i18n';

export const newPostProduct = async (
  product: string,
  topic: string,
  type: PostType,
  slidesCount: number,
  format: PostFormat,
  character?: string,
) => {
  const data = {
    product,
    topic,
    type,
    slidesCount,
    format,
    character,
  };

  // Sent a POST request to new post endpoint
  try {
    const answer = await axios({
      method: 'post',
      url: import.meta.env.VITE_NEW_POST_PRODUCT_URL,
      data,
      validateStatus: (status: number) => {
        return status < 600;
      },
    });

    // console.log('answer.data', answer.data.replace(/[\n](?![\s}])/gm, '\\n'));

    const post: Post = {
      ...(typeof answer.data === 'string'
        ? JSON.parse(answer.data.replace(/[\n](?![\s}])/gm, '\\n'))
        : answer.data),
      status: 'initial',
    };
    return post;
    //
  } catch (error) {
    console.error(error);
    return msg('app.error.newPost');
  }
};
