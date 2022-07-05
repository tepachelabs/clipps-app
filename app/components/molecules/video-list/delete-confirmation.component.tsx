import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useMemo } from "react";

interface DeleteConfirmationProps {
  isOpen: boolean;
  items: unknown[];
  onAccept?: () => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  isOpen,
  items,
  onAccept,
  onCancel,
  title,
  description,
}: DeleteConfirmationProps) => {
  const defaultTitle = useMemo(
    () =>
      items.length > 1
        ? `Do you want to delete these ${items.length} videos?`
        : "Do you want to delete this clip?",
    [items.length],
  );
  const defaultDescription = useMemo(
    () => `Your ${items.length > 1 ? "files" : "file"} will be moved to the trash bin.`,
    [items.length],
  );

  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle id="alert-dialog-title">{title || defaultTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description || defaultDescription}
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
