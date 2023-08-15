import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useEffectOnce } from 'react-use';

import { User } from '@postgpt/types';
import { getUser } from '../users';

export const useUser = () => {
  const [user, setUser] = useState<User | null>();
  const navigate = useNavigate();

  useEffectOnce(() => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      getUser(userId).then((user) => {
        setUser(user);
      });
    } else {
      // Redirect to login page if user is not logged in
      navigate('/login');
    }
  });

  return user;
};

export default useUser;
