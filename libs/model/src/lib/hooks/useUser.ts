import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffectOnce } from 'react-use';

import { User } from '@criaty/model-types';
import { getUser } from '../actions/users';

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
