import { ArrowBack, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Breadcrumbs,
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Link as MuiLink,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import type { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import type { AxiosError } from "axios";
import React, { useMemo } from "react";

import { getProfile } from "~/api/profile.service";
import { fetchVideo, update } from "~/api/videos.service";
import { Layout } from "~/components/organisms/layout";
import { WidgetMetadata } from "~/components/organisms/widget-metadata";
import { WidgetPrivateContent } from "~/components/organisms/widget-private-content";
import { WidgetPublicLink } from "~/components/organisms/widget-public-link";
import { WidgetShare } from "~/components/organisms/widget-share";
import { VideoNotFoundPage } from "~/components/pages/video-not-found.component";
import { PATHS } from "~/constants";
import type { Profile, Video } from "~/models";
import { generatePublicLink } from "~/utils/generate-public-link";
import { requireToken } from "~/utils/session.server";

interface LoaderData {
  profile: Profile | null;
  token: string | null;
  video: Video | null;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  if (!params.videoId) throw new Error("Video not found");

  const token = await requireToken(request);
  const [video, profile] = await Promise.all([
    fetchVideo(params.videoId, token),
    getProfile(token),
  ]);

  const data: LoaderData = { profile, video, token };
  return json(data);
};

export const action: ActionFunction = async ({ params, request }) => {
  if (!params.videoId) throw new Error("Video not found");

  const form = await request.formData();
  const token = await requireToken(request);
  const assetId = params.videoId;
  const title = form.get("title") as string;
  const isPrivate = form.get("isPrivate") as unknown as boolean;

  try {
    await update(token, assetId, title, isPrivate);
    return redirect(PATHS.DASHBOARD);
  } catch (err) {
    const error = err as AxiosError;
    console.error(error);
    return { error: error.message };
  }
};

export const meta: MetaFunction = ({ data }: { data?: LoaderData }) => {
  if (!data || !data.video) {
    return {
      title: "Clipps",
      description: "This video has been removed or access is protected.",
      "og:title": "This video has been removed or access is protected.",
      "og:type": "video.movie",
      // "og:image": data.video.posterUrl,
      // "og:image:width": "1280",
      // "og:image:height": "720",
      "twitter:title": "This video has been removed or access is protected.",
      "twitter:description": "This video has been removed or access is protected.",
      // "twitter:image": "",
      "twitter:card": "This video has been removed or access is protected.",
    };
  }

  return {
    title: `Editing ${data.video.title} - Clipps`,
    description: `Editing "${data.video.title}". Share your Clipps, without the hassle.`,
  };
};

const styles = {
  video: { width: "100%" },
};

export default function EditVideoId() {
  const data = useLoaderData<LoaderData>();
  const publicLink = useMemo(
    () => generatePublicLink(data.video?.assetId || ""),
    [data.video?.assetId],
  );

  if (!data.video) {
    return <VideoNotFoundPage profile={data.profile} />;
  }

  return (
    <Layout profile={data.profile}>
      <Grid item container spacing={3} xs={12}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <IconButton component={Link} to="/dashboard">
              <ArrowBack />
            </IconButton>
            <MuiLink color="inherit" component={Link} to="/dashboard">
              Dashboard
            </MuiLink>
            <Typography>Edit clipp</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item md={6}>
          <Stack spacing={3}>
            <Paper variant="outlined">
              <Stack spacing={2} p={2} component={Form} method="post">
                <Typography variant="h6">Your clipp</Typography>
                {data.video.secureUrl ? (
                  <video controls style={styles.video}>
                    <img src={data.video.posterUrl} alt={data.video.title} />
                    <source src={data.video.secureUrl} type="video/mp4" />
                    <source src={data.video.originalUrl} type="video/mp4" />
                  </video>
                ) : (
                  <>
                    <Alert severity="info">
                      Your clipp is being optimized. This might take a few minutes depending its
                      size.
                    </Alert>
                    <img src={data.video.posterUrl} alt={data.video.title} style={styles.video} />
                  </>
                )}
                <TextField
                  label="You clipp's title"
                  variant="outlined"
                  size="small"
                  name="title"
                  defaultValue={data.video.title}
                />
                <FormGroup>
                  <FormControlLabel
                    control={<Switch name="isPrivate" defaultChecked={data.video.isPrivate} />}
                    label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>Clipp is private</Typography>
                        <VisibilityOff fontSize="small" />
                      </Stack>
                    }
                  />
                </FormGroup>
                <Button variant="contained" type="submit">
                  Save changes
                </Button>
              </Stack>
            </Paper>
            {!data.video.isPrivate && <WidgetShare message={data.video.title} url={publicLink} />}
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Stack spacing={3}>
            {data.video.isPrivate ? (
              <WidgetPrivateContent />
            ) : (
              <WidgetPublicLink url={publicLink} />
            )}
            <WidgetMetadata video={data.video} />
          </Stack>
        </Grid>
      </Grid>
    </Layout>
  );
}
