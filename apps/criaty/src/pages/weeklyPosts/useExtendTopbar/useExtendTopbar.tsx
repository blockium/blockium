import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

import { DRAWER_WIDTH, useTopbarExtra } from '@blockium/layout';

// Similar to useTopbarWeekDays in @blockium/calendar, to add the week days to the navbar. When user clicks on a day, scroll to that day in the page (using the browser scroll behavior to an #id in every DayPostView)
export const useExtendTopbar = () => {
  const { t } = useTranslation();
  const [, setTopbarExtra] = useTopbarExtra();

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
          t('monday-short'),
          t('tuesday-short'),
          t('wednesday-short'),
          t('thursday-short'),
          t('friday-short'),
          t('saturday-short'),
          t('sunday-short'),
        ].map((day, index) => (
          <Typography
            color={(theme) =>
              theme.palette.mode === 'light' ? 'primary.dark' : 'primary.light'
            }
            key={index}
            component="div"
            variant="subtitle1"
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              document.querySelector(`#day-${index + 1}`)?.scrollIntoView({
                behavior: 'instant',
                block: 'start',
                inline: 'nearest',
              });
            }}
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
  }, [setTopbarExtra, t]);
};

export default useExtendTopbar;
