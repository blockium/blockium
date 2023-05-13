import { Stack } from '@mui/material';

import { LoginHero } from '../../heros';
import { PhoneForm } from '../../form';

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
      <Stack gap="2rem" alignItems="center" width="300px" margin="2rem 0.5rem">
        <PhoneForm />
      </Stack>
    </LoginHero>
  );
};

export default LoginPhone;
