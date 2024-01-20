import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { Link, Stack, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';

import { signInAnonymously } from 'firebase/auth';
import { getAuth } from '../../firebase';

import { CTAButton, LoginHero } from '@blockium/ui';
import { afterWhatsAppLogin } from '../apiRequests';

type LoginProps = {
  leftImage?: string;
  topImage?: string;
  zapLoginPhone?: string;
  afterWhatsAppLoginApi?: string;
  onAfterLogin?: () => Promise<void>;
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
  const { t } = useTranslation();

  const sessionId = sessionStorage.getItem('sessionId') || '';

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
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('displayName', displayName);

        await onAfterLogin?.();
        navigate('/');
        //
      } else {
        enqueueSnackbar(answer.data, { variant: 'error' });
      }
      //
    } catch (error) {
      console.error(error);
      enqueueSnackbar(t('firebase:error.afterWhatsAppLogin'), {
        variant: 'error',
      });
      //
    } finally {
      setLoadingWhatsApp(false);
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
      <Stack alignItems="center" width="300px" margin="2rem 0.5rem">
        <Typography variant="h6">
          1. {t('firebase:login.whatsapp.msg1')}
        </Typography>
        {/* <Link onClick={copyToClipboard}>LOGIN:{sessionId}</Link> <br /> */}
        <Link
          href={getWhatsAppLink()}
          target="_blank"
          sx={{ marginTop: '2rem' }}
        >
          LOGIN:{sessionId}
        </Link>
        <Typography variant="h6" sx={{ marginTop: '6rem' }}>
          2. {t('firebase:login.whatsapp.msg2')}
        </Typography>
        <CTAButton
          onClick={finishLogin}
          // variant="outlined"
          loading={loadingWhatsApp}
          sx={{ marginTop: '2rem' }}
        >
          {t('firebase:button.enter')}
        </CTAButton>
      </Stack>
    </LoginHero>
  );
};

export default LoginWhatsApp;
