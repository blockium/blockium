import { useTranslation } from 'react-i18next';

import { useTheme } from '@mui/material';

import { ChartWidget, PieChart, RadialBarChart } from '@blockium/chart';

import { fDecimal, toNumber } from '@blockium/utils';

export const FinanceProgress: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const formatValue = (value: number) => {
    return toNumber(fDecimal(value, 1));
  };

  return (
    <ChartWidget title={t('label-progress')}>
      <RadialBarChart
        // height={500}
        // width={500}
        legend="none"
        chartLabels={[t('label-month'), t('label-week'), t('label-day')]}
        chartColors={[
          theme.palette.primary.main,
          theme.palette.chart.blue[0],
          theme.palette.chart.violet[0],
        ]}
        chartSeries={[
          formatValue(24.723),
          formatValue(59),
          formatValue(92.456),
        ]}
        customOptions={{
          plotOptions: {
            radialBar: {
              dataLabels: {
                total: {
                  show: true,
                  label: t('label-day'),
                  formatter: function (w) {
                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                    return fDecimal(92.456, 1) + '%';
                  },
                },
              },
            },
          },
        }}
      />
      <PieChart
        // type="donut"
        // height={500}
        // width={500}
        legend="right"
        chartLabels={[t('label-month'), t('label-week'), t('label-day')]}
        chartColors={[
          theme.palette.primary.main,
          theme.palette.chart.blue[0],
          theme.palette.chart.violet[0],
        ]}
        chartSeries={[
          formatValue(24.723),
          formatValue(59),
          formatValue(92.456),
        ]}
      />
    </ChartWidget>
  );
};
