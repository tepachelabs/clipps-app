import { Button, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { formatDistance } from "date-fns";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import { ClickToCopyButton } from "~/components/atoms/click-to-copy-button";
import { PATHS } from "~/constants";
import type { Video } from "~/models";
import { generatePublicLink } from "~/utils/generate-public-link";

interface VideoPlayerProps {
  video: Video;
  showEditButton?: boolean;
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
  thumb: {
    backgroundColor: "#222",
    maxHeight: 600,
    filter: "grayscale(90%) blur(2px)",
  },
};

export const VideoPlayer = ({ showEditButton, video }: VideoPlayerProps) => {
  const date = useMemo(() => new Date(video.createdAt), [video.createdAt]);

  return (
    <Card variant="outlined" sx={styles.card}>
      {video.secureUrl ? (
        <CardMedia
          component="video"
          src={video.secureUrl}
          controls
          autoPlay
          controlsList="nodownload"
          sx={styles.video}
        />
      ) : (
        <CardMedia component="img" src={video.posterUrl} alt={video.title} sx={styles.thumb} />
      )}
      <CardContent>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2, md: 1 }}
          justifyContent="space-between"
        >
          <Stack direction="column" spacing={1}>
            <Typography variant="h5">{video.title}</Typography>
            <Typography color="text.secondary" fontSize="small">
              Uploaded {formatDistance(date, new Date(), { addSuffix: true })}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            {showEditButton && (
              <Button
                component={Link}
                to={PATHS.getVideoEditPath(video.assetId)}
                variant="contained"
              >
                Edit
              </Button>
            )}
            <ClickToCopyButton
              label="Share"
              value={generatePublicLink(video.assetId)}
              variant="contained"
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
