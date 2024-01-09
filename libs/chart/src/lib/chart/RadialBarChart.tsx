import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';

import { IChart } from './Chart';
import { BaseChartOptions } from './BaseChartOptions';
import { baseChartStyle } from './BaseChartStyle';

export const RadialBarChart: React.FC<IChart> = ({
  chartLabels,
  chartColors,
  chartSeries,
  height = 340,
  width = 340,
  legend = 'bottom',
  customOptions,
}) => {
  const chartOptions = merge(
    merge(BaseChartOptions(), {
      colors: chartColors,
      labels: chartLabels,
      legend: {
        show: legend !== 'none',
        position: legend !== 'none' ? legend : undefined,
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: '60%',
          },

          dataLabels: {
            name: {
              offsetY: -10,
            },
            value: {
              fontSize: '30px',
            },
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
        type="radialBar"
        series={chartSeries}
        options={chartOptions}
        height={height}
        width={width}
      />
    </>
  );
};
