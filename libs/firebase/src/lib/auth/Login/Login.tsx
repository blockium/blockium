import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

import { useTranslation } from 'react-i18next';

import {
  GoogleIcon,
  WhatsAppIcon,
  CTAButton,
  Alert,
  LoginHero,
} from '@blockium/ui-common';

import { newSession } from '../apiRequests';

type LoginProps = {
  leftImageSrc: string;
  topImageSrc?: string;
  loginWhatsApp: string;
  loginPhone: string;
};

// No priority:
// TODO: Create a LoginGoogle component
// TODO: Merge the phone and email login accounts
// TODO: After a login with Google, if there is no user phone, shows the msg "Você ainda não tem um telefone associado. O mesmo é necessário para podermos recuperar seu acesso se você necessitar, e também associar sua conta aos seus dados de pagamento. Isso é necessário apenas uma vez. Clique no botão abaixo para cadastrar o telefone"
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
  const { t } = useTranslation();

  const loginWithWhatsApp = async () => {
    setLoadingWhatsApp(true);

    try {
      const answer = await newSession();

      if (answer.status === 201) {
        // Save the session id in the session storage
        const { sessionId } = answer.data;
        sessionStorage.setItem('sessionId', sessionId);

        // Open WhatsApp with the session id
        const phone = import.meta.env['VITE_CRIATY_PHONE'];
        const message = `LOGIN:${sessionId}`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(
          message,
        )}`;
        window.open(url);

        navigate(loginWhatsApp);
        //
      } else {
        setError(answer.data);
      }
      //
    } catch (error) {
      console.error(error);
      setError(t('firebase:error.newSession'));
      //
    } finally {
      setLoadingWhatsApp(false);
    }
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
        <Stack alignItems="center" width="300px" margin="2rem 0.5rem">
          {/* <CriatyLogo
            // full={false}
            width="50rem"
            sx={{ maxWidth: { xs: '30rem', lg: '40rem', xl: '50rem' } }}
          /> */}
          <CTAButton
            onClick={loginWithWhatsApp}
            startIcon={<WhatsAppIcon sx={{ marginRight: '0.5rem' }} />}
            fullWidth
            loading={loadingWhatsApp}
            disabled={loadingGoogle}
          >
            {t('firebase:button.loginWithWhatsApp')}
          </CTAButton>
          {/* Box used instead of Stack gap due to support for old browsers */}
          <Box sx={{ height: '2rem' }}></Box>
          <CTAButton
            onClick={loginWithPhone}
            startIcon={<PhoneIcon sx={{ marginRight: '0.5rem' }} />}
            fullWidth
            variant="outlined"
            color="secondary"
            disabled={loadingWhatsApp || loadingGoogle}
          >
            {t('firebase:button.loginWithPhone')}
          </CTAButton>
          {false && (
            <>
              <Box sx={{ height: '2rem' }}></Box>
              <CTAButton
                onClick={loginWithGoogle}
                startIcon={<GoogleIcon sx={{ marginRight: '0.5rem' }} />}
                fullWidth
                variant="outlined"
                color="secondary"
                loading={loadingGoogle}
                disabled={loadingWhatsApp}
                sx={{ marginTop: '2rem' }}
              >
                {t('firebase:button.loginWithGoogle')}
              </CTAButton>
            </>
          )}{' '}
        </Stack>
      </LoginHero>
    </>
  );
};

export default Login;
