import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getProfile } from "~/api/profile.service";
import { Layout } from "~/components/organisms/layout.component";
import { LandingPage } from "~/components/pages/landing.component";
import type { Profile } from "~/models/profile.model";
import { getToken } from "~/utils/session.server";

type LoaderData = {
  profile: Profile | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const token = await getToken(request);
  let profile = null;

  if (token) {
    profile = await getProfile(token);
  }

  const data: LoaderData = { profile };
  return json(data);
};

export const meta: MetaFunction = () => ({
  title: "Clipps",
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

export default function Index() {
  const data = useLoaderData<LoaderData>();

  return (
    <Layout profile={data.profile}>
      <LandingPage />
    </Layout>
  );
}
