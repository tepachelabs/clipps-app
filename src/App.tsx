import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import { Header, RequireAuth } from "./components";
import { Dashboard, Login, Settings, Watch } from "./domains";

export const Container = styled.nav`
  background: #f8f8f8;
  min-height: 100vh;
`;

export const App = () => {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/w/:assetId" element={<Watch />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
      </Routes>
    </Container>
  );
};
