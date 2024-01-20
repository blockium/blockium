import axios from 'axios';
import { t } from 'i18next';

// Obtain new session id
export const newWhatsAppSession = async (zapNewSessionApi?: string) => {
  if (!zapNewSessionApi) {
    console.log(t('firebase:log.newWhatsAppSession.undefined'));
    return {
      status: 400,
      data: t('firebase:log.newWhatsAppSession.undefined'),
    };
  }

  return await axios({
    method: 'get',
    url: zapNewSessionApi,
    data: {},
    validateStatus: (status: number) => {
      return status < 600;
    },
  });
};

export default newWhatsAppSession;
