import { deepPurple, grey, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: grey[50],
    },
    primary: {
      main: "#53428f",
    },
    secondary: {
      main: deepPurple[50],
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: grey[800],
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "white",
          color: grey[800],
          borderWidth: "0 0 1px 0",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "inverted" },
          style: {
            backgroundColor: grey[50],
            borderColor: grey[200],
            borderStyle: "solid",
            borderWidth: 1,
          },
        },
      ],
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: "secondary" },
          style: {
            backgroundColor: deepPurple["50"],
          },
        },
      ],
    },
    MuiCard: {
      variants: [
        {
          props: { variant: "muted" },
          style: {
            backgroundColor: grey[50],
            border: `1px solid ${grey[300]}`,
          },
        },
      ],
    },
    MuiChip: {
      variants: [
        {
          props: { variant: "muted" },
          style: {
            backgroundColor: grey[300],
          },
        },
      ],
    },
  },
});

export default theme;
