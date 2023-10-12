import axios from 'axios';

// Obtain new session id from VITE_NEW_SESSION_URL using axios
export const loginWithPhone = async (authId: string) => {
  return await axios({
    method: 'post',
    url: import.meta.env['VITE_LOGIN_WITH_PHONE_URL'],
    data: {
      authId,
    },
    validateStatus: (status: number) => {
      return status < 600;
    },
  });
};

export default loginWithPhone;
