import axios from 'axios';

// Obtain user from VITE_GET_USER_URL using axios
export const getUser = async (sessionId: string, authId: string) => {
  return await axios({
    method: 'post',
    url: import.meta.env['VITE_GET_USER_URL'],
    data: {
      sessionId,
      authId,
    },
    validateStatus: (status: number) => {
      return status < 600;
    },
  });
};

export default getUser;
