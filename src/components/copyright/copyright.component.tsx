import React from "react";
import { Link, Typography } from "@mui/material";
import { TypographyProps } from "@mui/material/Typography/Typography";

export const Copyright: React.FC<TypographyProps> = (props: TypographyProps) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {"Copyright © "}
    <Link color="inherit" href="https://clipps.io/">
      Clipps.io
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);
