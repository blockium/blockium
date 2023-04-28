import axios from 'axios';

export const newWeeklyPosts = async () => {
  // TODO: obtain phone and name from session
  const phone = '5521988456100';
  const name = 'Marcos Luiz';

  // Sent a POST request to the new weekly posts endpoint
  try {
    const answer = await axios({
      method: 'post',
      url: import.meta.env.VITE_NEW_WEEKLY_POSTS_URL,
      data: {
        phone,
        name,
      },
      validateStatus: (status: number) => {
        return status < 600;
      },
    });

    return answer.data;
    //
  } catch (error) {
    console.error(error);
    return 'Desculpe, houve um erro ao gerar as postagem da semana';
  }
};
