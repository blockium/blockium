import axios from 'axios';
import { t } from 'i18next';

// Obtain new session id
export const newSession = async (newSessionApi?: string) => {
  if (!newSessionApi) {
    console.log(t('firebase:log.newSession.undefined'));
    return { status: 400, data: t('firebase:log.newSession.undefined') };
  }

  return await axios({
    method: 'get',
    url: newSessionApi,
    data: {},
    validateStatus: (status: number) => {
      return status < 600;
    },
  });
};

export default newSession;
