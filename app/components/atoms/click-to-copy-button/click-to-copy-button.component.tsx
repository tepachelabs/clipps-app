/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface ClickToCopyButtonProps {
  label: string;
  value: string;
  variant?: "contained" | "outlined" | "text";
}

export const ClickToCopyButton: React.FC<ClickToCopyButtonProps> = ({
  label,
  value,
  variant,
}: ClickToCopyButtonProps) => {
  const timerRef = useRef(null);
  const [btnLabel, setBtnLabel] = useState<string>(label);

  const onShareClick = () => {
    void navigator.clipboard.writeText(value).then(() => {
      setBtnLabel("Copied!");
      // @ts-ignore
      timerRef.current = setTimeout(() => {
        setBtnLabel(label);
      }, 2000);
    });
  };

  useEffect(() => {
    // @ts-ignore
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <Button variant={variant} onClick={onShareClick}>
      {btnLabel}
    </Button>
  );
};
