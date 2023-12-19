import { useMemo, useState } from 'react';
import { localeContains } from '@blockium/utils';

import { ICost } from '../types';
import jsonData from './costs.json';

export const useCosts = () => {
  const rawData: ICost[] = jsonData;
  const [searchValue, setSearchValue] = useState('');

  const data = useMemo(() => {
    return rawData.filter((data) => {
      const { name, value } = data;
      return (
        (name && localeContains(name, searchValue)) ||
        (value && localeContains(value + '', searchValue))
      );
    });
  }, [rawData, searchValue]);

  return { data, setSearchValue };
};
