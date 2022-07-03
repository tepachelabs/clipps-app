import { ArrowBack } from "@mui/icons-material";
import {
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
import React from "react";

import { getProfile } from "~/api/profile.service";
import { fetchVideo, update } from "~/api/videos.service";
import { ClickToCopyButton } from "~/components/atoms/click-to-copy-button";
import { Layout } from "~/components/organisms/layout";
import { VideoNotFoundPage } from "~/components/pages/video-not-found.component";
import { PATHS } from "~/constants";
import type { Profile, Video } from "~/models";
import { generatePublicUrl } from "~/utils/generate-public-url";
import { getToken, requireToken } from "~/utils/session.server";

interface LoaderData {
  profile: Profile | null;
  token: string | null;
  video: Video | null;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  if (!params.videoId) throw new Error("Video not found");

  const token = await getToken(request);
  let profile = null;
  let video;

  if (token) {
    [video, profile] = await Promise.all([fetchVideo(params.videoId), getProfile(token)]);
  } else {
    video = await fetchVideo(params.videoId);
  }

  const data: LoaderData = { profile, video, token };
  return json(data);
};

export const action: ActionFunction = async ({ params, request }) => {
  if (!params.videoId) throw new Error("Video not found");

  const form = await request.formData();
  const token = await requireToken(request);
  const assetId = params.videoId;
  const title = form.get("title") as string;

  try {
    await update(token, assetId, title);
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

export default function EditVideoId() {
  const data = useLoaderData<LoaderData>();

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
          </Breadcrumbs>
        </Grid>
        <Grid item md={6}>
          <Paper variant="outlined">
            <Stack spacing={2} p={2} component={Form} method="post">
              <Typography variant="h6">Your clipp</Typography>
              <img src={data.video.posterUrl} alt={data.video.title} />
              <TextField
                label="You clipp's title"
                variant="outlined"
                size="small"
                name="title"
                defaultValue={data.video.title}
              />
              <FormGroup>
                <FormControlLabel disabled control={<Switch />} label="Clipp is private" />
              </FormGroup>
              <Button variant="contained" type="submit">
                Save changes
              </Button>
            </Stack>
          </Paper>
        </Grid>
        <Grid item md={6}>
          <Stack spacing={3}>
            <Paper variant="outlined">
              <Stack spacing={2} p={2}>
                <Typography variant="h6">Your public link</Typography>
                <Typography>
                  Use this link to share your video. Anyone with this link can watch it, unless you
                  mark your clipp as private.
                </Typography>
                <Stack direction="row" spacing={1}>
                  <TextField
                    label="Public link"
                    variant="outlined"
                    size="small"
                    defaultValue={generatePublicUrl(data.video.assetId)}
                    fullWidth
                    disabled
                  />
                  <ClickToCopyButton
                    label="Copy"
                    value={generatePublicUrl(data.video.assetId)}
                    variant="contained"
                  />
                </Stack>
              </Stack>
            </Paper>
            <Paper variant="outlined">
              <Stack spacing={2} p={2}>
                <Typography variant="h6">Privacy settings</Typography>
                <Typography>
                  When your clipp is <b>private</b>, only you can watch it.
                </Typography>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Layout>
  );
}
