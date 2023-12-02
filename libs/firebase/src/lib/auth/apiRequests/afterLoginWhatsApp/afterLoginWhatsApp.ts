import axios from 'axios';
import { t } from 'i18next';

export const afterLoginWhatsApp = async (
  sessionId: string,
  authId: string,
  afterLoginApi?: string,
) => {
  if (!afterLoginApi) {
    console.log(t('firebase:log.afterLoginWhatsApp.undefined'));
    return {
      status: 400,
      data: t('firebase:log.afterLoginWhatsApp.undefined'),
    };
  }

  return await axios({
    method: 'post',
    url: afterLoginApi,
    data: {
      sessionId,
      authId,
    },
    validateStatus: (status: number) => {
      return status < 600;
    },
  });
};

export default afterLoginWhatsApp;
