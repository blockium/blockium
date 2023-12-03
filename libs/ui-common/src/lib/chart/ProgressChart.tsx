import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// @mui
import { styled } from '@mui/material/styles';
import { Card, CardHeader, MenuItem } from '@mui/material';
// components
import { BaseOptionChart } from '.';

// ----------------------------------------------------------------------

export type Period = 'day' | 'week' | 'month';

const CHART_HEIGHT = 372;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
  justifyContent: 'space-around',
  // height: CHART_HEIGHT,
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
}));

// ----------------------------------------------------------------------

type ChartDataItem = {
  label: string;
  value: number;
};

type ProgressChartProps = {
  title: string;
  subheader?: string;
  chartColors: string[];
  chartData: ChartDataItem[];
  onPeriodClick?: (period: Period) => void;
  compact?: boolean;
};

export const ProgressChart: React.FC<ProgressChartProps> = ({
  title,
  subheader,
  chartColors,
  chartData,
  onPeriodClick,
  compact,
  ...other
}) => {
  const chartOptions = merge(BaseOptionChart(), {
    legend: { show: false },
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
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <ChartWrapperStyle dir="ltr">
        {chartData.map((data, index) => {
          const periods: Period[] = ['month', 'week', 'day'];
          const Chart: React.FC = () => (
            <ReactApexChart
              type="radialBar"
              series={[data.value]}
              options={{
                ...chartOptions,
                colors: [chartColors[index]],
                labels: [data.label],
              }}
              height={compact ? 200 : 280}
            />
          );
          return onPeriodClick ? (
            <MenuItem
              key={index}
              onClick={() => onPeriodClick(periods[index] as Period)}
              sx={{ p: 0, m: 0, justifyContent: 'center' }}
            >
              <Chart />
            </MenuItem>
          ) : (
            <Chart key={index} />
          );
        })}
      </ChartWrapperStyle>
    </Card>
  );
};

export default ProgressChart;
