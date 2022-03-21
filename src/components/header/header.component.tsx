import React, { SyntheticEvent, useCallback } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Link as MuiLink, Stack, Toolbar, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated, setProfile, setToken, setVideos } from "../../reducers";

import { ProfileCard } from "./profile.component";
import play from "../../SVG/play.svg";

const styles = {
  appBar: {
    backgroundColor: "#fff",
    borderBottom: "1px solid #eee",
    boxShadow: 0,
  },
};

export const Header: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  const onSignOut = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(setToken(""));
      dispatch(setVideos([]));
      dispatch(setProfile({}));
    },
    [dispatch],
  );

  return (
    <AppBar sx={styles.appBar}>
      <Toolbar>
        <Box flexGrow={1} justifyContent="flex-start">
          <MuiLink variant="h6" underline="hover" component={Link} to="/">
            <Stack direction="row" spacing={1} alignItems="center">
              <img src={play} alt="placeholder" width={32} />
              <Typography variant="h6" color="primary">
                Clipps
              </Typography>
            </Stack>
          </MuiLink>
        </Box>
        {isAuthenticated ? (
          <Stack alignItems="center" direction="row" spacing={4} py={1}>
            <MuiLink underline="hover" component={Link} to="/">
              Dashboard
            </MuiLink>
            {/*<Button color="inherit" component={Link} to="/settings">*/}
            {/*  Settings*/}
            {/*</Button>*/}
            <MuiLink underline="hover" href="#" onClick={onSignOut}>
              Sign out
            </MuiLink>
            <Box mr={2}>
              <ProfileCard />
            </Box>
          </Stack>
        ) : (
          <Stack direction="row" spacing={2} py={1} px={2}>
            <MuiLink underline="hover" component={Link} to="/login">
              Login
            </MuiLink>
            <MuiLink underline="hover" component={Link} to="/register">
              Register
            </MuiLink>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};
