import { ReactElement } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Card, SxProps, Typography } from '@mui/material';

import { fShortenNumber } from '@blockium/utils';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

type SummaryWidgetProps = {
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  icon: ReactElement;
  title: string;
  total: number;
  sx?: SxProps;
};

const SummaryWidget: React.FC<SummaryWidgetProps> = ({
  title,
  total,
  icon,
  color = 'primary',
  sx,
  ...other
}) => {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette[color].dark,
              0,
            )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
        }}
      >
        {icon}
      </IconWrapperStyle>

      <Typography variant="h3">{fShortenNumber(total)}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
};

export default SummaryWidget;
