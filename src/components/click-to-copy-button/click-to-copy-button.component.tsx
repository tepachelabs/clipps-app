/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";

interface ClickToCopyButtonProps {
  label: string;
  value: string;
}

export const ClickToCopyButton: React.FC<ClickToCopyButtonProps> = ({
  label,
  value,
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
    <Button variant="outlined" onClick={onShareClick}>
      {btnLabel}
    </Button>
  );
};
