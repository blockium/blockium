/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { Box, Stack } from '@mui/material';
import { Phone as PhoneIcon } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';

import { User as AuthUser } from 'firebase/auth';

import { GoogleIcon, WhatsAppIcon, CTAButton, LoginHero } from '@blockium/ui';

import { afterLoginEmail, newSession } from '../apiRequests';
import { signIn } from '../loginUtils';

type LoginProps = {
  loginMethods: ('phone' | 'whatsapp' | 'email' | 'google')[];
  leftImageSrc: string;
  topImageSrc?: string;
  newWhatsAppSessionApi?: string;
  loginWhatsAppPhone?: string;
  afterEmailLoginApi?: string;
};

// No priority:
// TODO: Merge the phone and email login accounts
// TODO: After a signIn with Google, if there is no user phone, shows the msg "Você ainda não tem um telefone associado. O mesmo é necessário para podermos recuperar seu acesso se você necessitar, e também associar sua conta aos seus dados de pagamento. Isso é necessário apenas uma vez. Clique no botão abaixo para cadastrar o telefone"
export const Login: React.FC<LoginProps> = ({
  loginMethods,
  leftImageSrc,
  topImageSrc,
  newWhatsAppSessionApi,
  loginWhatsAppPhone,
  afterEmailLoginApi,
}) => {
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loginWithWhatsApp = async () => {
    setLoadingWhatsApp(true);

    try {
      const answer = await newSession(newWhatsAppSessionApi);

      if (answer.status === 201) {
        // Save the session id in the session storage
        const { sessionId } = answer.data;
        sessionStorage.setItem('sessionId', sessionId);

        // Open WhatsApp with the session id
        const phone = loginWhatsAppPhone;
        const message = `LOGIN:${sessionId}`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(
          message,
        )}`;
        window.open(url);

        navigate('/login-whatsapp');
        //
      } else {
        enqueueSnackbar(answer.data, { variant: 'error' });
      }
      //
    } catch (error) {
      console.error(error);
      enqueueSnackbar(t('firebase:error.newSession'), { variant: 'error' });
      //
    } finally {
      setLoadingWhatsApp(false);
    }
  };

  const loginWithPhone = async () => {
    navigate('/login-phone');
  };

  const loginWithGoogle = async () => {
    setLoadingGoogle(true);

    try {
      const authUser = await signIn('google');
      await finishLoginWithEmail(authUser);
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoadingGoogle(false);
    }
  };

  const finishLoginWithEmail = async (authUser: AuthUser) => {
    let answer;
    try {
      answer = await afterLoginEmail(authUser.uid, afterEmailLoginApi);
    } catch (error: any) {
      console.log(error.message);
      enqueueSnackbar(t('firebase:error.auth.afterLoginEmail'), {
        variant: 'error',
      });
      return;
    }

    if (answer.status === 200) {
      // Save the user data in the session storage
      // Uses the info returned by the API
      const { userId, name, displayName, phone, email } = answer.data;
      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('phone', phone);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('name', name);
      sessionStorage.setItem('displayName', displayName);

      navigate('/');
      //
    } else if (answer.status === 204) {
      // Save the user data in the session storage
      // Uses the info from the authenticated user
      const {
        uid: userId,
        phoneNumber: phone,
        email,
        displayName: name,
        displayName,
      } = authUser;
      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('phone', phone || t('firebase:label.no-phone'));
      sessionStorage.setItem('email', email || t('firebase:label.no-email'));
      sessionStorage.setItem('name', name || t('firebase:label.no-name'));
      sessionStorage.setItem(
        'displayName',
        displayName || t('firebase:label.no-name'),
      );

      navigate('/');
      //
    } else {
      enqueueSnackbar(answer.data, { variant: 'error' });
    }
  };

  return (
    <LoginHero leftImageSrc={leftImageSrc} topImageSrc={topImageSrc}>
      <Stack alignItems="center" width="300px" margin="2rem 0.5rem">
        {loginMethods.map((loginMethod, index) => {
          return loginMethod === 'whatsapp' ? (
            // Box used instead of Stack gap due to support for old browsers
            <Box key={index} sx={{ pb: '2rem', width: '100%' }}>
              <CTAButton
                onClick={loginWithWhatsApp}
                startIcon={<WhatsAppIcon sx={{ marginRight: '0.5rem' }} />}
                fullWidth
                loading={loadingWhatsApp}
                disabled={loadingGoogle}
                sx={{ height: '5.5rem' }}
              >
                {t('firebase:button.loginWithWhatsApp')}
              </CTAButton>
            </Box>
          ) : loginMethod === 'phone' ? (
            <Box key={index} sx={{ pb: '2rem', width: '100%' }}>
              <CTAButton
                onClick={loginWithPhone}
                startIcon={<PhoneIcon sx={{ marginRight: '0.5rem' }} />}
                fullWidth
                variant="outlined"
                color="secondary"
                disabled={loadingWhatsApp || loadingGoogle}
                sx={{ height: '5.5rem' }}
              >
                {t('firebase:button.loginWithPhone')}
              </CTAButton>
            </Box>
          ) : loginMethod === 'google' ? (
            <Box key={index} sx={{ pb: '2rem', width: '100%' }}>
              <CTAButton
                onClick={loginWithGoogle}
                startIcon={<GoogleIcon sx={{ marginRight: '0.5rem' }} />}
                fullWidth
                variant="outlined"
                color="secondary"
                loading={loadingGoogle}
                disabled={loadingWhatsApp}
                sx={{ height: '5.5rem' }}
              >
                {t('firebase:button.loginWithGoogle')}
              </CTAButton>
            </Box>
          ) : (
            <Box key={index} sx={{ pb: '2rem', width: '100%' }}>
              <Box sx={{ height: '2rem' }}></Box>
            </Box>
          );
        })}
      </Stack>
    </LoginHero>
  );
};

export default Login;
