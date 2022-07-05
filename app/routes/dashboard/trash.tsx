import { Alert, Button, Grid, Typography } from "@mui/material";
import type { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import React from "react";

import { getProfile } from "~/api/profile.service";
import { deletePermanentlyByAssetId, fetchDeletedVideos, update } from "~/api/videos.service";
import type { VideoCardProps } from "~/components/atoms/video-card";
import { VideoCardDeleted } from "~/components/atoms/video-card";
import { VideoList } from "~/components/molecules/video-list";
import { Layout } from "~/components/organisms/layout";
import { ACTION, PATHS } from "~/constants";
import type { Profile, Video } from "~/models";
import { requireToken } from "~/utils/session.server";

type LoaderData = {
  profile: Profile | null;
  token: string;
  videos: Video[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const token = await requireToken(request);
  const [videos, profile] = await Promise.all([fetchDeletedVideos(token), getProfile(token)]);

  const data: LoaderData = {
    profile,
    token,
    videos,
  };
  return json(data);
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const token = await requireToken(request);
  const videoIds = JSON.parse(form.get("videos") as string) as string[];

  switch (form.get("action")) {
    case ACTION.DELETE:
      await Promise.all(videoIds.map((assetId) => deletePermanentlyByAssetId(token, assetId)));
      return null;
    case ACTION.PATCH:
      await Promise.all(
        videoIds.map((assetId) => update(token, assetId, undefined, undefined, null)),
      );
      return null;
    default:
      throw new Error("Unknown action");
  }
};

export const meta: MetaFunction = () => ({
  title: "Your trash bin - Clipps",
  description:
    "Share your Clipps, without the hassle. Clipps is the easiest way to share short videos. Join the community for free now!",
  "og:title": "Clipps",
  "og:type": "video.movie",
  "og:url": "https://clipps.io/",
  // "og:image": data.video.posterUrl,
  // "og:image:width": "1280",
  // "og:image:height": "720",
  "twitter:title": "Clipps",
  "twitter:description":
    "Share your Clipps, without the hassle. Clipps is the easiest way to share short videos. Join the community for free now!",
  // "twitter:image": data.video.posterUrl,
  // "twitter:card": data.video.posterUrl,
});

export default function DashboardTrash() {
  const loaderData = useLoaderData<LoaderData>();
  const fetcher = useFetcher<LoaderData>();

  const data = fetcher.data || loaderData;

  const onDelete = (videos: Video[]) => {
    const videoIds = videos.map(({ assetId }) => assetId);
    fetcher.submit(
      { action: ACTION.DELETE, videos: JSON.stringify(videoIds) },
      { method: "delete" },
    );
    return Promise.resolve();
  };

  const onRestore = (video: Video) => {
    fetcher.submit(
      { action: ACTION.PATCH, videos: JSON.stringify([video.assetId]) },
      { method: "post" },
    );
    return Promise.resolve();
  };

  return (
    <Layout profile={data.profile}>
      <Grid item container spacing={3} xs={12}>
        <Grid item xs={12}>
          <Typography variant="h4">Your trash bin</Typography>
        </Grid>
        <Grid item xs={12}>
          <VideoList
            ItemRenderer={({ video, isChecked, onCheck, onDelete }: VideoCardProps) => (
              <VideoCardDeleted
                video={video}
                isChecked={isChecked}
                onCheck={onCheck}
                onDelete={onDelete}
                onRestore={onRestore}
              />
            )}
            onDeleteItems={onDelete}
            videos={data.videos}
            additionalControls={
              <Button variant="outlined" component={Link} to={PATHS.DASHBOARD}>
                Back to dashboard
              </Button>
            }
            onDeleteDescription="You are about to permanently delete this selection."
          >
            <Alert severity="warning">
              Your clipps in the trash bin will be deleted in <b>7 days</b> unless you move them
              back to your dashboard. Use the{" "}
              <Button variant="outlined" size="small">
                Restore
              </Button>{" "}
              button for this.
            </Alert>
          </VideoList>
        </Grid>
      </Grid>
    </Layout>
  );
}
