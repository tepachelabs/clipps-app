import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "@remix-run/react";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import { ClickToCopyButton } from "~/components/atoms/click-to-copy-button";
import { ContextualMenu } from "~/components/atoms/contextual-menu";
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
  actions: {
    color: "white",
    position: "absolute",
    zIndex: 99,
    right: 0,
  },
};

export const VideoCard: React.FC<VideoCardProps> = ({
  isChecked,
  onCheck,
  onDelete,
  video,
}: VideoCardProps) => {
  const navigate = useNavigate();
  const contextualActions = useMemo(
    () => [
      {
        label: "Edit",
        callback: () => {
          navigate(PATHS.getVideoEditPath(video.assetId));
        },
      },
      {
        label: "Delete",
        callback: () => {
          onDelete?.(video);
        },
      },
    ],
    [navigate, onDelete, video],
  );

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card variant="outlined" sx={styles.card}>
        <Checkbox
          checked={isChecked}
          onChange={({ target }) => onCheck?.({ checked: target.checked, video })}
          sx={styles.checkbox}
        />
        <ContextualMenu items={contextualActions}>
          {(toggleContextualMenu) => (
            <IconButton onClick={toggleContextualMenu} sx={styles.actions}>
              <MoreVertIcon />
            </IconButton>
          )}
        </ContextualMenu>
        <CardActionArea component={Link} to={PATHS.getVideoPublicLink(video.assetId)}>
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
          <Button component={Link} to={PATHS.getVideoEditPath(video.assetId)}>
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
