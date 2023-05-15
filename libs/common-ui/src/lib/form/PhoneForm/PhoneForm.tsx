/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Stack, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
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
      setErrorMessage('');
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
      setErrorMessage('');
      setLoading(true);
      const credential = await confirmationResult?.confirm(verificationCode);
      if (!credential) {
        setErrorMessage(msg('commonui.error.auth.failed'));
        //
      } else {
        // const { uid: authId, phoneNumber } = auth.currentUser;
        // Save authId on /users collection where phone === phoneNumber
        const answer = await axios({
          method: 'post',
          url: import.meta.env.VITE_UPDATE_USER_ON_AUTH_URL,
          data: {
            authId: credential.user.uid,
          },
          validateStatus: (status: number) => {
            return status < 600;
          },
        });

        if (answer.status === 200) {
          const { userId, phone, name } = answer.data;
          sessionStorage.setItem('userId', userId);
          sessionStorage.setItem('phone', phone);
          sessionStorage.setItem('name', name);
          navigate('/');
          //
        } else {
          setErrorMessage(answer.data);
        }
      }
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
          disabled={phoneNumber.length < 11}
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
