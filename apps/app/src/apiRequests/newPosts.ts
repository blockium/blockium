import axios from 'axios';
import { Post } from '@postgpt/types';

export const newPosts = async (postQuantity: number) => {
  // TODO: obtain phone and name from session
  const phone = '5521988456100';
  const name = 'Marcos Luiz';

  // Sent a POST request to the new weekly posts endpoint
  try {
    const answer = await axios({
      method: 'post',
      url: import.meta.env.VITE_NEW_POSTS_URL,
      data: {
        phone,
        name,
        postQuantity,
      },
      validateStatus: (status: number) => {
        return status < 600;
      },
    });

    return answer.data as Post[];
    //
  } catch (error) {
    console.error(error);
    return 'Desculpe, houve um erro ao gerar as postagem da semana';
  }
};
