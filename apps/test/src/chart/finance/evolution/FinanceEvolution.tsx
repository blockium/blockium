import { EvolutionChart } from '@blockium/chart';
import { useTheme } from '@mui/material';

export const FinanceEvolution: React.FC = () => {
  const theme = useTheme();

  return (
    <EvolutionChart
      title="Evolução"
      subheader="(+43%) than last year"
      height={320}
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
      chartData={[
        {
          name: 'Receita',
          type: 'area',
          fill: 'gradient',
          // data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
          data: [350, 500, 550, 590, 650, 800],
        },
        {
          name: 'Despesas',
          type: 'line',
          fill: 'solid',
          // data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
          data: [430, 450, 440, 560, 560, 540],
        },
      ]}
    />
  );
};
