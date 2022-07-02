import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { formatDistance } from "date-fns";
import React, { useMemo } from "react";

import { ClickToCopyButton } from "~/components/atoms/click-to-copy-button";
import type { Video } from "~/models";
import { generatePublicUrl } from "~/utils/generate-public-url";

interface VideoPlayerProps {
  video: Video;
  onTitleUpdate?: (editedValue: string) => void;
}

const styles = {
  video: {
    backgroundColor: "#222",
    maxHeight: 600,
  },
};

export const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const date = useMemo(() => new Date(video.createdAt), [video.createdAt]);

  return (
    <Card variant="outlined">
      <CardMedia
        component="video"
        src={video.secureUrl}
        controls
        controlsList="nodownload"
        sx={styles}
      />
      <CardContent>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Typography variant="h5">{video.title}</Typography>
          {/*<EditableLabel value={video.title} onCommit={onTitleUpdate} />*/}
          <ClickToCopyButton
            label="Share"
            value={generatePublicUrl(video.assetId)}
            variant="outlined"
          />
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
