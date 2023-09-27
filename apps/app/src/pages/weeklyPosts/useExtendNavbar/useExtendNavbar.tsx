import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import { DRAWER_WIDTH, useNavbarExtraLine } from '@blockium/ui-mininal-tmpl';
import { msg } from '@blockium/i18n';

export const useExtendNavbar = () => {
  const [, setNavbarExtraLine] = useNavbarExtraLine();

  useEffect(() => {
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
          msg('app.monday-short'),
          msg('app.tuesday-short'),
          msg('app.wednesday-short'),
          msg('app.thursday-short'),
          msg('app.friday-short'),
          msg('app.saturday-short'),
          msg('app.sunday-short'),
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
    setNavbarExtraLine(navbarExtraLine);

    return () => {
      setNavbarExtraLine(<div></div>);
    };
    //
  }, [setNavbarExtraLine]);
};

export default useExtendNavbar;
