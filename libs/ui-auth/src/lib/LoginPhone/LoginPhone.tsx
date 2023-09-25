import { Stack } from '@mui/material';

import { LoginHero } from '@optilib/ui-common';
import { PhoneForm } from '../PhoneForm';

type LoginProps = {
  leftImageSrc: string;
  topImageSrc?: string;
};

export const LoginPhone: React.FC<LoginProps> = ({
  leftImageSrc,
  topImageSrc,
}) => {
  return (
    <LoginHero leftImageSrc={leftImageSrc} topImageSrc={topImageSrc}>
      <Stack alignItems="center" width="300px" margin="2rem 0.5rem">
        <PhoneForm />
      </Stack>
    </LoginHero>
  );
};

export default LoginPhone;
