import { DefaultTable } from '@blockium/table';
import { useBirthdayListTable } from './useBirthdayListTable';

type BirthdayListTableProps = {
  height?: number | string;
};

export const BirthdayListTable: React.FC<BirthdayListTableProps> = ({
  height,
}) => {
  const tableConfig = useBirthdayListTable();
  return <DefaultTable {...tableConfig} height={height} />;
};
