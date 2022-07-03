import { ArrowBack } from "@mui/icons-material";
import { Breadcrumbs, Grid, IconButton, Link as MuiLink, Typography } from "@mui/material";
import { Link } from "@remix-run/react";
import React, { useMemo } from "react";

import { VideoPlayer } from "~/components/molecules/video-player";
import { Layout } from "~/components/organisms/layout";
import { PATHS } from "~/constants";
import type { Profile, Video } from "~/models";

type WatchPageProps = {
  profile: Profile | null;
  video: Video;
};

export const WatchPage: React.FC<WatchPageProps> = ({ profile, video }) => {
  const hasProfile = useMemo(() => Boolean(profile), [profile]);

  return (
    <Layout profile={profile}>
      <Grid item container spacing={3} xs={12} justifyContent="center">
        {hasProfile && (
          <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb">
              <IconButton component={Link} to="/dashboard">
                <ArrowBack />
              </IconButton>
              <MuiLink component={Link} to="/dashboard">
                Dashboard
              </MuiLink>
              <Typography>{video.title}</Typography>
            </Breadcrumbs>
          </Grid>
        )}
        <Grid item xs={12} md={9}>
          <VideoPlayer video={video} showEditButton={hasProfile} />
          {!hasProfile && (
            <Typography align="right">
              <MuiLink href={PATHS.MAILTO} fontSize="small">
                Report
              </MuiLink>
            </Typography>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};
