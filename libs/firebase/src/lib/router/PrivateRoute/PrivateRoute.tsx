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
  const [user] = useAuth();

  useEffect(() => {
    return onAuthStateChanged(getAuth(), (user) => {
      signIn(user);
      setIsWaitingAuth(false);
    });
  }, [signIn]);

  if (isWaitingAuth) {
    return waitingAuth;
  }

  if (user) {
    return children;
  } else {
    return <Navigate to={loginPath} />;
  }
};

export default PrivateRoute;
