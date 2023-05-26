import { createGlobalState } from 'react-use';
// mui
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export const useCurrentDate = createGlobalState<Date>(new Date());

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
      format="MMM/yyyy"
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
