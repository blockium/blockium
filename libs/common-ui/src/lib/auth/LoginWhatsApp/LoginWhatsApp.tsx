import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, Typography } from '@mui/material';

import { signInAnonymously } from 'firebase/auth';
import { auth } from '@postgpt/firebase';

import { useIntlMessage } from '@postgpt/i18n';

import { CTAButton } from '../../buttons';
import { LoginHero } from '../../heros';
import { Alert } from '../../alert';
import { getUser } from '../apiRequests';

type LoginProps = {
  leftImageSrc: string;
  topImageSrc?: string;
};

export const LoginWhatsApp: React.FC<LoginProps> = ({
  leftImageSrc,
  topImageSrc,
}) => {
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const msg = useIntlMessage();

  const sessionId = sessionStorage.getItem('sessionId') || '';

  const loginWithWhatsApp = async () => {
    setLoadingWhatsApp(true);

    try {
      // Create an anonymous user on Firebase
      const credential = await signInAnonymously(auth);

      const answer = await getUser(sessionId, credential.user.uid);

      if (answer.status === 200) {
        // Save the user data in the session storage
        const { userId, phone, name } = answer.data;
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('name', name);
        setLoadingWhatsApp(false);

        navigate('/');
        //
      } else {
        setError(answer.data);
      }
      //
    } catch (error) {
      console.error(error);
      setError(msg('commonui.error.getUser'));
      //
    } finally {
      setLoadingWhatsApp(false);
    }
  };

  // const copyToClipboard = () => {
  //   navigator.clipboard.writeText(`LOGIN:${sessionId}`);
  // };

  const getWhatsAppLink = () => {
    const phone = import.meta.env.VITE_POSTGPT_PHONE;
    const message = `LOGIN:${sessionId}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      <Alert severity="error" message={error} setMessage={setError} />
      <LoginHero leftImageSrc={leftImageSrc} topImageSrc={topImageSrc}>
        <Stack alignItems="center" width="300px" margin="2rem 0.5rem">
          <Typography variant="h6">
            1. {msg('commonui.login.whatsapp.msg1')}
          </Typography>
          {/* <Link onClick={copyToClipboard}>LOGIN:{sessionId}</Link> <br /> */}
          <Link
            href={getWhatsAppLink()}
            target="_blank"
            sx={{ marginTop: '2rem' }}
          >
            LOGIN:{sessionId}
          </Link>{' '}
          <Typography variant="h6" sx={{ marginTop: '6rem' }}>
            2. {msg('commonui.login.whatsapp.msg2')}
          </Typography>
          <CTAButton
            onClick={loginWithWhatsApp}
            // variant="outlined"
            loading={loadingWhatsApp}
            sx={{ marginTop: '2rem' }}
          >
            {msg('commonui.button.enter')}
          </CTAButton>
        </Stack>
      </LoginHero>
    </>
  );
};

export default LoginWhatsApp;
