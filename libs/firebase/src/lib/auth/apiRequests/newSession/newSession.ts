import axios from 'axios';

// Obtain new session id from VITE_NEW_SESSION_URL using axios
export const newSession = async () => {
  return await axios({
    method: 'get',
    url: import.meta.env['VITE_NEW_SESSION_URL'],
    data: {},
    validateStatus: (status: number) => {
      return status < 600;
    },
  });
};

export default newSession;
