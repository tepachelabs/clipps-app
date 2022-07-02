import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { ClickToCopyButton } from "~/components/atoms/click-to-copy-button";
import { PATHS } from "~/constants";
import type { Video } from "~/models";
import { generatePublicUrl } from "~/utils/generate-public-url";

export interface VideoCardProps {
  isChecked: boolean;
  onCheck?: ({ checked, video }: { checked: boolean; video: Video }) => void;
  onDelete?: (video: Video) => void;
  onShare?: (video: Video) => void;
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

export const VideoCard: React.FC<VideoCardProps> = ({
  isChecked,
  onCheck,
  onDelete,
  video,
}: VideoCardProps) => (
  <Grid item xs={12} sm={4} md={3}>
    <Card variant="outlined">
      <Checkbox
        checked={isChecked}
        onChange={({ target }) => onCheck?.({ checked: target.checked, video })}
        sx={styles.checkbox}
      />
      <CardActionArea component={Link} to={PATHS.getVideoPath(video.assetId)}>
        <CardMedia component="img" width="100%" image={video.posterUrl} alt={video.title} />
        <CardContent>
          <Tooltip title={video.title}>
            <Typography gutterBottom={false} noWrap>
              {video.title}
            </Typography>
          </Tooltip>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ClickToCopyButton label="Share" value={generatePublicUrl(video.assetId)} />
        <Button size="small" onClick={() => onDelete?.(video)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  </Grid>
);
