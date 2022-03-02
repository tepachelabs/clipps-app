import React, { ChangeEvent, ForwardedRef } from "react";
import styled from "styled-components";

interface InputProps {
  className?: string;
  label?: string;
  value?: string;
  type?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  ref?: ForwardedRef<unknown>;
}

const InputComponent: React.FC<InputProps> = ({
  className,
  ref,
  type,
  label,
  onChange,
  disabled,
}: InputProps) => {
  return (
    <div className={className}>
      <label>
        {label}
        <input
          ref={ref as ForwardedRef<HTMLInputElement>}
          type={type}
          onChange={onChange}
          disabled={disabled}
        />
      </label>
    </div>
  );
};

export const Input = styled(
  React.forwardRef((props: InputProps, ref: ForwardedRef<unknown>) => (
    <InputComponent {...props} ref={ref} />
  )),
)``;
