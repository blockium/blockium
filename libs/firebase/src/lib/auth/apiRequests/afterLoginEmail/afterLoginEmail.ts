import axios from 'axios';
import { t } from 'i18next';

export const afterLoginEmail = async (
  authId: string,
  afterLoginApi?: string,
) => {
  if (!afterLoginApi) {
    console.log(t('firebase:log.afterLoginEmail.undefined'));
    return { status: 204, data: { userId: authId } };
  }

  return await axios({
    method: 'post',
    url: afterLoginApi,
    data: {
      authId,
    },
    validateStatus: (status: number) => {
      return status < 600;
    },
  });
};

export default afterLoginEmail;
