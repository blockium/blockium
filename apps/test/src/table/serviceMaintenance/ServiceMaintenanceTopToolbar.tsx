/* eslint-disable react/jsx-pascal-case */
import { MRT_TableInstance } from 'material-react-table';
import { DefaultTopToolbar } from '@blockium/table';

import { ICustomerService } from '../../types';

interface ServiceMaintenanceTopToolbarProps {
  table: MRT_TableInstance<ICustomerService>;
  onAddClick?: () => void;
}

export const ServiceMaintenanceTopToolbar: React.FC<
  ServiceMaintenanceTopToolbarProps
> = ({ table, onAddClick }) => {
  return (
    <DefaultTopToolbar
      table={table}
      title={'Manutenção de Serviço'}
      onAddClick={onAddClick}
    />
  );
};
