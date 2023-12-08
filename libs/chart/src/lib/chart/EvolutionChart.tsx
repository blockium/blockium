import { merge } from 'lodash';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { BaseOptionChart } from '.';

// ----------------------------------------------------------------------

type ChartDataItem = {
  name: string;
  type: string;
  fill: string;
  data: number[];
};

type EvolutionChartProps = {
  title: string;
  subheader?: string;
  chartColors?: string[];
  chartData: ChartDataItem[];
  chartLabels: string[];
};

export const EvolutionChart: React.FC<EvolutionChartProps> = ({
  title,
  subheader,
  chartColors,
  chartLabels,
  chartData,
  ...other
}) => {
  const chartOptions: ApexOptions = merge(BaseOptionChart(), {
    colors: chartColors,
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: {
      type: 'datetime',
      labels: {
        // TODO: i18n
        format: 'd/M',
      },
    },
    // TODO: i18n
    yaxis: [{ title: { text: 'R$' } }],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number) => {
          if (typeof y !== 'undefined') {
            // TODO: i18n
            return `R$ ${y.toFixed(0)}`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <Chart
          type="line"
          series={chartData}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
};

export default EvolutionChart;
