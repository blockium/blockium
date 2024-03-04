import { useState } from 'react';
import { useEffectOnce } from 'react-use';

import { getUser } from '../actions/users';
import { useUser } from '@blockium/firebase';

export const useHasBusinessInfo = () => {
  const [user] = useUser();
  const [hasBusinessInfo, setHasBusinessInfo] = useState<boolean>();

  // Check if the business info is filled
  useEffectOnce(() => {
    if (user?.id) {
      getUser(user.id).then((user) => {
        if (user?.business) {
          const { name, description, services } = user.business;
          setHasBusinessInfo(
            name.trim() !== '' &&
              description.trim() !== '' &&
              services.trim() !== '',
          );
        } else {
          setHasBusinessInfo(false);
        }
      });
    } else {
      setHasBusinessInfo(false);
    }
  });

  return hasBusinessInfo;
};

export default useHasBusinessInfo;
