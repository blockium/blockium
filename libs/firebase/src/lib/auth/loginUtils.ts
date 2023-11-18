/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AuthError,
  GoogleAuthProvider,
  UserCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import { getAuth } from '../firebase';

export const signIn = async (
  provider: 'email' | 'google',
  email?: string,
  password?: string,
) => {
  const auth = getAuth();
  let result: UserCredential | null = null;

  if (provider === 'email' && email !== undefined && password !== undefined) {
    try {
      result = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throwAuthError(error);
    }
  } else if (provider === 'google') {
    try {
      const provider = new GoogleAuthProvider();
      result = await signInWithPopup(auth, provider);
    } catch (error) {
      throwAuthError(error);
    }
  }

  if (!result || !result.user) {
    throw new Error('Um erro ocorreu ao fazer signIn');
  }

  return result.user;
};

const throwAuthError = (error: any) => {
  const isAuthError = (error: any): error is AuthError => {
    return error instanceof FirebaseError && 'customData' in error;
  };
  if (isAuthError(error)) {
    // console.log(error.code);
    switch (error.code) {
      case 'auth/user-not-found':
        // throw new Error("Usuário não encontrado");
        throw new Error('Um erro ocorreu ao fazer signIn');
      case 'auth/wrong-password':
        // throw new Error("Senha incorreta");
        throw new Error('Um erro ocorreu ao fazer signIn');
      case 'auth/account-exists-with-different-credential':
        // throw new Error("Já existe uma conta com este email criada através de outro método de acesso");
        throw new Error('Um erro ocorreu ao fazer signIn');
      case 'auth/credential-already-in-use':
        throw new Error('Um erro ocorreu ao fazer signIn');
      case 'auth/email-already-in-use':
        // throw new Error("Já existe uma conta com este email");
        throw new Error('Um erro ocorreu ao fazer signIn');
      case 'auth/popup-blocked':
        throw new Error('O popup do Google foi bloqueado');
      case 'auth/popup-closed-by-user':
        throw new Error('O popup do Google foi fechado pelo usuário');
      case 'auth/operation-not-allowed':
        throw new Error('Operação não permitida');
      case 'auth/operation-not-supported-in-this-environment':
        throw new Error('Operação não suportada neste ambiente');
      case 'auth/popup-opens-in-an-overlay-window':
        throw new Error('O popup do Google foi aberto em uma janela');
      case 'auth/unauthorized-domain':
        throw new Error('Domínio não autorizado');
      default:
        throw new Error('Um erro ocorreu ao fazer signIn');
    }
  } else {
    throw new Error('Um erro ocorreu ao fazer signIn');
  }
};

export default signIn;
