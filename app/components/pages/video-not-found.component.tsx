import { ArrowBack } from "@mui/icons-material";
import {
  Breadcrumbs,
  Grid,
  IconButton,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { Link } from "@remix-run/react";
import React from "react";

import { Layout } from "~/components/organisms/layout.component";
import { PATHS } from "~/constants";
import type { Profile } from "~/models/profile.model";
import tvOffIcon from "~/svg/tv-off.svg";

type VideoNotFoundPageProps = {
  profile: Profile | null;
};

export const VideoNotFoundPage: React.FC<VideoNotFoundPageProps> = ({
  profile,
}) => (
  <Layout profile={profile}>
    {profile && (
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <IconButton component={Link} to="/dashboard">
            <ArrowBack />
          </IconButton>
          <MuiLink color="inherit" component={Link} to="/dashboard">
            Dashboard
          </MuiLink>
        </Breadcrumbs>
      </Grid>
    )}
    <Grid item xs={12} textAlign="center">
      <Typography variant="h2" mb={4}>
        Video not found
      </Typography>
      <img src={tvOffIcon} alt="TV turned off" width={200} />
      <Typography mt={4}>
        This video might be deleted, or its access is restricted by privacy
        reasons.
      </Typography>
      {profile ? (
        <MuiLink component={Link} to={PATHS.DASHBOARD}>
          Go to your dashboard.
        </MuiLink>
      ) : (
        <MuiLink component={Link} to={PATHS.HOME}>
          Go to the homepage.
        </MuiLink>
      )}
    </Grid>
  </Layout>
);
