import { PropsWithChildren } from 'react';
import { Card, CardContent, CardHeader, Stack, styled } from '@mui/material';

const ChartWrapperStyle = styled(Stack)(({ theme }) => ({
  px: theme.spacing(4),
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
