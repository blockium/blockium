import { DefaultTable } from '@blockium/table';
import { useBirthListTable } from './useBirthListTable';

type BirthListTableProps = {
  height?: number | string;
};

export const BirthListTable: React.FC<BirthListTableProps> = ({ height }) => {
  const tableConfig = useBirthListTable();
  return <DefaultTable {...tableConfig} height={height} />;
};
