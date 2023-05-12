import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Stack } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

import { useIntlMessage } from '@postgpt/i18n';

import { GoogleIcon, WhatsAppIcon } from '../../icons';
import { CTAButton } from '../../buttons';
import { Alert } from '../../alert';
import { LoginHero } from '../../heros';

type LoginProps = {
  leftImageSrc: string;
  topImageSrc?: string;
  loginWhatsApp: string;
  loginPhone: string;
};

export const Login: React.FC<LoginProps> = ({
  leftImageSrc,
  topImageSrc,
  loginWhatsApp,
  loginPhone,
}) => {
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const msg = useIntlMessage();

  // Obtain new session id from VITE_NEW_SESSION_URL using axios
  const newSession = async () => {
    const answer = await axios({
      method: 'get',
      url: import.meta.env.VITE_NEW_SESSION_URL,
      data: {},
      validateStatus: (status: number) => {
        return status < 600;
      },
    });

    return answer.data;
  };

  const loginWithWhatsApp = async () => {
    setLoadingWhatsApp(true);

    let response;
    try {
      response = await newSession();
    } catch (error) {
      console.error(error);
      setError('commonui.error.newSession');
    }
    if (!response || typeof response === 'string') {
      setLoadingWhatsApp(false);
      setError(msg('commonui.error.newSession'));
      return;
    }

    // Save the session id in the session storage
    const { sessionId } = response;
    sessionStorage.setItem('sessionId', sessionId);

    // Open WhatsApp with the session id
    const phone = import.meta.env.VITE_POSTGPT_PHONE;
    const message = `LOGIN:${sessionId}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url);

    setLoadingWhatsApp(false);

    navigate(loginWhatsApp);
  };

  const loginWithPhone = async () => {
    navigate(loginPhone);
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
        <Stack gap="2rem" alignItems="center" width="300px">
          {/* <PostGptLogo
            // full={false}
            width="50rem"
            sx={{ maxWidth: { xs: '30rem', lg: '40rem', xl: '50rem' } }}
          /> */}
          <CTAButton
            onClick={loginWithWhatsApp}
            startIcon={<WhatsAppIcon sx={{ marginRight: '1rem' }} />}
            fullWidth
            loading={loadingWhatsApp}
            disabled={loadingGoogle}
          >
            {msg('commonui.button.loginWithWhatsApp')}
          </CTAButton>
          <CTAButton
            onClick={loginWithPhone}
            startIcon={<PhoneIcon sx={{ marginRight: '1rem' }} />}
            fullWidth
            variant="outlined"
            color="secondary"
            disabled={loadingWhatsApp || loadingGoogle}
          >
            {msg('commonui.button.loginWithPhone')}
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
              {msg('commonui.button.loginWithGoogle')}
            </CTAButton>
          )}{' '}
        </Stack>
      </LoginHero>
    </>
  );
};

export default Login;
