import { createGlobalState } from 'react-use';
// mui
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export const useCurrentDate = createGlobalState<Date | null>(new Date());

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
      openTo="month"
      value={currentDate}
      onChange={(date) => setCurrentDate(date)}
      slotProps={{
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
