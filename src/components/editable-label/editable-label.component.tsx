import React, { useEffect, useRef, useState } from "react";

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
      <>
        <input
          ref={inputRef}
          type="text"
          value={editedValue}
          disabled={isDisabled}
          onChange={({ target }) => setEditedValue(target.value)}
        />
        <button style={styleSheet.button} onClick={onSave}>
          Ok
        </button>
        <button style={styleSheet.button} onClick={() => setIsEditing(false)}>
          No
        </button>
      </>
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
