import axios from 'axios';
import { t } from 'i18next';

export const afterLoginEmail = async (authId: string) => {
  if (!import.meta.env['VITE_AFTER_LOGIN_EMAIL_URL']) {
    console.log(t('firebase:log.afterLoginEmail.undefined')); // TODO
    return { status: 204, data: { userId: authId } };
  }

  return await axios({
    method: 'post',
    url: import.meta.env['VITE_AFTER_LOGIN_EMAIL_URL'],
    data: {
      authId,
    },
    validateStatus: (status: number) => {
      return status < 600;
    },
  });
};

export default afterLoginEmail;
