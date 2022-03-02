import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Video } from "../../models";
import { getByAssetId, update } from "../../services";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchVideos, selectIsAuthenticated, selectToken } from "../../reducers";
import { EditableLabel } from "../../components";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 1em;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #eee;
  width: 80%;
  padding-bottom: 2em;
`;

const VideoPlayer = styled.video`
  background: #333;
  max-height: 600px;
  width: 80%;
`;

const WatchComponent: React.FC = () => {
  const { assetId } = useParams<"assetId">();
  const [video, setVideo] = useState<Video>();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchVideo() {
      if (!assetId) return;
      const { data } = await getByAssetId(assetId);
      setVideo(data);
    }
    void fetchVideo();
  }, [assetId]);

  if (!video) return null;

  const onTitleUpdate = async (editedValue: string) => {
    if (!isAuthenticated || !assetId) return;

    const { data } = await update(token, assetId, editedValue);
    setVideo(data);
    void dispatch(fetchVideos(token));
  };

  const date = new Date(video.created_at);

  return (
    <Container className="grid-container">
      <div className="grid-x grid-margin-x">
        <div className="cell text-center">
          <div className="cell">
            <VideoPlayer controls src={video.secure_url} />
          </div>
          <div className="cell">
            <EditableLabel
              value={video.title}
              onCommit={onTitleUpdate}
              isDisabled={!isAuthenticated}
            />
            <Meta className="float-center">
              <span>Uploaded: {date.toDateString()}</span>
              <span>Duration: {video.duration}s</span>
            </Meta>
          </div>
        </div>
      </div>
    </Container>
  );
};

export const Watch = memo(WatchComponent);
