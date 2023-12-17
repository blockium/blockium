import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const useIsMobile = () => {
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("sm"));
  return isMobile;
};
