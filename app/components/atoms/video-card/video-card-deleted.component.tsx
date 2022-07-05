import { Pending, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

import type { Video } from "~/models";

import fallbackImg from "./fallback-bkg.jpg";

export interface VideoCardDeletedProps {
  isChecked: boolean;
  onCheck?: ({ checked, video }: { checked: boolean; video: Video }) => void;
  onDelete?: (video: Video) => void;
  onRestore?: (video: Video) => void;
  video: Video;
}

const styles = {
  card: {
    position: "relative",
  },
  checkbox: {
    position: "absolute",
    zIndex: 99,
    color: "white",
    "&.Mui-checked": {
      color: "white",
    },
  },
  chip: {
    position: "absolute",
    zIndex: 99,
    left: 5,
    bottom: "50%",
  },
  thumbMuted: {
    filter: "grayscale(90%)",
    height: 150,
  },
};

export const VideoCardDeleted: React.FC<VideoCardDeletedProps> = ({
  isChecked,
  onCheck,
  onDelete,
  onRestore,
  video,
}: VideoCardDeletedProps) => (
  <Grid item xs={12} sm={4} md={3}>
    <Card variant="muted" sx={styles.card}>
      {video.isPrivate && (
        <Chip
          size="small"
          icon={<VisibilityOff />}
          label="Private"
          variant="muted"
          sx={styles.chip}
        />
      )}
      {!video.secureUrl && (
        <Chip
          size="small"
          icon={<Pending />}
          label="Processing..."
          variant="muted"
          sx={styles.chip}
        />
      )}
      <Checkbox
        checked={isChecked}
        onChange={({ target }) => onCheck?.({ checked: target.checked, video })}
        sx={styles.checkbox}
      />
      <CardMedia
        component="img"
        width="100%"
        image={video.posterUrl}
        alt={video.title}
        sx={styles.thumbMuted}
        onError={(error: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = error.target as HTMLImageElement;
          target.src = fallbackImg;
        }}
      />
      <CardContent>
        <Tooltip title={video.title}>
          <Typography color="text.secondary" gutterBottom={false} noWrap>
            {video.title}
          </Typography>
        </Tooltip>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onDelete?.(video)}>
          Destroy
        </Button>
        <Button size="small" onClick={() => onRestore?.(video)}>
          Restore
        </Button>
      </CardActions>
    </Card>
  </Grid>
);
