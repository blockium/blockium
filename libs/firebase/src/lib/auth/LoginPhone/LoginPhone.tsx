import { Stack } from '@mui/material';

import { LoginHero } from '@blockium/ui';
import { PhoneForm } from '../PhoneForm';

type LoginProps = {
  leftImage?: string;
  topImage?: string;
  afterPhoneLoginApi?: string;
  onAfterLogin?: () => Promise<void>;
};

export const LoginPhone: React.FC<LoginProps> = ({
  leftImage,
  topImage,
  afterPhoneLoginApi,
  onAfterLogin,
}) => {
  return (
    <LoginHero leftImage={leftImage} topImage={topImage}>
      <Stack alignItems="center" width="300px" margin="2rem 0.5rem">
        <PhoneForm
          afterPhoneLoginApi={afterPhoneLoginApi}
          onAfterLogin={onAfterLogin}
        />
      </Stack>
    </LoginHero>
  );
};

export default LoginPhone;
