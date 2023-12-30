import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';

import { BaseChartOptions } from './BaseChartOptions';
import { IChart } from './Chart';
import { baseChartStyle } from './BaseChartStyle';

export const RadialBarChart: React.FC<IChart> = ({
  chartData,
  height = 380,
  width = 380,
  legend = 'bottom',
  customOptions,
}) => {
  const chartLabels = chartData.map((i) => i.label);
  const chartValues = chartData.map((i) => i.value);
  const chartColors = chartData.map((i) => i.color);

  const chartOptions = merge(
    merge(BaseChartOptions(), {
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
        series={chartValues}
        options={{
          ...chartOptions,
          colors: chartColors,
          labels: chartLabels,
        }}
        height={height}
        width={width}
      />
    </>
  );
};
