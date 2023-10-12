import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import { Firebase } from '../../firebase/firebase';

interface PrivateRouteProps {
  loginPath: string;
  loadingElement: React.ReactElement;
  children: React.ReactElement;
}

const { getAuth, useAuth, useSignIn } = Firebase;

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  loginPath,
  loadingElement,
  children,
}) => {
  const [waitingAuth, setWaitingAuth] = useState(true);
  const signIn = useSignIn();
  const [user] = useAuth();

  useEffect(() => {
    return onAuthStateChanged(getAuth(), (user) => {
      signIn(user);
      setWaitingAuth(false);
    });
  }, [signIn]);

  if (waitingAuth) {
    return loadingElement;
  }

  if (user) {
    return children;
  } else {
    return <Navigate to={loginPath} />;
  }
};

export default PrivateRoute;
