import { Email, Facebook, Reddit, Telegram, Twitter, WhatsApp } from "@mui/icons-material";
import { Link as MuiLink, Paper, Stack, Typography } from "@mui/material";
import React from "react";

interface WidgetShareProps {
  message: string;
  url: string;
}
export const WidgetShare: React.FC<WidgetShareProps> = ({ message, url }) => {
  return (
    <Paper variant="outlined">
      <Stack spacing={2} p={2}>
        <Typography variant="h6">Share this clipp</Typography>
        <Stack direction="row" spacing={2}>
          <MuiLink
            href={`mailto:?subject=I wanted you to see this clipp&amp;body=Check out this clipp ${url}`}
            title="Share by email"
          >
            <Email />
          </MuiLink>
          <MuiLink
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            rel="noopener"
          >
            <Facebook />
          </MuiLink>
          <MuiLink href={`https://twitter.com/intent/tweet?url=${url}`}>
            <Twitter />
          </MuiLink>
          <MuiLink href={`https://www.reddit.com/submit?url=${url}&title=${message}`}>
            <Reddit />
          </MuiLink>
          <MuiLink href={`https://telegram.me/share/url?text=${message}&url=${url}`}>
            <Telegram />
          </MuiLink>
          <MuiLink href={`https://wa.me/?text=${message}:%20${url}`}>
            <WhatsApp />
          </MuiLink>
        </Stack>
      </Stack>
    </Paper>
  );
};
