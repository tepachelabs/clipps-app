import React, { SyntheticEvent, useCallback } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Button, Toolbar } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated, setToken, setVideos } from "../../reducers";

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
    },
    [dispatch],
  );

  return (
    <AppBar sx={styles.appBar}>
      <Toolbar>
        <Box flexGrow={1} justifyContent="flex-start">
          <Button color="secondary" component={Link} to="/">
            Clipps
          </Button>
        </Box>
        {isAuthenticated ? (
          <>
            <Button color="secondary" component={Link} to="/">
              Dashboard
            </Button>
            {/*<Button color="inherit" component={Link} to="/settings">*/}
            {/*  Settings*/}
            {/*</Button>*/}
            <Button color="secondary" onClick={onSignOut}>
              Sign out
            </Button>
          </>
        ) : (
          <Button color="secondary" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
