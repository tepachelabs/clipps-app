import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getProfile } from "~/api/profile.service";
import { fetchVideo } from "~/api/videos.service";
import { VideoNotFoundPage } from "~/components/pages/video-not-found.component";
import { WatchPage } from "~/components/pages/watch.component";
import type { Profile, Video } from "~/models";
import { generatePublicUrl } from "~/utils/generate-public-url";
import { getToken } from "~/utils/session.server";

type LoaderData = {
  profile: Profile | null;
  token: string | null;
  video: Video | null;
};

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

  const data: LoaderData = {
    profile,
    video,
    token,
  };
  return json(data);
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
    title: `${data.video.title} - Clipps`,
    description: `Watch now "${data.video.title}". Share your Clipps, without the hassle.`,
    "og:title": data.video.title,
    "og:type": "video.movie",
    "og:url": generatePublicUrl(data.video.assetId),
    "og:image": data.video.posterUrl,
    "og:image:width": "1280",
    "og:image:height": "720",
    "twitter:title": data.video.title,
    "twitter:description": data.video.title,
    "twitter:image": data.video.posterUrl,
    "twitter:card": data.video.posterUrl,
  };
};

export default function VideoId() {
  const data = useLoaderData<LoaderData>();

  if (!data.video) {
    return <VideoNotFoundPage profile={data.profile} />;
  }

  return <WatchPage profile={data.profile} video={data.video} />;
}
