import { useState } from 'react';
import Stack from '@mui/material/Stack';

import { useIntlMessage } from '@postgpt/i18n';

import { GoogleIcon, WhatsAppIcon } from '../../icons';
import { PostGptLogo } from '../../logos';
import { CTAButton } from '../../buttons';
import { Alert } from '../../alert';
import { LoginHero } from '../../heros';

export function Login() {
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const msg = useIntlMessage();

  const loginWithWhatsApp = async () => {
    setLoadingWhatsApp(true);
    // TODO
  };

  const loginWithGoogle = async () => {
    setLoadingGoogle(true);
    // auth.setRedirectAfterLogin(true);

    // try {
    //   await auth.loginWithGoogle?.();
    // } catch (error: any) {
    //   setError(error.message);
    // } finally {
    //   setLoadingGoogle(false);
    // }
  };

  return (
    <>
      <Alert severity="error" message={error} setMessage={setError} />
      <LoginHero
        leftImageSrc="/images/login_768_1064.png"
        topImageSrc="/images/login_1064_768.png"
      >
        <Stack gap="2rem" alignItems="center">
          <PostGptLogo
            // full={false}
            width="50rem"
            sx={{ maxWidth: { xs: '30rem', lg: '40rem', xl: '50rem' } }}
          />
          <CTAButton
            onClick={loginWithWhatsApp}
            startIcon={<WhatsAppIcon sx={{ marginRight: '1rem' }} />}
            fullWidth
            loading={loadingWhatsApp}
          >
            {msg('app.button.loginWithWhatsApp')}
          </CTAButton>
          <CTAButton
            onClick={loginWithGoogle}
            startIcon={<GoogleIcon sx={{ marginRight: '1rem' }} />}
            fullWidth
            variant="outlined"
            color="secondary"
            loading={loadingGoogle}
          >
            {msg('app.button.loginWithGoogle')}
          </CTAButton>
        </Stack>
      </LoginHero>
    </>
  );
}

export default Login;
