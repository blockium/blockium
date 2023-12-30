import { useTheme } from '@mui/material';

import { ChartWidget, PieChart, RadialBarChart } from '@blockium/chart';

import { fDecimal, toNumber } from '@blockium/utils';

export const ProgressChart: React.FC = () => {
  const theme = useTheme();

  const formatValue = (value: number) => {
    return toNumber(fDecimal(value, 1));
  };

  return (
    <ChartWidget title="Title">
      <RadialBarChart
        // height={500}
        // width={500}
        legend="none"
        chartData={[
          {
            label: 'mês',
            value: formatValue(24.723),
            color: theme.palette.primary.main,
          },
          {
            label: 'semana',
            value: formatValue(59),
            color: theme.palette.chart.blue[0],
          },
          {
            label: 'dia',
            value: formatValue(92.456),
            color: theme.palette.chart.violet[0],
          },
        ]}
        customOptions={{
          plotOptions: {
            radialBar: {
              dataLabels: {
                total: {
                  show: true,
                  label: 'Dia',
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
        chartData={[
          {
            label: 'mês',
            value: formatValue(24.723),
            color: theme.palette.primary.main,
          },
          {
            label: 'semana',
            value: formatValue(59),
            color: theme.palette.chart.blue[0],
          },
          {
            label: 'dia',
            value: formatValue(92.456),
            color: theme.palette.chart.violet[0],
          },
        ]}
      />
    </ChartWidget>
  );
};
