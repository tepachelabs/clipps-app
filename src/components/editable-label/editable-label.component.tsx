import React, { useEffect, useRef, useState } from "react";
import { Button, Stack } from "@mui/material";

interface EditableLabel {
  isDisabled?: boolean;
  onCommit?: (editedValue: string) => void;
  value: string;
}

const styleSheet = {
  h1: { display: "inline-block" },
  button: { marginLeft: "8px" },
};

export const EditableLabel: React.FC<EditableLabel> = ({
  isDisabled,
  onCommit,
  value,
}: EditableLabel) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editedValue, setEditedValue] = useState<string>(value);
  const [isEditing, setIsEditing] = useState<boolean>();

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  if (isDisabled) return <h1>{value}</h1>;

  const setEdit = () => {
    setIsEditing(true);
    inputRef?.current?.focus();
  };

  const onSave = () => {
    setIsEditing(false);
    onCommit?.(editedValue);
    setEditedValue(value);
  };

  if (isEditing) {
    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <input
          ref={inputRef}
          type="text"
          value={editedValue}
          disabled={isDisabled}
          onChange={({ target }) => setEditedValue(target.value)}
        />
        <Button onClick={onSave}>Save</Button>
        <Button onClick={() => setIsEditing(false)}>Cancel</Button>
      </Stack>
    );
  }

  return (
    <>
      <h1 style={styleSheet.h1}>{value}</h1>
      <button style={styleSheet.button} onClick={setEdit}>
        edit
      </button>
    </>
  );
};
