import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link, Stack, Typography } from '@mui/material';

import { useIntlMessage } from '@postgpt/i18n';

import { CTAButton } from '../../buttons';
import { LoginHero } from '../../heros';
import { Alert } from '../../alert';

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

  // Obtain user from VITE_GET_USER_URL using axios
  const getUser = async () => {
    const answer = await axios({
      method: 'post',
      url: import.meta.env.VITE_GET_USER_URL,
      data: {
        sessionId,
      },
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
      response = await getUser();
    } catch (error) {
      console.error(error);
      setError(msg('commonui.error.getUser'));
    }
    if (!response || typeof response === 'string') {
      setLoadingWhatsApp(false);
      setError(msg('commonui.error.getUser'));
      return;
    }

    // Save the user data in the session storage
    const { userId, phone, name } = response;
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('phone', phone);
    sessionStorage.setItem('name', name);
    setLoadingWhatsApp(false);

    navigate('/');
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
        <Stack gap="2rem" alignItems="center" width="300px">
          <Typography variant="body2" textAlign="center">
            <br />
            {msg('commonui.login.whatsapp.msg1')}
            <br />
            <br />
            {/* <Link onClick={copyToClipboard}>LOGIN:{sessionId}</Link> <br /> */}
            <Link href={getWhatsAppLink()} target="_blank">
              LOGIN:{sessionId}
            </Link>{' '}
            <br />
            <br />
            <br />
            <br />
            {msg('commonui.login.whatsapp.msg2')}
          </Typography>
          <CTAButton
            onClick={loginWithWhatsApp}
            variant="outlined"
            loading={loadingWhatsApp}
          >
            {msg('commonui.button.enter')}
          </CTAButton>
        </Stack>
      </LoginHero>
    </>
  );
};

export default LoginWhatsApp;
