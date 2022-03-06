import React, { memo, useEffect } from "react";
import { Grid } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Video } from "../../models";
import { fetchVideos, selectToken, selectVideos } from "../../reducers";

import { VideoUpload } from "./video-upload";
import { VideoList } from "./video-list";

const DashboardComponent: React.FC = () => {
  const videos = useAppSelector<Video[]>(selectVideos);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (videos.length) return;
    void dispatch(fetchVideos(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
