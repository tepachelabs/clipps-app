import React from "react";
import { Link } from "react-router-dom";
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

import { Video } from "../../../models";
import { ClickToCopyButton } from "../../../components";

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
  onShare,
  video,
}: VideoCardProps) => (
  <Grid item xs={3}>
    <Card variant="outlined">
      <Checkbox
        checked={isChecked}
        onChange={({ target }) => onCheck?.({ checked: target.checked, video })}
        sx={styles.checkbox}
      />
      <CardActionArea component={Link} to={`/w/${video.assetId}`}>
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
        <ClickToCopyButton label="Share" value={`https://clipps.netlify.app/w/${video.assetId}`} />
        <Button size="small" onClick={() => onDelete?.(video)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  </Grid>
);
