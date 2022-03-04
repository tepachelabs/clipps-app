import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Video } from "../../models";
import { getByAssetId, update } from "../../services";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchVideos, selectIsAuthenticated, selectToken } from "../../reducers";
import { EditableLabel } from "../../components";
import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";

const styles = {
  video: {
    backgroundColor: "#222",
    maxHeight: 600,
  },
};

const WatchComponent: React.FC = () => {
  const { assetId } = useParams<"assetId">();
  const [video, setVideo] = useState<Video>();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchVideo() {
      if (!assetId) return;
      const { data } = await getByAssetId(assetId);
      setVideo(data);
    }
    void fetchVideo();
  }, [assetId]);

  if (!video) return null;

  const onTitleUpdate = async (editedValue: string) => {
    if (!isAuthenticated || !assetId) return;

    const { data } = await update(token, assetId, editedValue);
    setVideo(data);
    void dispatch(fetchVideos(token));
  };

  const date = new Date(video.created_at);

  return (
    <Grid container spacing={3} pt={4}>
      <Grid item xs={12}>
        <Card>
          <CardMedia component="video" src={video.secure_url} controls sx={styles.video} />
          <CardContent>
            <EditableLabel
              value={video.title}
              onCommit={onTitleUpdate}
              isDisabled={!isAuthenticated}
            />
          </CardContent>
          <CardActions>
            <Typography variant="body2" color="text.secondary">
              Uploaded: {date.toDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Duration: {video.duration}s
            </Typography>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export const Watch = memo(WatchComponent);
