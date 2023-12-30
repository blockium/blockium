import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme } from '@mui/material/styles';
// utils
import { fNumber } from '@blockium/utils';
// components
import { IChart } from './Chart';
import { BaseChartOptions } from './BaseChartOptions';
import { baseChartStyle } from './BaseChartStyle';

export const PieChart: React.FC<IChart & { type?: 'pie' | 'donut' }> = ({
  type = 'pie',
  chartData,
  height = 380,
  width = 380,
  legend = 'bottom',
  customOptions,
}) => {
  const theme = useTheme();

  const chartLabels = chartData.map((i) => i.label);
  const chartValues = chartData.map((i) => i.value);
  const chartColors = chartData.map((i) => i.color);

  const chartOptions = merge(
    merge(BaseChartOptions(), {
      colors: chartColors,
      labels: chartLabels,
      stroke: { colors: [theme.palette.background.paper] },
      legend: {
        show: legend !== 'none',
        position: legend !== 'none' ? legend : undefined,
      },
      dataLabels: { enabled: true, dropShadow: { enabled: false } },
      tooltip: {
        fillSeriesColor: false,
        y: {
          formatter: (seriesName: string | number) => fNumber(seriesName),
          title: {
            formatter: (seriesName: string) => `${seriesName}`,
          },
        },
      },
      plotOptions: {
        pie: { donut: { labels: { show: false } } },
      },
    }),
    customOptions,
  );

  return (
    <>
      {baseChartStyle}
      <ReactApexChart
        type={type}
        series={chartValues}
        colors={chartColors}
        options={chartOptions}
        height={height}
        width={width}
      />
    </>
  );
};

export default PieChart;
