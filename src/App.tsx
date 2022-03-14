import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Container, CssBaseline } from "@mui/material";

import { Copyright, Header, RequireAuth } from "./components";
import { Dashboard, Landing, Login, Register, Settings, Watch } from "./domains";

export const App = () => {
  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Header />
      <Box paddingY={10}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/w/:assetId" element={<Watch />} />
          <Route
            path="/"
            element={
              <RequireAuth fallbackComponent={Landing}>
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
      <Box position="fixed" bottom={0} left={0} width="100%">
        <Copyright />
      </Box>
    </Container>
  );
};
