import { Container } from "@mui/material";
import React from "react";

import { Copyright } from "~/components/atoms/copyright";
import { AnonNav, UserNav } from "~/components/molecules";
import type { Profile } from "~/models/profile.model";

interface PageProps {
  children: React.ReactNode;
  profile: Profile | null;
}

const styles = {
  container: {
    paddingBottom: "4em",
    paddingTop: "5.5em",
    minHeight: "calc(100vh - 3.5em)",
  },
};

export const Layout = ({ children, profile }: PageProps) => {
  return (
    <>
      <Container maxWidth="lg" sx={styles.container}>
        {profile ? <UserNav profile={profile} /> : <AnonNav />}
        {children}
      </Container>
      <Copyright />
    </>
  );
};
