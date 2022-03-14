import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import { Grid, Typography } from "@mui/material";

const LandingComponent: React.FC = () => {
  return (
    <Grid container spacing={4} pt={4}>
      <Helmet>
        <title>Clipps: video hosting made easy</title>
        <meta
          name="description"
          content="Join thousands of businesses and creators who trust Clipps to upload and share their videos."
        />
      </Helmet>
      <Grid item xs={12} md={6}>
        <Typography variant="h2">The easiest way to share video clips</Typography>
        <Typography variant="body1">
          Join thousands of creators who trust Clipps to upload and share their videos.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} textAlign="center">
        <img src="https://placehold.co/400x400" alt="placeholder" />
      </Grid>
    </Grid>
  );
};

export const Landing = memo(LandingComponent);
