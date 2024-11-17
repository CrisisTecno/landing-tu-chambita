import { createTheme } from "@mui/material/styles";
import colors from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary.main,
    },
    secondary: {
      main: colors.secondary.main,
    },
    text: {
      primary: colors.neutral.darkGray,
      secondary: colors.navy.main,
    },
    background: {
      default: colors.secondary.main,
      paper: colors.neutral.lightGray,
    },
  },
});

export default theme;
