import { Box, Grid, useTheme } from '@mui/material';

import { createDotFlashingStyles } from './createDotFlashingStyles';

export const ChatTyping = () => {
  const theme = useTheme();
  const styles = createDotFlashingStyles(theme);

  return (
    <Grid container spacing={2} justifyContent="flex-start">
      <Grid item>
        <Box width={(theme) => theme.spacing(4)}></Box>
      </Grid>
      <Grid item xs={8}>
        <Box
          sx={{ ...styles.dotFlashing }}
          ml={(theme) => theme.spacing(4)}
        ></Box>
      </Grid>
    </Grid>
  );
};
