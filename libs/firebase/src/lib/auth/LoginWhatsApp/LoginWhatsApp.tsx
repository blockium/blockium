import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { Link, Stack, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';

import { signInAnonymously } from 'firebase/auth';
import { getAuth } from '../../firebase';

import { CTAButton, LoginHero } from '@blockium/ui';
import { afterWhatsAppLogin } from '../apiRequests';
import { IUser } from '../User';
import useUser from '../useUser';

type LoginProps = {
  leftImage?: string;
  topImage?: string;
  zapLoginPhone?: string;
  afterWhatsAppLoginApi?: string;
  onAfterLogin?: (user: IUser, loginParams?: string) => Promise<boolean>;
};

// TODO: !!! After login, if there is no user email, shows the t "Você ainda não tem um email associado. O mesmo é necessário para podermos recuperar seu acesso se você necessitar, e também associar sua conta aos seus dados de pagamento. Isso é necessário apenas uma vez. Clique no botão abaixo para cadastrar o email"
// TODO: !!! Create a form requesting the user email
// TODO: !!! Save the email in the users table
export const LoginWhatsApp: React.FC<LoginProps> = ({
  leftImage,
  topImage,
  zapLoginPhone,
  afterWhatsAppLoginApi,
  onAfterLogin,
}) => {
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);
  const navigate = useNavigate();
  const { loginParams } = useParams();
  const { t } = useTranslation();
  const [, setUser] = useUser();

  const sessionId = localStorage.getItem('sessionId') || '';

  const finishLogin = async () => {
    setLoadingWhatsApp(true);

    try {
      // Create an anonymous user on Firebase
      const credential = await signInAnonymously(getAuth());

      const answer = await afterWhatsAppLogin(
        sessionId,
        credential.user.uid,
        afterWhatsAppLoginApi,
      );

      if (answer.status === 200) {
        // Save the user data in the session storage
        const { userId, phone, name, displayName } = answer.data;
        const user: IUser = {
          authId: credential.user.uid,
          id: userId,
          name,
          displayName,
          phone,
        };
        // Saves the userId in order to reobtain it on PrivateRoute
        localStorage.setItem('userId', userId);
        setUser(user);

        if (onAfterLogin) {
          (await onAfterLogin?.(user, loginParams)) && navigate('/');
        } else {
          navigate('/');
        }
        //
      } else {
        enqueueSnackbar(answer.data, { variant: 'error' });
        setLoadingWhatsApp(false);
      }
      //
    } catch (error) {
      console.error(error);
      enqueueSnackbar(t('firebase:error.afterWhatsAppLogin'), {
        variant: 'error',
      });
      setLoadingWhatsApp(false);
      //
    }
  };

  // const copyToClipboard = () => {
  //   navigator.clipboard.writeText(`LOGIN:${sessionId}`);
  // };

  const getWhatsAppLink = () => {
    const phone = zapLoginPhone;
    const message = `LOGIN:${sessionId}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <LoginHero leftImage={leftImage} topImage={topImage}>
      <Stack alignItems="center" width="300px" margin="1.25rem 0.3rem">
        <Typography variant="h6">
          1. {t('firebase:login.whatsapp.msg1')}
        </Typography>
        {/* <Link onClick={copyToClipboard}>LOGIN:{sessionId}</Link> <br /> */}
        <Link
          href={getWhatsAppLink()}
          target="_blank"
          sx={{ marginTop: '1.25rem' }}
        >
          LOGIN:{sessionId}
        </Link>
        <Typography variant="h6" sx={{ marginTop: '3.75rem' }}>
          2. {t('firebase:login.whatsapp.msg2')}
        </Typography>
        <CTAButton
          onClick={finishLogin}
          // variant="outlined"
          loading={loadingWhatsApp}
          sx={{ marginTop: '1.25rem' }}
        >
          {t('firebase:button.enter')}
        </CTAButton>
      </Stack>
    </LoginHero>
  );
};

export default LoginWhatsApp;
