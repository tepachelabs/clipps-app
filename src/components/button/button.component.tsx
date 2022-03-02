import React from "react";
import styled from "styled-components";

interface ButtonProps {
  className?: string;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ButtonComponent = styled.button`
  border-radius: 0.5em;
  margin: 0;
`;

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  className = "",
}: ButtonProps) => {
  return (
    <ButtonComponent onClick={onClick} disabled={disabled} className={`${className} button`}>
      {label}
    </ButtonComponent>
  );
};
