import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface EditableLabelProps {
  isDisabled?: boolean;
  onCommit?: (editedValue: string) => void;
  value: string;
}

export const EditableLabel: React.FC<EditableLabelProps> = ({ isDisabled, onCommit, value }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editedValue, setEditedValue] = useState<string>(value);
  const [isEditing, setIsEditing] = useState<boolean>();

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  if (isDisabled) return <Typography variant="h5">{value}</Typography>;

  const setEdit = () => {
    setIsEditing(true);
    inputRef?.current?.focus();
  };

  const onSave = () => {
    setIsEditing(false);
    onCommit?.(editedValue);
    setEditedValue(value);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {isEditing ? (
        <>
          <TextField
            label="Video's title"
            variant="outlined"
            value={editedValue}
            disabled={isDisabled}
            onChange={({ target }) => setEditedValue(target.value)}
            size="small"
            autoFocus
          />
          <Button variant="outlined" onClick={onSave}>
            Save
          </Button>
          <Button variant="outlined" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h5">{value}</Typography>
          <Button onClick={setEdit}>Edit</Button>
        </>
      )}
    </Stack>
  );
};
