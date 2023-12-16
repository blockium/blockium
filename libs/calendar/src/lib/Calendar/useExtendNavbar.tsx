import { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';

import {
  DRAWER_WIDTH,
  useNavbarExtraLine,
  useToolbarExtra,
} from '@blockium/layout';
import { useTranslation } from 'react-i18next';

import { MonthYearPicker } from '../MonthYearPicker';
import { useCurrentDate } from '../hooks/useCurrentDate';

export const useExtendNavbar = () => {
  const [, setCurrentDate] = useCurrentDate();
  const [, setToolbarExtra] = useToolbarExtra();
  const [, setNavbarExtraLine] = useNavbarExtraLine();
  const { t } = useTranslation();

  useEffect(() => {
    const toolbarExtra = (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
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
    setToolbarExtra(toolbarExtra);

    const navbarExtraLine = (
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
    setNavbarExtraLine(navbarExtraLine);

    return () => {
      setToolbarExtra(<div></div>);
      setNavbarExtraLine(<div></div>);
    };
    //
  }, [setCurrentDate, setNavbarExtraLine, setToolbarExtra, t]);
};

export default useExtendNavbar;
