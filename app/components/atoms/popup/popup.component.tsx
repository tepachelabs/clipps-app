import { Box, ClickAwayListener, Popper } from "@mui/material";
import React, { useRef } from "react";

interface PopupProps {
  children: React.ReactNode;
  trigger: (togglePopup: () => void) => React.ReactNode;
}

const styles = {
  popper: { zIndex: 1101 },
};

export const Popup: React.FC<PopupProps> = ({ children, trigger }) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | EventTarget>(null);

  const togglePopper = () => {
    setAnchorEl(anchorEl ? null : triggerRef.current);
  };

  return (
    <>
      <Box ref={triggerRef}>{trigger(togglePopper)}</Box>
      <Popper
        id="profile-popper"
        open={!!anchorEl}
        anchorEl={anchorEl as HTMLElement}
        style={styles.popper}
        placement="bottom-end"
      >
        <ClickAwayListener onClickAway={() => togglePopper()}>
          <>{children}</>
        </ClickAwayListener>
      </Popper>
    </>
  );
};
