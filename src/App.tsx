import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Container, CssBaseline } from "@mui/material";

import { Header, RequireAuth } from "./components";
import { Dashboard, Login, Settings, Watch } from "./domains";

export const App = () => {
  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Header />
      <Box pt={8}>
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
      </Box>
    </Container>
  );
};
