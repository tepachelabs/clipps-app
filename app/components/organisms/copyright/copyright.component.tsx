import { Container, Link, Paper, Stack, Typography } from "@mui/material";
import type { TypographyProps } from "@mui/material/Typography/Typography";
import React from "react";

import { PATHS } from "~/constants";

const styles = {
  paper: {
    height: "100%",
    paddingY: 2,
    width: "100%",
    borderRadius: 0,
    borderWidth: "1px 0 0 0",
  },
};

export const Copyright: React.FC<TypographyProps> = (props) => (
  <Paper variant="outlined" sx={styles.paper}>
    <Container maxWidth="lg">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" color="text.secondary" {...props}>
          {"Copyright © "}
          <Link color="inherit" href="https://clipps.io/">
            Clipps
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Link color="inherit" href={PATHS.PRIVACY}>
            <Typography variant="body2" color="text.secondary" {...props}>
              Privacy
            </Typography>
          </Link>
          <Link color="inherit" href={PATHS.TERMS}>
            <Typography variant="body2" color="text.secondary" {...props}>
              Terms
            </Typography>
          </Link>
        </Stack>
      </Stack>
    </Container>
  </Paper>
);
