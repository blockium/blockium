import { useState } from 'react';
import { useEffectOnce } from 'react-use';

import { getUser } from '@postgpt/firebase';

export const useHasBusinessInfo = () => {
  const [hasBusinessInfo, setHasBusinessInfo] = useState<boolean>();

  // Check if the business info is filled
  useEffectOnce(() => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      getUser(userId).then((user) => {
        if (user?.business) {
          const { name, description, services } = user.business;
          setHasBusinessInfo(
            name.trim() !== '' &&
              description.trim() !== '' &&
              services.trim() !== '',
          );
        }
      });
    } else {
      setHasBusinessInfo(false);
    }
  });

  return hasBusinessInfo;
};

export default useHasBusinessInfo;
