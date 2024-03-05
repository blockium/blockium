import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { onAuthStateChanged } from 'firebase/auth';
import { getAuth, useFirebaseUser, useSignOut } from '../../firebase';
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
  const signOut = useSignOut();

  useEffect(() => {
    return onAuthStateChanged(getAuth(), async (firebaseUser) => {
      // When user logs in, it should have saved user id on local storage
      // user id may be the user auth id, or some other id (e.g. on Firestore)
      if (firebaseUser && !localStorage.getItem('userId')) {
        await signOut();
        return;
      }

      setFirebaseUser(firebaseUser);

      if (firebaseUser) {
        // If user logs in, save it on global
        const user: IUser = {
          authId: firebaseUser.uid,
          id: localStorage.getItem('userId') || '',
          name: firebaseUser.displayName || t('firebase:label.no-name'),
          displayName: firebaseUser.displayName || t('firebase:label.no-name'),
          email: firebaseUser.email || t('firebase:label.no-email'),
          phone: firebaseUser.phoneNumber || t('firebase:label.no-phone'),
        };
        setUser(user);

        // Run onAfterLogin if any
        await onAfterLogin?.(user);
      }

      setIsWaitingAuth(false);
    });
    // As onAfterLogin is created every time it was removed from deps below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFirebaseUser, setUser, signOut, t]);

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
