import axios from 'axios';
import { t } from 'i18next';

// Obtain user from VITE_AFTER_LOGIN_WHATSAPP_URL using axios
export const afterLoginWhatsApp = async (sessionId: string, authId: string) => {
  if (!import.meta.env['VITE_AFTER_LOGIN_WHATSAPP_URL']) {
    console.log(t('firebase:log.afterLoginWhatsApp.undefined'));
    return {
      status: 400,
      data: t('firebase:log.afterLoginWhatsApp.undefined'),
    };
  }

  return await axios({
    method: 'post',
    url: import.meta.env['VITE_AFTER_LOGIN_WHATSAPP_URL'],
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
