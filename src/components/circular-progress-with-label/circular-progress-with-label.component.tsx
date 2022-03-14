import React from "react";
import { Box, CircularProgress, CircularProgressProps, Typography } from "@mui/material";

interface CircularProgressWithLabelProps {
  value: number;
}

const styles = {
  container: { position: "relative", display: "inline-flex" },
  label: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export const CircularProgressWithLabel: React.FC<
  CircularProgressWithLabelProps & CircularProgressProps
> = ({
  value,
  ...circularProgressProps
}: CircularProgressWithLabelProps & CircularProgressProps) => {
  return (
    <Box sx={styles.container}>
      <CircularProgress variant="determinate" value={value} {...circularProgressProps} />
      <Box sx={styles.label}>
        <Typography variant="body1" component="div" color="text.secondary">
          {Math.round(value)}%
        </Typography>
      </Box>
    </Box>
  );
};
