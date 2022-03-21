import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#c15cf9",
    },
    secondary: {
      main: "#006bf5",
    },
    text: {
      primary: "#493a84",
    },
  },
  components: {
    MuiPaper: {
      variants: [
        {
          props: { variant: "muted" },
          style: {
            backgroundColor: grey[50],
            borderColor: grey[200],
            borderStyle: "solid",
            borderWidth: 1,
          },
        },
      ],
    },
  },
});
