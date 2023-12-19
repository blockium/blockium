import { useMemo, useState } from 'react';
import { localeContains } from '@blockium/utils';

import { ICustomerService } from '../types';
import jsonData from './customerServices.json';

export const useCustomerServices = () => {
  const [searchValue, setSearchValue] = useState('');

  const rawData: ICustomerService[] = jsonData;
  const data = useMemo(() => {
    return rawData.filter((data) => {
      const { payTypeName, serviceName, customerName } = data;
      return (
        (payTypeName && localeContains(payTypeName, searchValue)) ||
        (serviceName && localeContains(serviceName, searchValue)) ||
        (customerName && localeContains(customerName, searchValue))
      );
    });
  }, [rawData, searchValue]);

  return { data, setSearchValue };
};
