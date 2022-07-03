import { Button, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { formatDistance } from "date-fns";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import { ClickToCopyButton } from "~/components/atoms/click-to-copy-button";
import { PATHS } from "~/constants";
import type { Video } from "~/models";
import { generatePublicUrl } from "~/utils/generate-public-url";

interface VideoPlayerProps {
  video: Video;
  onTitleUpdate?: (editedValue: string) => void;
}

const styles = {
  card: {
    width: "100%",
  },
  video: {
    backgroundColor: "#222",
    maxHeight: 600,
  },
};

export const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const date = useMemo(() => new Date(video.createdAt), [video.createdAt]);

  return (
    <Card variant="outlined" sx={styles.card}>
      <CardMedia
        component="video"
        src={video.secureUrl}
        controls
        controlsList="nodownload"
        sx={styles.video}
      />
      <CardContent>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Typography variant="h5">{video.title}</Typography>
          <Stack direction="row" spacing={2}>
            <Button component={Link} to={PATHS.getVideoEditPath(video.assetId)} variant="outlined">
              Edit
            </Button>
            <ClickToCopyButton
              label="Share"
              value={generatePublicUrl(video.assetId)}
              variant="outlined"
            />
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Uploaded {formatDistance(date, new Date(), { addSuffix: true })}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
