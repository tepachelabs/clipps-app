import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }

  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    inverted: true;
  }
}

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    secondary: true;
  }
}

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    muted: true;
  }
}
