import axios from 'axios';
import { Post, PostFormat, PostType } from '@blockium/types';
import { msg } from '@blockium/i18n';

export const newPosts = async (
  postQuantity: number,
  topic?: string,
  tone?: string,
  format?: PostFormat,
  type?: PostType,
) => {
  // Obtain phone and name from session
  const phone = sessionStorage.getItem('phone');
  const name = sessionStorage.getItem('name');

  const data = {
    phone,
    name,
    postQuantity,
    topic,
    tone,
    format,
    type,
  };

  // Sent a POST request to the new weekly posts endpoint
  try {
    const answer = await axios({
      method: 'post',
      url: import.meta.env.VITE_NEW_POSTS_URL,
      data,
      validateStatus: (status: number) => {
        return status < 600;
      },
    });

    // console.log('answer', answer);

    // The answer.data is generally an array of posts,
    // but sometimes it's a JSON string with an erroneous format
    const posts = Array.isArray(answer.data)
      ? (answer.data as Post[])
      : (JSON.parse(
          // Remove the last comma from JSON string
          answer.data.replace(/(?:,)([^,]+)$/gm, '\n}\n]'),
        ) as Post[]);

    return posts.map((post) => {
      const newPost: Post = {
        ...post,
        status: 'initial',
      };
      return newPost;
    });

    //
  } catch (error) {
    console.error(error);
    return msg('app.error.newPosts');
  }
};
