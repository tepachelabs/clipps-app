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

import { playIcon } from "~/components/atoms/icon";
import { ProfilePopup } from "~/components/molecules/profile-popup";
import { PATHS } from "~/constants";
import type { Profile } from "~/models";

const styles = {
  wrapper: { flexGrow: 1 },
  typography: { textDecoration: "none" },
};

const BaseHeader = ({ children }: { children: React.ReactNode }) => (
  <Grid item>
    <Box sx={styles.wrapper}>
      <AppBar position="fixed" variant="outlined" elevation={0}>
        <Toolbar component={Container} maxWidth="lg">
          <Stack direction="row" spacing={2} alignItems="center" sx={styles.wrapper}>
            <img src={playIcon} alt="placeholder" width={32} />
            <Typography
              variant="h6"
              component={Link}
              to={PATHS.HOME}
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

export const Header = () => (
  <BaseHeader>
    <Stack direction="row" spacing={2}>
      <Button component={Link} color="inherit" to={PATHS.LOGIN}>
        Log in
      </Button>
      <Button variant="outlined" component={Link} to={PATHS.REGISTER}>
        Join for free
      </Button>
    </Stack>
  </BaseHeader>
);

export const HeaderWithProfile = ({ profile }: { profile: Profile }) => (
  <BaseHeader>
    <Stack alignItems="center" direction="row" spacing={4} py={1}>
      <MuiLink color="inherit" underline="hover" component={Link} to={PATHS.DASHBOARD}>
        Dashboard
      </MuiLink>
      {/*<MuiLink color="inherit" underline="hover" component={Link} to="/">*/}
      {/*  Settings*/}
      {/*</MuiLink>*/}
      <form action={PATHS.LOGOUT} method="post">
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
        <ProfilePopup profile={profile} />
      </Box>
    </Stack>
  </BaseHeader>
);
