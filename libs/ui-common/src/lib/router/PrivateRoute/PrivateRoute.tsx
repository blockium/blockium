import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, useSignIn } from '@postgpt/firebase';

import { LoadingIndicator } from '../../progress';
import { PostGptLogo } from '../../logo';

interface PrivateRouteProps {
  loginPath: string;
  children: React.ReactElement;
}

const LoadingPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ width: '100% ', height: '100vh' }}
    >
      <LoadingIndicator>
        <PostGptLogo
          full={false}
          colorScheme="transparent-gray-gray-transparent"
          sx={{ marginTop: '0.75rem' }}
        />
      </LoadingIndicator>
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
    return <LoadingPage />;
  }

  if (auth.currentUser) {
    return props.children;
  } else {
    return <Navigate to={props.loginPath} />;
  }
};

export default PrivateRoute;
