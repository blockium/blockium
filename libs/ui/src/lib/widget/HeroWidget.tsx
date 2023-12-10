/* eslint-disable jsx-a11y/accessible-emoji */
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Stack,
  useTheme,
} from '@mui/material';

import { CTAButton } from '../button';

type HeroAction = {
  label: string;
  onClick: () => void;
};

type HeroWidgetProps = {
  title: string;
  subheader?: string;
  message: string;
  imageSrc: string;
  imageFullHeight?: boolean;
  xsImageHeight?: number;
  actions?: HeroAction[];
  height?: number | string | object;
};

export const HeroWidget: React.FC<HeroWidgetProps> = ({
  title,
  subheader,
  message,
  imageSrc,
  imageFullHeight = true,
  xsImageHeight,
  actions,
  height,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{ bgcolor: theme.palette.primary.lighter, height: height || '100%' }}
    >
      <Grid container height="100%">
        <Grid
          item
          xs={12}
          sm={6}
          height={{ xs: `calc(100% - ${xsImageHeight || 0}px)`, sm: '100%' }}
        >
          <Stack direction="column" p={2} height="100%" justifyContent="center">
            <CardHeader
              title={title}
              subheader={subheader}
              titleTypographyProps={{
                sx: { color: theme.palette.primary.main },
              }}
            />
            <CardContent>{message}</CardContent>
            {actions && actions.length > 0 && (
              <CardActions>
                {actions?.map(({ label, onClick }, index) => (
                  <CTAButton onClick={onClick} key={index}>
                    {label}
                  </CTAButton>
                ))}
              </CardActions>
            )}
          </Stack>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          alignItems="center"
          justifyContent="center"
          height={{ xs: xsImageHeight || '100%', sm: '100%' }}
        >
          <CardMedia
            image={imageSrc}
            sx={{
              height: xsImageHeight || '100%',
              minHeight: imageFullHeight ? '100%' : undefined,
              width: '100%',
            }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default HeroWidget;
