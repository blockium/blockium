import axios from 'axios';
import { t } from 'i18next';

export const afterPhoneLogin = async (
  authId: string,
  afterPhoneLoginApi?: string,
) => {
  if (!afterPhoneLoginApi) {
    console.log(t('firebase:log.afterPhoneLogin.undefined'));
    return { status: 204, data: { userId: authId } };
  }

  return await axios({
    method: 'post',
    url: afterPhoneLoginApi,
    data: {
      authId,
    },
    validateStatus: (status: number) => {
      return status < 600;
    },
  });
};

export default afterPhoneLogin;
