import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export const NotFound: React.FC = () => (
  <Card variant="outlined">
    <CardContent>
      <Typography variant="h2" mb={2}>
        Video deleted!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        The video you’re trying to access doesn’t exist anymore, or the creator decided to not
        longer share it.
      </Typography>
    </CardContent>
  </Card>
);
