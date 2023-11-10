import axios from 'axios';
import { t } from 'i18next';

// Obtain user from VITE_GET_USER_URL using axios
export const getUser = async (sessionId: string, authId: string) => {
  if (!import.meta.env['VITE_GET_USER_URL']) {
    console.log(t('firebase:log.getUser.undefined'));
    return { status: 400, data: t('firebase:log.getUser.undefined') };
  }

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
