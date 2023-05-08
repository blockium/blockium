import { useState } from 'react';
import Stack from '@mui/material/Stack';

import { useIntlMessage } from '@postgpt/i18n';

import { GoogleIcon, WhatsAppIcon } from '../../icons';
import { PostGptLogo } from '../../logos';
import { CTAButton } from '../../buttons';
import { Alert } from '../../alert';
import { LoginHero } from '../../heros';

type LoginProps = {
  leftImageSrc: string;
  topImageSrc?: string;
};

export const Login: React.FC<LoginProps> = ({ leftImageSrc, topImageSrc }) => {
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const msg = useIntlMessage();

  const loginWithWhatsApp = async () => {
    setLoadingWhatsApp(true);

    // Obtain new session id
    // Save the session id in the session storage
    // Open WhatsApp with the session id

    // Simulates the process of obtaining a new session id
    setTimeout(() => {
      const phoneNumber = '5521970682489';
      const sessionId = '12345';
      const message = `LOGIN:${sessionId}`;

      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;

      window.open(url);

      setLoadingWhatsApp(false);
    }, 2000);
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
      <LoginHero leftImageSrc={leftImageSrc} topImageSrc={topImageSrc}>
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
            disabled={loadingGoogle}
          >
            {msg('app.button.loginWithWhatsApp')}
          </CTAButton>
          {false && (
            <CTAButton
              onClick={loginWithGoogle}
              startIcon={<GoogleIcon sx={{ marginRight: '1rem' }} />}
              fullWidth
              variant="outlined"
              color="secondary"
              loading={loadingGoogle}
              disabled={loadingWhatsApp}
            >
              {msg('app.button.loginWithGoogle')}
            </CTAButton>
          )}
        </Stack>
      </LoginHero>
    </>
  );
};

export default Login;
