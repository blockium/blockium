/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Stack, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  // signOut,
} from 'firebase/auth';
import { auth } from '@postgpt/firebase';

import { useIntlMessage } from '@postgpt/i18n';

import { PhoneInput } from '../PhoneInput';
import { CTAButton } from '../../buttons';

export const PhoneForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const msg = useIntlMessage();

  const signIn = async () => {
    try {
      setLoading(true);
      const appVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
        },
        auth
      );
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setConfirmationResult(result);
    } catch (error: any) {
      console.log(error.message);
      setErrorMessage(msg('commonui.error.auth.phone-sign-in'));
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    try {
      setLoading(true);
      await confirmationResult?.confirm(verificationCode);

      // const { uid: authId, phoneNumber } = auth.currentUser;
      // TODO: Call /saveAuthId function to save authId on /users collection where phone === phoneNumber

      navigate('/');
    } catch (error: any) {
      console.log(error.message);
      if (error.code === 'auth/code-expired') {
        setErrorMessage(msg('commonui.error.auth.code-expired'));
      } else {
        setErrorMessage(msg('commonui.error.auth.invalid-code'));
      }
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const cleanup = () => {
  //     if (auth.currentUser) {
  //       signOut(auth);
  //     }
  //   };

  //   return () => {
  //     cleanup();
  //   };
  // }, []);

  return (
    <Stack gap="1rem" width="100%">
      {/* Phone Number Input and Sign In Button */}
      <TextField
        type="tel"
        label={msg('commonui.label.phone-number')}
        helperText={!confirmationResult ? '+55 (21) 99999-9999' : ''}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        InputProps={{
          inputComponent: PhoneInput as any,
        }}
        disabled={confirmationResult !== null}
      />
      {!confirmationResult && (
        <CTAButton
          onClick={signIn}
          startIcon={<PhoneIcon sx={{ marginRight: '1rem' }} />}
          loading={loading}
          disabled={phoneNumber.length < 17}
        >
          {msg('commonui.button.send-code')}
        </CTAButton>
      )}

      {/* Verification Code Input and Verify Button */}
      {confirmationResult && (
        <>
          <TextField
            type="number"
            label={msg('commonui.label.verification-code')}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <CTAButton onClick={verifyCode} loading={loading}>
            {msg('commonui.button.verify-code')}
          </CTAButton>
        </>
      )}

      {/* Error message */}
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}

      {/* Recaptcha container */}
      <div id="recaptcha-container" />
    </Stack>
  );
};
