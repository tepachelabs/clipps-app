import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

import type { Video } from "~/models";

export interface VideoCardDeletedProps {
  isChecked: boolean;
  onCheck?: ({ checked, video }: { checked: boolean; video: Video }) => void;
  onDelete?: (video: Video) => void;
  onRestore?: (video: Video) => void;
  video: Video;
}

const styles = {
  checkbox: {
    position: "absolute",
    zIndex: 99,
    color: "white",
    "&.Mui-checked": {
      color: "white",
    },
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
    <Card variant="muted">
      <Checkbox
        checked={isChecked}
        onChange={({ target }) => onCheck?.({ checked: target.checked, video })}
        sx={styles.checkbox}
      />
      <CardMedia component="img" width="100%" image={video.posterUrl} alt={video.title} />
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
