import { DefaultTable } from '@blockium/table';
import { useCostTable } from './useCostTable';

type CostTableProps = {
  height?: number | string;
};

export const CostTable: React.FC<CostTableProps> = ({ height }) => {
  const tableConfig = useCostTable();
  return <DefaultTable {...tableConfig} height={height} />;
};
