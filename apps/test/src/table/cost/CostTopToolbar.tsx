/* eslint-disable react/jsx-pascal-case */
import { MRT_TableInstance } from 'material-react-table';
import { DefaultTopToolbar } from '@blockium/table';

import { ICost } from '../../types';

interface CostTopToolbarProps {
  table: MRT_TableInstance<ICost>;
  onAddClick: () => void;
}

export const CostTopToolbar: React.FC<CostTopToolbarProps> = ({
  table,
  onAddClick,
}) => {
  return (
    <DefaultTopToolbar
      table={table}
      title={'Despesas do Mês'}
      onAddClick={onAddClick}
    />
  );
};
