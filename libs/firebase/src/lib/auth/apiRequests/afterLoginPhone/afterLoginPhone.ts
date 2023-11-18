import axios from 'axios';
import { t } from 'i18next';

export const afterLoginPhone = async (authId: string) => {
  if (!import.meta.env['VITE_AFTER_LOGIN_PHONE_URL']) {
    console.log(t('firebase:log.afterLoginPhone.undefined'));
    return { status: 204, data: { userId: authId } };
  }

  return await axios({
    method: 'post',
    url: import.meta.env['VITE_AFTER_LOGIN_PHONE_URL'],
    data: {
      authId,
    },
    validateStatus: (status: number) => {
      return status < 600;
    },
  });
};

export default afterLoginPhone;
