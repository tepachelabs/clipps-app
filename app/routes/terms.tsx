import { Typography } from "@mui/material";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Layout } from "~/components/organisms/layout";
import type { Profile } from "~/models";
import { requestProfile } from "~/utils/data-loader";

type LoaderData = {
  profile: Profile | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const profile = await requestProfile(request);
  return json({ profile });
};

export const meta: MetaFunction = () => ({
  title: "Terms of Service - Clipps",
  description: "Terms of Service. Share your Clipps, without the hassle.",
  "og:title": "Terms of Service",
  "og:type": "link",
  "og:url": "https://clipps.io/privacy",
  // "og:image": data.video.posterUrl,
  // "og:image:width": "1280",
  // "og:image:height": "720",
  "twitter:title": "Terms of Service",
  "twitter:description": "Terms of Service",
  // "twitter:image": data.video.posterUrl,
  "twitter:card": "Terms of Service",
});

export default function Terms() {
  const data = useLoaderData<LoaderData>();

  return (
    <Layout profile={data.profile}>
      <Typography>Terms of Service</Typography>
    </Layout>
  );
}
