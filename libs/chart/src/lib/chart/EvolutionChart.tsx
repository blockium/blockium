import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';

import { IChart } from './Chart';
import { BaseChartOptions } from './BaseChartOptions';
import { baseChartStyle } from './BaseChartStyle';
import { currencySymbol, fCurrency } from '@blockium/utils';

export const EvolutionChart: React.FC<IChart & { showCurrency?: boolean }> = ({
  chartLabels,
  chartColors,
  chartSeries,
  height = 380,
  width = 380,
  legend = 'bottom',
  customOptions,
  showCurrency = false,
}) => {
  const chartOptions = merge(
    merge(BaseChartOptions(), {
      colors: chartColors,
      labels: chartLabels,
      legend: {
        show: legend !== 'none',
        position: legend !== 'none' ? legend : undefined,
      },
      plotOptions: { bar: { columnWidth: '16%' } },
      // fill: { type: chartData.map((i) => i.fill) },
      xaxis: {
        type: 'datetime',
        labels: {
          // format: 'd/M',
        },
      },
      yaxis: [
        {
          title: {
            text: `${showCurrency ? currencySymbol() : ''}`,
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (y: number) => {
            return y && showCurrency ? `${fCurrency(y)}` : y;
          },
        },
      },
    }),
    customOptions,
  );

  return (
    <>
      {baseChartStyle}
      <ReactApexChart
        type="line"
        series={chartSeries}
        options={chartOptions}
        height={height}
        width={width}
      />
    </>
  );
};

export default EvolutionChart;
