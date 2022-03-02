/* eslint-disable */
import styled from "styled-components";

const getColor = (props: any) => {
  if (props.isDragAccept) {
    return "#413e8b";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

export const Box = styled.div`
  margin: 1em 0;
  width: 100%;
`;

export const Container = styled.section`
  background: #fff;
  border-radius: 1em;
  margin: 0 auto;
  max-width: 50em;
  padding: 0.25em;
  width: 100%;
`;

export const Dropzone = styled.div`
  align-items: center;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  border-radius: 1em;
  border-width: 2px;
  display: flex;
  flex-direction: column;
  margin: 1em;
  padding: 1em;
  transition: border 0.2s ease-in-out;
`;

export const Title = styled.h4`
  font-size: 1.25em;
  margin-bottom: 0;
  &:hover {
    cursor: pointer;
  }
`;

export const Subtitle = styled.p`
  font-size: 0.9em;
  margin-bottom: 0;
`;
