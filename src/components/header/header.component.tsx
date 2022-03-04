import React, { SyntheticEvent, useCallback } from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated, setToken, setVideos } from "../../reducers";

const styles = {
  title: { flexGrow: 1 },
};

export const Header: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  const onSignOut = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(setToken(""));
      dispatch(setVideos([]));
    },
    [dispatch],
  );

  return (
    <AppBar sx={{ boxShadow: "none" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={styles.title}>
          Clipps
        </Typography>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/">
              Dashboard
            </Button>
            {/*<Button color="inherit" component={Link} to="/settings">*/}
            {/*  Settings*/}
            {/*</Button>*/}
            <Button color="inherit" onClick={onSignOut}>
              Sign out
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
