// mui
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useCurrentDate } from '../hooks';

interface MonthYearPickerProps {
  [key: string]: unknown;
}

export const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  ...rest
}) => {
  const [currentDate, setCurrentDate] = useCurrentDate();

  return (
    <DesktopDatePicker
      views={['year', 'month']}
      format="MMM/yy"
      openTo="month"
      value={currentDate}
      onChange={(date) => setCurrentDate(date ?? new Date())}
      slotProps={{
        textField: { size: 'small' },
        layout: {
          sx: {
            p: 1,
            pb: 3,
          },
        },
      }}
      {...rest}
    />
  );
};

export default MonthYearPicker;
