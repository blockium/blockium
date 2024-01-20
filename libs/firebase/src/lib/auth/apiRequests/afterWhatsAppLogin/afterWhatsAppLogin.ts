import axios from 'axios';
import { t } from 'i18next';

export const afterWhatsAppLogin = async (
  sessionId: string,
  authId: string,
  afterWhatsAppLoginApi?: string,
) => {
  if (!afterWhatsAppLoginApi) {
    console.log(t('firebase:log.afterWhatsAppLogin.undefined'));
    return {
      status: 400,
      data: t('firebase:log.afterWhatsAppLogin.undefined'),
    };
  }

  return await axios({
    method: 'post',
    url: afterWhatsAppLoginApi,
    data: {
      sessionId,
      authId,
    },
    validateStatus: (status: number) => {
      return status < 600;
    },
  });
};

export default afterWhatsAppLogin;
