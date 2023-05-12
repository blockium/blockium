import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

interface LoginHeroProps {
  leftImageSrc: string;
  topImageSrc?: string;
  children: React.ReactNode;
}

export const LoginHero: React.FC<LoginHeroProps> = ({
  leftImageSrc,
  topImageSrc,
  children,
}) => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ height: ['100dvh', '100vh'] }}
    >
      <Grid container direction="row" sx={{ height: '100%' }}>
        <Grid item xs={12} sm={7} xl={5} height={{ xs: '35%', sm: '100%' }}>
          <Box
            component="img"
            sx={{
              // display: { xs: 'none', sm: 'block' },
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
              content: {
                xs: `url(${topImageSrc ?? leftImageSrc})`,
                sm: `url(${leftImageSrc})`,
              },
            }}
            src={leftImageSrc}
            alt="Login Image"
          ></Box>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          sm={5}
          xl={7}
          padding="0 4rem"
          height={{ xs: '65%', sm: '100%' }}
        >
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginHero;
