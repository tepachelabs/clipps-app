import { Box, Menu, MenuItem } from "@mui/material";
import React from "react";

interface ContextualMenuItems {
  label: string;
  callback: () => void;
}

interface ContextualMenuProps {
  children: (handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void) => React.ReactNode;
  items: ContextualMenuItems[];
}

export const ContextualMenu: React.FC<ContextualMenuProps> = ({ children, items }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>{children(handleClick)}</Box>
      <Menu
        id="contextual-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {items.map((item) => (
          <MenuItem key={item.label} onClick={item.callback}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
