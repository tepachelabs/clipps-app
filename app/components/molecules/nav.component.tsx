import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Link as MuiLink,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "@remix-run/react";
import React from "react";

import { ProfileCard } from "~/components/atoms/header/profile.component";
import { PATHS } from "~/constants";
import type { Profile } from "~/models/profile.model";
import play from "~/svg/play.svg";

const styles = {
  wrapper: { flexGrow: 1 },
  typography: { textDecoration: "none" },
};

const BaseNav = ({ children }: { children: React.ReactNode }) => (
  <Grid item>
    <Box sx={styles.wrapper}>
      <AppBar position="fixed" variant="outlined" elevation={0}>
        <Toolbar component={Container} maxWidth="lg">
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={styles.wrapper}
          >
            <img src={play} alt="placeholder" width={32} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              color="inherit"
              sx={styles.typography}
            >
              Clipps
            </Typography>
          </Stack>

          {children}
        </Toolbar>
      </AppBar>
    </Box>
  </Grid>
);

export const AnonNav = () => (
  <BaseNav>
    <Button component={Link} color="inherit" to="/login">
      Login
    </Button>
  </BaseNav>
);

export const UserNav = ({ profile }: { profile: Profile }) => (
  <BaseNav>
    <Stack alignItems="center" direction="row" spacing={4} py={1}>
      <MuiLink
        color="inherit"
        underline="hover"
        component={Link}
        to={PATHS.DASHBOARD}
      >
        Dashboard
      </MuiLink>
      {/*<MuiLink color="inherit" underline="hover" component={Link} to="/">*/}
      {/*  Settings*/}
      {/*</MuiLink>*/}
      <form action="/logout" method="post">
        <MuiLink
          component={Button}
          variant="body1"
          color="inherit"
          underline="hover"
          type="submit"
          disableRipple
          sx={{ textTransform: "capitalize" }}
        >
          Logout
        </MuiLink>
      </form>
      <Box mr={2}>
        <ProfileCard profile={profile} />
      </Box>
    </Stack>
  </BaseNav>
);
