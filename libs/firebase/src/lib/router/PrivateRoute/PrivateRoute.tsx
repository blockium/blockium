import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import { getAuth, useAuth, useSignIn } from '../../firebase';
import { IUser } from '../../auth/Login';

interface PrivateRouteProps {
  loginPath: string;
  waitingAuth: React.ReactElement;
  onAfterLogin?: (user: IUser) => Promise<void>;
  children: React.ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  loginPath,
  waitingAuth,
  children,
  onAfterLogin,
}) => {
  const [isWaitingAuth, setIsWaitingAuth] = useState(true);
  const signIn = useSignIn();
  const [authUser] = useAuth();

  useEffect(() => {
    return onAuthStateChanged(getAuth(), (authUser) => {
      signIn(authUser);
      setIsWaitingAuth(false);
    });
  }, [signIn]);

  useEffect(() => {
    if (!authUser || !onAfterLogin) return;

    const user: IUser = {
      authId: authUser.uid,
      id: sessionStorage.getItem('userId') || '',
      name: sessionStorage.getItem('name') || '',
      displayName: sessionStorage.getItem('displayName') || '',
      email: sessionStorage.getItem('email') || undefined,
      phone: sessionStorage.getItem('phone') || undefined,
    };
    onAfterLogin(user);
    //
  }, [authUser, onAfterLogin]);

  if (isWaitingAuth) {
    return waitingAuth;
  }

  if (authUser) {
    return children;
  } else {
    return <Navigate to={loginPath} />;
  }
};

export default PrivateRoute;
