import styled from "styled-components";

export const SelectionActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
`;

export const SelectionLabel = styled.span`
  margin-right: 1em;
`;

export const Card = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 0.5em;
  margin-bottom: 2em;
  overflow: hidden;
  position: relative;
`;

export const CardContent = styled.div`
  padding: 0.5em 1em 0;
`;

export const CardImage = styled.img`
  aspect-ratio: 16/9;
  width: 100%;
  background-size: contain;
`;

export const CardActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const CardTitle = styled.h1`
  font-size: 1em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CardCheckbox = styled.input`
  position: absolute;
  top: 0.75em;
  left: 0.75em;
  transform: scale(1.5);
`;
