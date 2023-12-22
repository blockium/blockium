import { useMemo, useState } from 'react';
import { localeContains } from '@blockium/utils';

import { IService } from '../../types';
import jsonData from './services.json';

export const useServices = () => {
  const rawData: IService[] = jsonData;
  const [searchValue, setSearchValue] = useState('');

  const data = useMemo(() => {
    return rawData.filter((data) => {
      const { name, price, dayInterval } = data;
      return (
        (name && localeContains(name, searchValue)) ||
        (price && localeContains(price + '', searchValue)) ||
        (dayInterval && localeContains(dayInterval + '', searchValue))
      );
    });
  }, [rawData, searchValue]);

  return { data, setSearchValue };
};
