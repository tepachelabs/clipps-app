import { styled } from "@mui/material";

interface GetColorProps {
  isDragAccept: boolean;
  isDragReject: boolean;
  isFocused: boolean;
}

const getColor = (props: GetColorProps) => {
  if (props.isDragAccept) {
    return "#413e8b";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#ddd";
};

export const Dropzone = styled("div")`
  align-items: center;
  border-color: ${(props: GetColorProps) => getColor(props)};
  border-style: dashed;
  border-radius: 1em;
  border-width: 1px;
  display: flex;
  flex-direction: column;
  padding: 1em;
  transition: border 0.2s ease-in-out;
  width: 100%;
`;
