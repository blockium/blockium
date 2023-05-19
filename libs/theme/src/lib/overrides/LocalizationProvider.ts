// ----------------------------------------------------------------------

import { Theme } from "@mui/material/styles/createTheme";

export default function LocalizationProvider(theme: Theme) {
  return {
    MuiLocalizationProvider: {
      defaultProps: {
        localeText: {
          cancelButtonLabel: "Cancelar", // This change the label on date picker on mobile
        },
      },
    },
  };
}
