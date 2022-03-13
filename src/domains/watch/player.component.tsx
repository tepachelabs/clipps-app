import React, { useMemo } from "react";
import { formatDistance } from "date-fns";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";

import { Video } from "../../models";
import { ClickToCopyButton, EditableLabel } from "../../components";

const styles = {
  video: {
    backgroundColor: "#222",
    maxHeight: 600,
  },
};

interface PlayerProps {
  video: Video;
  onTitleUpdate?: (editedValue: string) => void;
}

export const Player: React.FC<PlayerProps> = ({ onTitleUpdate, video }: PlayerProps) => {
  const date = useMemo(() => new Date(video.createdAt), [video.createdAt]);

  return (
    <Card variant="outlined">
      <CardMedia
        component="video"
        src={video.secureUrl}
        controls
        sx={styles.video}
        controlsList="nodownload"
      />
      <CardContent>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <EditableLabel value={video.title} onCommit={onTitleUpdate} />
          <ClickToCopyButton
            label="Share"
            value={`https://clipps.netlify.app/w/${video.assetId}`}
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
