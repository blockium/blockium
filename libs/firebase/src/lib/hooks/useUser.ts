import { useState } from 'react';
import { useEffectOnce } from 'react-use';

import { User } from '@postgpt/types';
import { getUser } from '../users';

export const useUser = () => {
  const [user, setUser] = useState<User | null>();

  useEffectOnce(() => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      getUser(userId).then((user) => {
        setUser(user);
      });
    }
  });

  return user;
};

export default useUser;
