/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { Box, Stack } from '@mui/material';
import { Phone as PhoneIcon } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';

import { User as FirebaseUser, getRedirectResult } from 'firebase/auth';
import { getAuth } from '../../firebase';

import { GoogleIcon, WhatsAppIcon, CTAButton, LoginHero } from '@blockium/ui';

import { afterEmailLogin, newWhatsAppSession } from '../apiRequests';
import { signIn } from '../loginUtils';
import { IUser } from '../User';
import useUser from '../useUser';

type LoginProps = {
  loginMethods: ('phone' | 'whatsapp' | 'email' | 'google')[];
  loginWithRedirect?: boolean;
  leftImage?: string;
  topImage?: string;
  zapNewSessionApi?: string;
  zapLoginPhone?: string;
  afterEmailLoginApi?: string;
  onAfterLogin?: (user: IUser, loginParams?: string) => Promise<boolean>;
};

// No priority:
// TODO: Merge the phone and email login accounts
// TODO: After a signIn with Google, if there is no user phone, shows the msg "Você ainda não tem um telefone associado. O mesmo é necessário para podermos recuperar seu acesso se você necessitar, e também associar sua conta aos seus dados de pagamento. Isso é necessário apenas uma vez. Clique no botão abaixo para cadastrar o telefone"
export const Login: React.FC<LoginProps> = ({
  loginMethods,
  loginWithRedirect = false,
  leftImage,
  topImage,
  zapNewSessionApi,
  zapLoginPhone,
  afterEmailLoginApi,
  onAfterLogin,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loginParams } = useParams();

  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [, setUser] = useUser();

  const loginWithWhatsApp = async () => {
    setLoadingWhatsApp(true);

    try {
      const answer = await newWhatsAppSession(zapNewSessionApi);

      if (answer.status === 201) {
        // Save the session id in the session storage
        const { sessionId } = answer.data;
        localStorage.setItem('sessionId', sessionId);

        // Open WhatsApp with the session id
        const phone = zapLoginPhone;
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
      enqueueSnackbar(t('firebase:error.newWhatsAppSession'), {
        variant: 'error',
      });
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
      const firebaseUser = await signIn('google', loginWithRedirect);
      await finishLoginWithEmail(firebaseUser);
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
      setLoadingGoogle(false);
    }
  };

  const finishLoginWithEmail = useCallback(
    async (firebaseUser: FirebaseUser) => {
      let answer;
      try {
        answer = await afterEmailLogin(firebaseUser.uid, afterEmailLoginApi);
      } catch (error: any) {
        console.log(error.message);
        enqueueSnackbar(t('firebase:error.auth.afterEmailLogin'), {
          variant: 'error',
        });
        return;
      }

      let user: IUser;
      if (answer.status === 200) {
        // Save the user data in the session storage
        // Uses the info returned by the API
        const { userId, name, displayName, phone, email } = answer.data;
        user = {
          authId: firebaseUser.uid,
          id: userId, // userId is probably different than authId
          name,
          displayName,
          email,
          phone,
        };
        //
      } else if (answer.status === 204) {
        // Uses the info from the authenticated user
        user = {
          authId: firebaseUser.uid,
          id: firebaseUser.uid, // userId is same as authId
          name: firebaseUser.displayName || t('firebase:label.no-name'),
          displayName: firebaseUser.displayName || t('firebase:label.no-name'),
          email: firebaseUser.email || t('firebase:label.no-email'),
          phone: firebaseUser.phoneNumber || t('firebase:label.no-phone'),
        };
        //
      } else {
        enqueueSnackbar(answer.data, { variant: 'error' });
        return;
      }

      // Saves the userId in order to reobtain it on PrivateRoute
      localStorage.setItem('userId', user.id);
      setUser(user);

      if (onAfterLogin) {
        (await onAfterLogin?.(user, loginParams)) && navigate('/');
      } else {
        navigate('/');
      }
    },
    [setUser, onAfterLogin, afterEmailLoginApi, loginParams, t, navigate],
  );

  // Check if the user was redirected from the login page
  useEffect(() => {
    const checkLoginWithRedirect = async () => {
      const auth = getAuth();
      const result = await getRedirectResult(auth);
      if (result?.user) {
        setLoadingGoogle(true);
        const firebaseUser = result.user;
        await finishLoginWithEmail(firebaseUser);
        setLoadingGoogle(false);
      }
    };
    loginWithRedirect && checkLoginWithRedirect();
  }, [finishLoginWithEmail, loginWithRedirect]);

  return (
    <LoginHero leftImage={leftImage} topImage={topImage}>
      <Stack alignItems="center" width="300px" margin="1.25rem 0.3rem">
        {loginMethods.map((loginMethod, index) => {
          return loginMethod === 'whatsapp' ? (
            // Box used instead of Stack gap due to support for old browsers
            <Box key={index} sx={{ pb: '1.25rem', width: '100%' }}>
              <CTAButton
                onClick={loginWithWhatsApp}
                startIcon={<WhatsAppIcon sx={{ marginRight: '0.3rem' }} />}
                fullWidth
                loading={loadingWhatsApp}
                disabled={loadingGoogle}
                sx={{ height: '3.5rem' }}
              >
                {t('firebase:button.loginWithWhatsApp')}
              </CTAButton>
            </Box>
          ) : loginMethod === 'phone' ? (
            <Box key={index} sx={{ pb: '1.25rem', width: '100%' }}>
              <CTAButton
                onClick={loginWithPhone}
                startIcon={<PhoneIcon sx={{ marginRight: '0.3rem' }} />}
                fullWidth
                variant="outlined"
                color="secondary"
                disabled={loadingWhatsApp || loadingGoogle}
                sx={{ height: '3.5rem' }}
              >
                {t('firebase:button.loginWithPhone')}
              </CTAButton>
            </Box>
          ) : loginMethod === 'google' ? (
            <Box key={index} sx={{ pb: '1.25rem', width: '100%' }}>
              <CTAButton
                onClick={loginWithGoogle}
                startIcon={<GoogleIcon sx={{ marginRight: '0.3rem' }} />}
                fullWidth
                variant="outlined"
                color="secondary"
                loading={loadingGoogle}
                disabled={loadingWhatsApp}
                sx={{ height: '3.5rem' }}
              >
                {t('firebase:button.loginWithGoogle')}
              </CTAButton>
            </Box>
          ) : (
            <Box key={index} sx={{ pb: '1.25rem', width: '100%' }}>
              <Box sx={{ height: '1.25rem' }}></Box>
            </Box>
          );
        })}
      </Stack>
    </LoginHero>
  );
};

export default Login;
