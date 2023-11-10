import axios from 'axios';
import { t } from 'i18next';

// Obtain new session id from VITE_NEW_SESSION_URL using axios
export const loginWithPhone = async (authId: string) => {
  if (!import.meta.env['VITE_LOGIN_WITH_PHONE_URL']) {
    console.log(t('firebase:log.loginWithPhone.undefined'));
    return { status: 204, data: { userId: authId } };
  }

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
