import axios from 'axios';
import { t } from 'i18next';

export const afterEmailLogin = async (
  authId: string,
  afterEmailLoginApi?: string,
) => {
  if (!afterEmailLoginApi) {
    console.log(t('firebase:log.afterEmailLogin.undefined'));
    return { status: 204, data: { userId: authId } };
  }

  return await axios({
    method: 'post',
    url: afterEmailLoginApi,
    data: {
      authId,
    },
    validateStatus: (status: number) => {
      return status < 600;
    },
  });
};

export default afterEmailLogin;
