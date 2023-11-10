import axios from 'axios';
import { t } from 'i18next';

// Obtain new session id from VITE_NEW_SESSION_URL using axios
export const newSession = async () => {
  if (!import.meta.env['VITE_NEW_SESSION_URL']) {
    console.log(t('firebase:log.newSession.undefined'));
    return { status: 400, data: t('firebase:log.newSession.undefined') };
  }

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
