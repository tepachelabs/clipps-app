import React, { memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDistance } from "date-fns";

import { Video } from "../../models";
import { getByAssetId, update } from "../../services";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchVideos, selectIsAuthenticated, selectToken } from "../../reducers";
import { ClickToCopyButton, EditableLabel } from "../../components";
import {
  Breadcrumbs,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import { NotFound } from "../not-found";

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

  if (!video) return <NotFound />;

  const onTitleUpdate = async (editedValue: string) => {
    if (!isAuthenticated || !assetId) return;

    const { data } = await update(token, assetId, editedValue);
    setVideo(data);
    void dispatch(fetchVideos(token));
  };

  const date = new Date(video.created_at);

  return (
    <Grid container spacing={3} pt={4}>
      {isAuthenticated && (
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <MuiLink color="inherit" component={Link} to="/">
              Dashboard
            </MuiLink>
            <Typography color="text.primary">{video.title}</Typography>
          </Breadcrumbs>
        </Grid>
      )}
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardMedia component="video" src={video.secure_url} controls sx={styles.video} />
          <CardContent>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <EditableLabel
                value={video.title}
                onCommit={onTitleUpdate}
                isDisabled={!isAuthenticated}
              />
              <ClickToCopyButton label="Share" value={`https://clipps.io/w/${video.asset_id}`} />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant="body2" color="text.secondary">
                Uploaded {formatDistance(date, new Date(), { addSuffix: true })}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export const Watch = memo(WatchComponent);
