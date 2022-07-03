import { Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";

import { ClickToCopyButton } from "~/components/atoms/click-to-copy-button";

interface WidgetPrivateContentProps {
  url: string;
}

export const WidgetPublicLink: React.FC<WidgetPrivateContentProps> = ({ url }) => (
  <Paper variant="outlined">
    <Stack spacing={2} p={2}>
      <Typography variant="h6">Your public link</Typography>
      <Typography>
        Use this link to share your video. Anyone with this link can watch it, unless you mark your
        clipp as private.
      </Typography>
      <Stack direction="row" spacing={1}>
        <TextField
          label="Public link"
          variant="outlined"
          size="small"
          defaultValue={url}
          fullWidth
          disabled
        />
        <ClickToCopyButton label="Copy" value={url} variant="contained" />
      </Stack>
    </Stack>
  </Paper>
);
