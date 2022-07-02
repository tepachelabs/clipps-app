import type { ButtonProps } from "@mui/material";
import { Button, CircularProgress } from "@mui/material";
import React from "react";

interface LoadingButtonProps {
  isLoading?: boolean;
  label: string;
}

export const LoadingButton: React.FC<LoadingButtonProps & ButtonProps> = ({
  isLoading,
  label,
  ...buttonBaseProps
}: LoadingButtonProps & ButtonProps) => {
  return (
    <Button disabled={isLoading} {...buttonBaseProps}>
      {isLoading && <CircularProgress size={24} />}
      {!isLoading && label}
    </Button>
  );
};
