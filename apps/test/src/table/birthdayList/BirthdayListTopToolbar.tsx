/* eslint-disable react/jsx-pascal-case */
import { MRT_TableInstance } from 'material-react-table';
import { DefaultTopToolbar } from '@blockium/table';

import { ICustomerService } from '../../types';

interface BirthdayListTopToolbarProps {
  table: MRT_TableInstance<ICustomerService>;
  onAddClick?: () => void;
}

export const BirthdayListTopToolbar: React.FC<BirthdayListTopToolbarProps> = ({
  table,
  onAddClick,
}) => {
  return (
    <DefaultTopToolbar
      table={table}
      title={'Aniversariantes'}
      onAddClick={onAddClick}
    />
  );
};
