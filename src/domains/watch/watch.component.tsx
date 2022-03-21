import React, { memo, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs, Grid, IconButton, Link as MuiLink, Typography } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";

import { Video } from "../../models";
import { getByAssetId, update } from "../../services";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchVideos, selectIsAuthenticated, selectToken } from "../../reducers";

import { PlayerLoading } from "./loading.component";
import { Player } from "./player.component";
import { NotFound } from "./not-found.component";

const WatchComponent: React.FC = () => {
  const { assetId } = useParams<"assetId">();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [video, setVideo] = useState<Video>();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchVideo() {
      if (!assetId) return;
      const video = await getByAssetId(assetId);
      if (video) setVideo(video);
      setIsLoading(false);
    }
    void fetchVideo();
  }, [assetId]);

  const onTitleUpdate = async (editedValue: string) => {
    if (!isAuthenticated || !assetId) return;

    const updatedVideo = await update(token, assetId, editedValue);
    setVideo(updatedVideo);
    void dispatch(fetchVideos(token));
  };

  return (
    <Grid container spacing={3}>
      {isAuthenticated && (
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <IconButton component={Link} to="/">
              <ArrowBack />
            </IconButton>
            <MuiLink color="inherit" component={Link} to="/">
              Dashboard
            </MuiLink>
            <Typography color="text.primary">{video?.title || "The void 😱"}</Typography>
          </Breadcrumbs>
        </Grid>
      )}
      <Grid item xs={12}>
        {isLoading ? (
          <>
            <Helmet>
              <title>Share your Clipps, without the hassle.</title>
              <meta name="description" content="Share your Clipps, without the hassle." />
            </Helmet>
            <PlayerLoading />
          </>
        ) : video ? (
          <>
            <Helmet>
              <title>Clipps: {video.title}</title>
              <meta name="description" content="Share your Clipps, without the hassle." />
              <meta property="og:title" content={video.title} />
              <meta property="og:type" content="video.movie" />
              <meta property="og:url" content={`https://clipps.io/w/${video.assetId}`} />
              <meta property="og:image" content={video.posterUrl} />
              <meta name="twitter:title" content={video.title} />
              <meta name="twitter:description" content={video.title} />
              <meta name="twitter:image" content={video.posterUrl} />
              <meta name="twitter:card" content={video.posterUrl} />
              <link rel="canonical" href={`https://clipps.io/w/${video.assetId}`} />
            </Helmet>
            <Player onTitleUpdate={onTitleUpdate} video={video} />
          </>
        ) : (
          <>
            <Helmet>
              <title>Clipps: The video was deleted</title>
              <meta
                name="description"
                content="The video was deleted or creator decided to not share it."
              />
            </Helmet>
            <NotFound />
          </>
        )}
      </Grid>
    </Grid>
  );
};

export const Watch = memo(WatchComponent);
