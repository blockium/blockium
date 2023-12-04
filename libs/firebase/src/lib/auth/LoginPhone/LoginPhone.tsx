import { Stack } from '@mui/material';

import { LoginHero } from '@blockium/ui';
import { PhoneForm } from '../PhoneForm';

type LoginProps = {
  leftImageSrc: string;
  topImageSrc?: string;
  afterLoginApi?: string;
};

export const LoginPhone: React.FC<LoginProps> = ({
  leftImageSrc,
  topImageSrc,
  afterLoginApi,
}) => {
  return (
    <LoginHero leftImageSrc={leftImageSrc} topImageSrc={topImageSrc}>
      <Stack alignItems="center" width="300px" margin="2rem 0.5rem">
        <PhoneForm afterLoginApi={afterLoginApi} />
      </Stack>
    </LoginHero>
  );
};

export default LoginPhone;
