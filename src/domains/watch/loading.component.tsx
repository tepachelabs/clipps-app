import React from "react";

import { Card, CardContent, Skeleton, Typography } from "@mui/material";

export const PlayerLoading: React.FC = () => {
  return (
    <Card variant="outlined">
      <Skeleton animation="wave" variant="rectangular" height={560} width="100%" />
      <CardContent>
        <Typography variant="h5" mb={2}>
          <Skeleton animation="wave" variant="rectangular" width={420} />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Skeleton animation="wave" variant="rectangular" width={320} />
        </Typography>
      </CardContent>
    </Card>
  );
};
