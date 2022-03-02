import React, { memo, useEffect } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Video } from "../../models";
import { Header, VideoList, VideoUpload } from "../../components";
import { fetchVideos, selectToken, selectVideos } from "../../reducers";

const Box = styled.div`
  margin: 2em 0;
`;

const DashboardComponent: React.FC = () => {
  const videos = useAppSelector<Video[]>(selectVideos);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (videos.length) return;
    void dispatch(fetchVideos(token));
  }, [dispatch, token, videos]);

  const onUploaded = () => {
    void dispatch(fetchVideos(token));
  };

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        <Box className="cell">
          <VideoUpload onUploaded={onUploaded} />
        </Box>
        <Box className="cell">
          <VideoList videos={videos} />
        </Box>
      </div>
    </div>
  );
};

export const Dashboard = memo(DashboardComponent);
