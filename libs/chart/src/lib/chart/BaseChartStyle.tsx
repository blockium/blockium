// material
import { alpha, useTheme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';

const BaseChartStyle = () => {
  const theme = useTheme();

  const background = {
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.background.default, 0.72),
  };

  return (
    <GlobalStyles
      styles={{
        '&.apexcharts-canvas': {
          svg: { height: '100%' },
          'svg, foreignObject': {
            overflow: 'visible',
          },

          // Tooltip
          '.apexcharts-xaxistooltip': {
            ...background,
            border: 0,
            boxShadow: theme.customShadows.z24,
            color: theme.palette.text.primary,
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            '&:before': { borderBottomColor: 'transparent' },
            '&:after': {
              borderBottomColor: alpha(theme.palette.background.default, 0.72),
            },
          },
          '.apexcharts-tooltip.apexcharts-theme-light': {
            ...background,
            border: 0,
            boxShadow: theme.customShadows.z24,
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            '& .apexcharts-tooltip-title': {
              border: 0,
              textAlign: 'center',
              fontWeight: theme.typography.fontWeightBold,
              backgroundColor: theme.palette.grey[500_16],
              color:
                theme.palette.text[
                  theme.palette.mode === 'light' ? 'secondary' : 'primary'
                ],
            },
          },
          // Legend
          '.apexcharts-legend': {
            padding: 0,
          },
          '.apexcharts-legend-series': {
            display: 'flex !important',
            alignItems: 'center',
          },
          '.apexcharts-legend-marker': {
            marginRight: 8,
          },
          '.apexcharts-legend-text': {
            lineHeight: '18px',
            textTransform: 'capitalize',
          },
        },
      }}
    />
  );
};

export const baseChartStyle = <BaseChartStyle />;
