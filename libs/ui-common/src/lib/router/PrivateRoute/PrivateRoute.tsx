import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, useSignIn } from '@blockium/firebase';

import { LoadingIndicator } from '../../progress';

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

export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const signIn = useSignIn();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      signIn(user);
      setLoading(false);
    });
  }, [signIn]);

  if (loading) {
    return <LoadingPage logo={props.logo} />;
  }

  if (auth.currentUser) {
    return props.children;
  } else {
    return <Navigate to={props.loginPath} />;
  }
};

export default PrivateRoute;
