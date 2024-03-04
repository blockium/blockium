/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Stack, Typography } from '@mui/material';
import { Phone as PhoneIcon } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';

import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from 'firebase/auth';
import { getAuth } from '../../firebase';

import { PhoneInput, CTAButton } from '@blockium/ui';

import { afterPhoneLogin } from '../apiRequests';
import { IUser } from '../User';
import useUser from '../useUser';

type PhoneFormProps = {
  afterPhoneLoginApi?: string;
  onAfterLogin?: (user: IUser) => Promise<void>;
};

export const PhoneForm: React.FC<PhoneFormProps> = ({
  afterPhoneLoginApi,
  onAfterLogin,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [, setUser] = useUser();

  const [requestDisplayName, setRequestDisplayName] = useState(false);
  const [displayName, setDisplayName] = useState('');

  const login = async () => {
    try {
      setErrorMessage('');
      setLoading(true);
      const auth = getAuth();
      const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier,
      );
      setConfirmationResult(result);
      //
    } catch (error: any) {
      console.log(error.message);
      setErrorMessage(t('firebase:error.auth.phone-sign-in'));
      //
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
        setErrorMessage(t('firebase:error.auth.failed'));
        //
      } else {
        if (credential.user.displayName) {
          // User already has a display name
          await finishLogin();
          //
        } else {
          // Request user display name
          setRequestDisplayName(true);
        }
      }
    } catch (error: any) {
      console.log(error.message);
      if (error.code === 'auth/code-expired') {
        setErrorMessage(t('firebase:error.auth.code-expired'));
      } else {
        setErrorMessage(t('firebase:error.auth.invalid-code'));
      }
      //
    } finally {
      setLoading(false);
    }
  };

  const onSetDisplayName = async () => {
    const auth = getAuth();
    if (!auth.currentUser) {
      setErrorMessage(t('firebase:error.not-authenticated'));
      return;
    }

    try {
      setErrorMessage('');
      setLoading(true);
      await updateProfile(auth.currentUser, {
        displayName,
      });
      await finishLogin();
      //
    } catch (error: any) {
      console.log(error.message);
      setErrorMessage(t('firebase:error.auth.phone-sign-in'));
    }
  };

  // No priority:
  // TODO: After login, if there is no user email, shows the t "Você ainda não tem um email associado. O mesmo é necessário para podermos recuperar seu acesso se você necessitar, e também associar sua conta aos seus dados de pagamento. Isso é necessário apenas uma vez. Clique no botão abaixo para cadastrar o email"
  // TODO: Create a form requesting the user email
  // TODO: Save the email in the users table
  const finishLogin = async () => {
    const auth = getAuth();
    if (!auth.currentUser) {
      setErrorMessage(t('firebase:error.not-authenticated'));
      return;
    }

    let answer;
    try {
      answer = await afterPhoneLogin(auth.currentUser.uid, afterPhoneLoginApi);
    } catch (error: any) {
      console.log(error.message);
      setErrorMessage(t('firebase:error.auth.afterPhoneLogin'));
      return;
    }

    if (answer.status === 200) {
      // Uses the info returned by the API
      const { userId, name, displayName, phone, email } = answer.data;
      const user: IUser = {
        authId: auth.currentUser.uid,
        id: userId,
        name,
        displayName,
        email,
        phone,
      };
      // Saves the userId in order to reobtain it on PrivateRoute
      localStorage.setItem('userId', userId);
      setUser(user);

      await onAfterLogin?.(user);
      navigate('/');
      //
    } else if (answer.status === 204) {
      // Uses the info from the authenticated user
      const user: IUser = {
        authId: auth.currentUser.uid,
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName || t('firebase:label.no-name'),
        displayName:
          auth.currentUser.displayName || t('firebase:label.no-name'),
        email: auth.currentUser.email || t('firebase:label.no-email'),
        phone: auth.currentUser.phoneNumber || t('firebase:label.no-phone'),
      };
      // Saves the userId in order to reobtain it on PrivateRoute
      localStorage.setItem('userId', auth.currentUser.uid);
      setUser(user);

      await onAfterLogin?.(user);
      navigate('/');
      //
    } else {
      setErrorMessage(answer.data);
    }
  };

  return (
    <Stack gap="1rem" width="100%">
      {/* Phone Number Input and Sign In Button */}
      <TextField
        type="tel"
        label={t('firebase:label.phone-number')}
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
          onClick={login}
          startIcon={<PhoneIcon sx={{ marginRight: '1rem' }} />}
          loading={loading}
          disabled={phoneNumber.length < 11}
        >
          {t('firebase:button.send-code')}
        </CTAButton>
      )}

      {/* Verification Code Input and Verify Button */}
      {confirmationResult && (
        <>
          <TextField
            type="number"
            label={t('firebase:label.verification-code')}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            disabled={requestDisplayName}
          />
          {!requestDisplayName && (
            <CTAButton onClick={verifyCode} loading={loading}>
              {t('firebase:button.verify-code')}
            </CTAButton>
          )}
        </>
      )}

      {/* User Name Input and Enter Button */}
      {confirmationResult && requestDisplayName && (
        <>
          <TextField
            type="text"
            label={t('firebase:label.user-name')}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <CTAButton
            onClick={onSetDisplayName}
            loading={loading}
            disabled={displayName.length < 3}
          >
            {t('firebase:button.enter')}
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
