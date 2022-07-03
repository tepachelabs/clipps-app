import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

export const WidgetPrivateContent: React.FC = () => (
  <Paper variant="outlined">
    <Stack spacing={2} p={2}>
      <Typography variant="h6">This clipp is private</Typography>
      <Typography>
        When your clipp is <b>private</b>, only you can watch it.
      </Typography>
      <Typography>In order to get a public link, make your clipp public first.</Typography>
    </Stack>
  </Paper>
);
