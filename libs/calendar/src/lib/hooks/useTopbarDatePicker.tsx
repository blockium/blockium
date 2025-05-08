import { useEffect } from 'react';
import { Box, Button } from '@mui/material';

import { useTopbar } from '@blockium/layout';
import { useTranslation } from 'react-i18next';

import { MonthYearPicker } from '../MonthYearPicker';
import { useCurrentDate } from './useCurrentDate';

export const useTopbarDatePicker = () => {
  const [, setCurrentDate] = useCurrentDate();
  const [, setTopbar] = useTopbar();
  const { t } = useTranslation();

  useEffect(() => {
    const topbar = (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          marginRight: (theme) => theme.spacing(2),
        }}
      >
        <MonthYearPicker label={t('calendar:filter.date')} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentDate(new Date())}
        >
          {t('calendar:button.today')}
        </Button>
      </Box>
    );
    setTopbar(topbar);

    return () => {
      setTopbar(<div></div>);
    };
    //
  }, [setCurrentDate, setTopbar, t]);
};

export default useTopbarDatePicker;
