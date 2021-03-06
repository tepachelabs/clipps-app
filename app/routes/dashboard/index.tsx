import { Badge, Button, Grid } from "@mui/material";
import type { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import React from "react";

import { getProfile } from "~/api/profile.service";
import { deleteByAssetId, fetchVideos } from "~/api/videos.service";
import type { VideoCardProps } from "~/components/atoms/video-card";
import { VideoCard } from "~/components/atoms/video-card";
import { VideoList } from "~/components/molecules/video-list";
import { Layout } from "~/components/organisms/layout";
import { VideoUpload } from "~/components/organisms/video-upload";
import { ACTION, PATHS } from "~/constants";
import type { Profile, Video } from "~/models";
import { logout, requireToken } from "~/utils/session.server";

type LoaderData = {
  profile: Profile | null;
  token: string;
  videos: Video[] | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const token = await requireToken(request);

  try {
    const [profile, videos] = await Promise.all([getProfile(token), fetchVideos(token)]);
    const data: LoaderData = { profile, token, videos };

    return json(data);
  } catch (e) {
    return logout(request);
  }
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const token = await requireToken(request);
  const videoIds = JSON.parse(form.get("videos") as string) as string[];

  switch (form.get("action")) {
    case ACTION.DELETE:
      await Promise.all(videoIds.map((assetId) => deleteByAssetId(token, assetId)));
      return null;
    default:
      throw new Error("Unknown action");
  }
};

const styles = {
  badge: {
    zIndex: 99,
  },
};

export const meta: MetaFunction = () => ({
  title: "Dashboard - Clipps",
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

export default function DashboardIndex() {
  const loaderData = useLoaderData<LoaderData>();
  const fetcher = useFetcher<LoaderData>();

  const data = fetcher.data || loaderData;
  // console.log(data);

  const onUploadComplete = () => {
    fetcher.load("/dashboard?index");
  };

  const onDelete = (videos: Video[]) => {
    const videoIds = videos.map(({ assetId }) => assetId);
    fetcher.submit(
      { action: ACTION.DELETE, videos: JSON.stringify(videoIds) },
      { method: "delete" },
    );
    return Promise.resolve();
  };

  return (
    <Layout profile={data.profile || null}>
      <Grid item container spacing={3} xs={12}>
        <Grid item xs={12}>
          <VideoUpload token={data.token} onUploaded={onUploadComplete} />
        </Grid>
        <Grid item xs={12}>
          <VideoList
            ItemRenderer={({ video, isChecked, onCheck, onDelete }: VideoCardProps) => (
              <VideoCard
                video={video}
                isChecked={isChecked}
                onCheck={onCheck}
                onDelete={onDelete}
              />
            )}
            onDeleteItems={onDelete}
            videos={data.videos || []}
            additionalControls={
              <Badge
                badgeContent={data.profile?.videosInTrash}
                color="primary"
                max={9}
                sx={styles.badge}
              >
                <Button variant="outlined" component={Link} to={PATHS.TRASH}>
                  View trash
                </Button>
              </Badge>
            }
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
