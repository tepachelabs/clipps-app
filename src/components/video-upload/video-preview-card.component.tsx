import React from "react";
import styled from "styled-components";
import { Button } from "../button";

interface VideoPreviewCardProps {
  disabled?: boolean;
  size?: string;
  title?: string;
  onDiscard?: () => void;
}

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 0.5em;
  overflow: hidden;
  margin-bottom: 1.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardContent = styled.div`
  padding: 0 1em;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.span`
  margin: 0 1em 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
`;
const Size = styled.span`
  white-space: nowrap;
`;

export const VideoPreviewCard: React.FC<VideoPreviewCardProps> = ({
  disabled,
  onDiscard,
  size,
  title,
}: VideoPreviewCardProps) => {
  return (
    <Card className="cell medium-6">
      <CardContent>
        <Title>{title}</Title>
        <Size>({size})</Size>
      </CardContent>
      <Button className="alert" label="Discard" onClick={onDiscard} disabled={disabled} />
    </Card>
  );
};
