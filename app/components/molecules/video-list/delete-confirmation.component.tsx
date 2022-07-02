import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface DeleteConfirmationProps {
  isOpen: boolean;
  items: unknown[];
  onAccept?: () => void;
  onCancel?: () => void;
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  isOpen,
  items,
  onAccept,
  onCancel,
}: DeleteConfirmationProps) => {
  const title =
    items.length > 1
      ? `Do you want to delete these ${items.length} videos?`
      : "Do you want to delete this clip?";

  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your file{items.length > 1 && "s"} will be moved to the trash bin.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onAccept} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
