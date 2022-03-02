import React, { SyntheticEvent, useCallback } from "react";
import { Link as LinkTo } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated, setToken, setVideos } from "../../reducers";
import { Container, Link, NavAnchor, Ul } from "./header.styles";

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
    <Container className="top-bar">
      <div className="top-bar-left">
        <LinkTo to="/">Clipps</LinkTo>
      </div>
      <div className="top-bar-right">
        <Ul className="menu">
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              {/*<li>*/}
              {/*  <Link to="/settings">Settings</Link>*/}
              {/*</li>*/}
              <li>
                <NavAnchor href="#" onClick={onSignOut}>
                  Sign out
                </NavAnchor>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Upload your clip now!</Link>
              </li>
              <li>
                <Link to="/login">Log in</Link>
              </li>
            </>
          )}
        </Ul>
      </div>
    </Container>
  );
};
