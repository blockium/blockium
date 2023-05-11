import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@postgpt/firebase';

interface PrivateRouteProps {
  loginPath: string;
  children: React.ReactElement;
}

// TODO: Add a loading indicator
const LoadingIndicator = () => <div>Loading...</div>;

export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, () => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (auth.currentUser) {
    return props.children;
  } else {
    return <Navigate to={props.loginPath} />;
  }
};

export default PrivateRoute;
