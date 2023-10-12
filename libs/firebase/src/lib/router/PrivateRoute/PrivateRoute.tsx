import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { onAuthStateChanged } from 'firebase/auth';
// import { getAuth, useAuth, useSignIn } from '@blockium/firebase';
import { Firebase } from '../../firebase/firebase';

import { LoadingIndicator } from '@blockium/ui-common';

const { getAuth, useAuth, useSignIn } = Firebase;

interface PrivateRouteProps {
  loginPath: string;
  logo: React.ReactElement;
  children: React.ReactElement;
}

interface LoadingPageProps {
  logo: React.ReactElement;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ logo }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ width: '100% ', height: '100vh' }}
    >
      <LoadingIndicator>{logo}</LoadingIndicator>
    </Box>
  );
};

// const { auth, useSignIn } = await import('@blockium/firebase');
// const { getAuth, useAuth, useSignIn } = await import(
//   '@blockium/firebase'
// );

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  loginPath,
  logo,
  children,
}) => {
  console.log('PrivateRoute');
  const [loading, setLoading] = useState(true);
  const signIn = useSignIn();
  const [user] = useAuth();

  useEffect(() => {
    console.log('getAuth', getAuth());
    return onAuthStateChanged(getAuth(), (user) => {
      signIn(user);
      setLoading(false);
    });
  }, [signIn]);

  if (loading) {
    return <LoadingPage logo={logo} />;
  }

  if (user) {
    return children;
  } else {
    return <Navigate to={loginPath} />;
  }
};

export default PrivateRoute;
