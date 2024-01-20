import { Box, Container, Grid } from '@mui/material';

import { LoginSVG } from './LoginSVG';

interface LoginHeroProps {
  leftImage?: string;
  topImage?: string;
  children: React.ReactNode;
}

export const LoginHero: React.FC<LoginHeroProps> = ({
  leftImage,
  topImage,
  children,
}) => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      style={{ height: '100dvh' }}
      // Fallback for browsers that do not support dvh:
      sx={{ height: '100vh' }}
    >
      <Grid container direction="row" sx={{ height: '100%' }}>
        <Grid item xs={12} sm={7} xl={5} height={{ xs: '35%', sm: '100%' }}>
          {leftImage ? (
            <Box
              component="img"
              sx={{
                // display: { xs: 'none', sm: 'block' },
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
                content: {
                  xs: `url(${topImage ?? leftImage})`,
                  sm: `url(${leftImage})`,
                },
              }}
              src={leftImage}
              alt="Login Image"
            ></Box>
          ) : (
            <Box width="100%" height="100%" marginTop="2rem">
              <LoginSVG />
            </Box>
          )}
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
