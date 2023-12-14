import { DefaultTable } from '@blockium/table';
import { useServiceMaintenanceTable } from './useServiceMaintenanceTable';

type ServiceMaintenanceTableProps = {
  height?: number | string;
};

export const ServiceMaintenanceTable: React.FC<
  ServiceMaintenanceTableProps
> = ({ height }) => {
  const tableConfig = useServiceMaintenanceTable();
  return <DefaultTable {...tableConfig} height={height} />;
};
