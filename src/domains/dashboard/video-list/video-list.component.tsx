import React, { useCallback, useMemo, useState } from "react";
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
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Video } from "../../../models";
import { deleteByAssetId } from "../../../services";
import { fetchVideos, selectToken } from "../../../reducers";

import { DeleteConfirmation } from "./delete-confirmation.component";

interface VideoListProps {
  videos: Video[];
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

const getFiltered = (videos: Video[], searchQuery: string): Video[] =>
  videos.filter((video) => video.title.toLowerCase().includes(searchQuery.toLowerCase()));

export const VideoList: React.FC<VideoListProps> = ({ videos }: VideoListProps) => {
  const [selection, setSelection] = useState<Video[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [confirmationOpen, setConfirmationOpen] = React.useState<boolean>(false);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  const onSelect = useCallback(
    (video: Video, checked: boolean) => {
      if (checked) {
        setSelection([...selection, video]);
      } else {
        const filtered = selection.filter((current) => current.assetId !== video.assetId);
        setSelection(filtered);
      }
    },
    [selection],
  );

  const onSelectAll = useCallback(() => setSelection(videos), [videos]);

  const onDelete = useCallback((video: Video) => {
    setSelection([video]);
    setConfirmationOpen(true);
  }, []);

  const onBulkDelete = useCallback(() => {
    setConfirmationOpen(true);
  }, []);

  const onDeleteCancel = useCallback(() => {
    setConfirmationOpen(false);
    setSelection([]);
  }, []);

  const onDeleteAccept = useCallback(async () => {
    await Promise.all(selection.map((video) => deleteByAssetId(token, video.assetId)));
    void dispatch(fetchVideos(token));
    setConfirmationOpen(false);
    setSelection([]);
  }, [dispatch, selection, token]);

  const onClearSelection = useCallback(() => setSelection([]), []);

  const selectionLabel = useMemo(
    () => (selection.length === 1 ? "Selected 1 item." : `Selected ${selection.length} items.`),
    [selection.length],
  );

  return (
    <Grid container spacing={3}>
      <DeleteConfirmation
        isOpen={confirmationOpen}
        items={selection}
        onAccept={onDeleteAccept}
        onCancel={onDeleteCancel}
      />
      <Grid item xs={12}>
        <Card variant="outlined">
          {selection.length ? (
            <Stack direction="row" spacing={2} alignItems="center" p={1} pl={2} height={56}>
              <Typography gutterBottom={false}>{selectionLabel}</Typography>
              <Button variant="outlined" onClick={onSelectAll}>
                Select all
              </Button>
              <Button variant="outlined" onClick={onClearSelection}>
                Clear selection
              </Button>
              <Button variant="outlined" onClick={onBulkDelete}>
                Delete selected
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2} justifyContent="space-between" p={1}>
              <TextField
                label="Search..."
                variant="outlined"
                size="small"
                onChange={({ target }) => setSearchQuery(target.value)}
              />
              <Button startIcon={<DeleteIcon />} sx={{ alignSelf: "flex-end" }} disabled>
                Trash
              </Button>
            </Stack>
          )}
        </Card>
      </Grid>
      {getFiltered(videos, searchQuery).map((video: Video) => (
        <Grid key={video.assetId} item xs={3}>
          <Card variant="outlined">
            <Checkbox
              checked={!!selection.find((current) => current.assetId === video.assetId)}
              onChange={({ target }) => onSelect(video, target.checked)}
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
              <Button size="small">Share</Button>
              <Button size="small" onClick={() => onDelete(video)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
