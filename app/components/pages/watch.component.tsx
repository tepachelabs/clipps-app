import { ArrowBack } from "@mui/icons-material";
import { Breadcrumbs, Grid, IconButton, Link as MuiLink, Typography } from "@mui/material";
import { Link } from "@remix-run/react";
import React from "react";

import { VideoPlayer } from "~/components/molecules/video-player";
import { Layout } from "~/components/organisms/layout";
import type { Profile, Video } from "~/models";

type WatchPageProps = {
  profile: Profile | null;
  video: Video;
};

export const WatchPage: React.FC<WatchPageProps> = ({ profile, video }) => {
  return (
    <Layout profile={profile}>
      <Grid item container spacing={3} xs={12} justifyContent="center">
        {profile && (
          <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb">
              <IconButton component={Link} to="/dashboard">
                <ArrowBack />
              </IconButton>
              <MuiLink color="inherit" component={Link} to="/dashboard">
                Dashboard
              </MuiLink>
              <Typography color="text.primary">{video.title}</Typography>
            </Breadcrumbs>
          </Grid>
        )}
        <Grid item xs={12} md={9}>
          <VideoPlayer video={video} />
        </Grid>
      </Grid>
    </Layout>
  );
};
