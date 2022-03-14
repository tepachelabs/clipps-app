import React from "react";
import { Link, Paper, Typography } from "@mui/material";
import { TypographyProps } from "@mui/material/Typography/Typography";

const styles = {
  paper: {
    height: "100%",
    paddingY: 2,
    width: "100%",
  },
};

export const Copyright: React.FC<TypographyProps> = (props: TypographyProps) => (
  <Paper sx={styles.paper}>
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://clipps.netlify.app/">
        Clipps
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  </Paper>
);
