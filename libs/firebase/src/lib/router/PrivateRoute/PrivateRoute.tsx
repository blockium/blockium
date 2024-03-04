import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { onAuthStateChanged } from 'firebase/auth';
import { getAuth, useFirebaseUser } from '../../firebase';
import { IUser } from '../../auth/User';
import { useUser } from '../../auth';

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
  const { t } = useTranslation();
  const [isWaitingAuth, setIsWaitingAuth] = useState(true);
  const [firebaseUser, setFirebaseUser] = useFirebaseUser();
  const [, setUser] = useUser();

  useEffect(() => {
    return onAuthStateChanged(getAuth(), async (firebaseUser) => {
      console.log('firebaseUser', firebaseUser);

      setFirebaseUser(firebaseUser);

      if (firebaseUser) {
        const user: IUser = {
          authId: firebaseUser.uid,
          id: sessionStorage.getItem('userId') || '',
          name: firebaseUser.displayName || t('firebase:label.no-name'),
          displayName: firebaseUser.displayName || t('firebase:label.no-name'),
          email: firebaseUser.email || t('firebase:label.no-email'),
          phone: firebaseUser.phoneNumber || t('firebase:label.no-phone'),
        };
        setUser(user);
        await onAfterLogin?.(user);

        console.log('user', user);
      }

      setIsWaitingAuth(false);
    });
  }, [onAfterLogin, setFirebaseUser, setUser, t]);

  if (isWaitingAuth) {
    return waitingAuth;
  }

  if (firebaseUser) {
    return children;
  } else {
    return <Navigate to={loginPath} />;
  }
};

export default PrivateRoute;
