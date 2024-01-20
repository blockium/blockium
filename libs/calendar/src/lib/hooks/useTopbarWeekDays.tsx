import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import { DRAWER_WIDTH, useTopbarExtra } from '@blockium/layout';
import { useTranslation } from 'react-i18next';

import { useCurrentDate } from './useCurrentDate';

export const useTopbarWeekDays = () => {
  const [, setCurrentDate] = useCurrentDate();
  const [, setTopbarExtra] = useTopbarExtra();
  const { t } = useTranslation();

  useEffect(() => {
    const topbarExtra = (
      <Box
        sx={{
          paddingTop: (theme) => theme.spacing(2),
          paddingLeft: (theme) => theme.spacing(2),
          paddingRight: (theme) => theme.spacing(2),

          width: (theme) => {
            const { lg } = theme.breakpoints.values;
            return {
              xs: '100%',
              lg: `calc(${lg}-${DRAWER_WIDTH})`,
              xl: `calc(${lg}px - ${theme.spacing(6)})`,
            };
          },

          margin: '0 auto',
          display: 'grid',
          justifyItems: 'center',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 2,
        }}
      >
        {[
          t('calendar:monday-short'),
          t('calendar:tuesday-short'),
          t('calendar:wednesday-short'),
          t('calendar:thursday-short'),
          t('calendar:friday-short'),
          t('calendar:saturday-short'),
          t('calendar:sunday-short'),
        ].map((day, index) => (
          <Typography
            color={(theme) =>
              theme.palette.mode === 'light' ? 'primary.dark' : 'primary.light'
            }
            key={index}
            component="div"
            variant="subtitle1"
          >
            {day}
          </Typography>
        ))}
      </Box>
    );
    setTopbarExtra(topbarExtra);

    return () => {
      setTopbarExtra(<div></div>);
    };
    //
  }, [setCurrentDate, setTopbarExtra, t]);
};

export default useTopbarWeekDays;
