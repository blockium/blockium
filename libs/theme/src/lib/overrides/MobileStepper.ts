// ----------------------------------------------------------------------

import { Theme } from "@mui/material/styles/createTheme";

export default function MobileStepper(theme: Theme) {
  return {
    MuiMobileStepper: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.main,
          width: "100%",
          height: "100%",
        },
        dot: {
          backgroundColor: theme.palette.secondary.main,
        },
        dotActive: {
          backgroundColor: "#fff",
        },
      },
    },
  };
}
