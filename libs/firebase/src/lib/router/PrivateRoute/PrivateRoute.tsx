import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import { getAuth, useAuth, useSignIn } from '../../firebase';

interface PrivateRouteProps {
  loginPath: string;
  waitingAuth: React.ReactElement;
  children: React.ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  loginPath,
  waitingAuth,
  children,
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
