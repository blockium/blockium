import { useTheme } from '@mui/material';

import { ChartWidget, EvolutionChart } from '@blockium/chart';

export const FinanceEvolution: React.FC = () => {
  const theme = useTheme();

  return (
    <ChartWidget title="Evolução" subheader="(+3%) mês a mês">
      <EvolutionChart
        showCurrency
        // height={500}
        width="100%"
        legend="top"
        chartColors={[theme.palette.chart.green[0], theme.palette.chart.red[0]]}
        chartLabels={[
          // "01/01/2022",
          // "02/01/2022",
          // "03/01/2022",
          // "04/01/2022",
          // "05/01/2022",
          '06/01/2022',
          '07/01/2022',
          '08/01/2022',
          '09/01/2022',
          '10/01/2022',
          '11/01/2022',
        ]}
        chartSeries={[
          {
            name: 'Receita',
            type: 'area',
            // data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
            data: [350.567, 500, 550, 590, 650, 800],
          },
          {
            name: 'Despesas',
            type: 'line', //'column',
            // data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
            data: [430, 450, 440, 560, 560, 540],
          },
        ]}
      />
    </ChartWidget>
  );
};
