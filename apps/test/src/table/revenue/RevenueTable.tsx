import { DefaultTable } from '@blockium/table';
import { useRevenueTable } from './useRevenueTable';

type RevenueTableProps = {
  height?: number | string;
};

export const RevenueTable: React.FC<RevenueTableProps> = ({ height }) => {
  const tableConfig = useRevenueTable();
  return <DefaultTable {...tableConfig} height={height} />;
};
