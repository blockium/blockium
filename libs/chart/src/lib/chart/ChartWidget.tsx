import { PropsWithChildren } from 'react';
import { Card, CardContent, CardHeader, Stack, styled } from '@mui/material';

// const CHART_HEIGHT = 372;
// const LEGEND_HEIGHT = 72;

// const ChartWrapperStyle = styled('div')(({ theme }) => ({
//   height: CHART_HEIGHT,
//   marginTop: theme.spacing(5),
//   '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
//   '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
//     overflow: 'visible',
//   },
//   '& .apexcharts-legend': {
//     height: LEGEND_HEIGHT,
//     alignContent: 'center',
//     position: 'relative !important',
//     borderTop: `solid 1px ${theme.palette.divider}`,
//     top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
//   },
// }));

const ChartWrapperStyle = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(4),
  height: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  alignItems: 'center',

  // alignItems: 'center',
  // marginTop: theme.spacing(4),
  // marginBottom: theme.spacing(4),
  // '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  // '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
  //   overflow: 'visible',
  // },
  // '& .apexcharts-legend': {
  //   height: LEGEND_HEIGHT,
  //   alignContent: 'center',
  //   position: 'relative !important',
  //   borderTop: `solid 1px ${theme.palette.divider}`,
  //   top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  // },
}));

type ChartWidgetProps = {
  title: string;
  subheader?: string;
  [key: string]: unknown;
} & PropsWithChildren;

export const ChartWidget: React.FC<ChartWidgetProps> = ({
  title,
  subheader,
  children,
  ...other
}) => {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        <ChartWrapperStyle dir="ltr">{children}</ChartWrapperStyle>
      </CardContent>
    </Card>
  );
};

export default ChartWidget;
