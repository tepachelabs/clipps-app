import React, { memo, useEffect } from "react";
import { Grid } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Video } from "../../models";
import { VideoList, VideoUpload } from "../../components";
import { fetchVideos, selectToken, selectVideos } from "../../reducers";

const DashboardComponent: React.FC = () => {
  const videos = useAppSelector<Video[]>(selectVideos);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (videos.length) return;
    void dispatch(fetchVideos(token));
  }, [dispatch, token, videos]);

  const onUploaded = () => {
    void dispatch(fetchVideos(token));
  };

  return (
    <Grid container spacing={3} pt={4}>
      <Grid item xs={12}>
        <VideoUpload onUploaded={onUploaded} />
      </Grid>
      <Grid item xs={12}>
        <VideoList videos={videos} />
      </Grid>
    </Grid>
  );
};

export const Dashboard = memo(DashboardComponent);
