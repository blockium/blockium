/* eslint-disable react/jsx-pascal-case */
import { MRT_TableInstance } from 'material-react-table';
import { DefaultTopToolbar } from '@blockium/table';

import { ICustomerService } from '../../types';

interface RevenueTopToolbarProps {
  table: MRT_TableInstance<ICustomerService>;
  onAddClick: () => void;
}

export const RevenueTopToolbar: React.FC<RevenueTopToolbarProps> = ({
  table,
  onAddClick,
}) => {
  return (
    <DefaultTopToolbar
      table={table}
      title={'Receita no Mês'}
      onAddClick={onAddClick}
    />
  );
};
