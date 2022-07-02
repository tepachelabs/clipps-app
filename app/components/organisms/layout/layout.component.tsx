import { Container } from "@mui/material";
import React from "react";

import { Header, HeaderWithProfile } from "~/components/molecules/header";
import { Copyright } from "~/components/organisms/copyright";
import type { Profile } from "~/models";

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
        {profile ? <HeaderWithProfile profile={profile} /> : <Header />}
        {children}
      </Container>
      <Copyright />
    </>
  );
};
