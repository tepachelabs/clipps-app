import React, { memo, useCallback, useEffect, useState } from "react";
import { Alert, Button, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Video } from "../../models";
import {
  fetchProfile,
  fetchVideos,
  selectDeletedVideos,
  selectToken,
  selectVideos,
} from "../../reducers";
import { deleteByAssetId, permanentlyDeleteByAssetId, update } from "../../services";

import { VideoUpload } from "./video-upload";
import { VideoList } from "./video-list";
import { VideoCard, VideoCardDeleted, VideoCardProps } from "./video-card";

const DashboardComponent: React.FC = () => {
  const [showDeleted, setShowDeleted] = useState<boolean>();
  const videos = useAppSelector<Video[]>(selectVideos);
  const deletedVideos = useAppSelector<Video[]>(selectDeletedVideos);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (videos.length) return;
    void dispatch(fetchVideos(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUploaded = () => {
    void dispatch(fetchVideos(token));
  };

  const onToggleList = () => {
    setShowDeleted(!showDeleted);
  };

  const deleteVideos = useCallback(
    async (videos: Video[], callback?: () => void) => {
      await Promise.all(videos.map((video) => deleteByAssetId(token, video.assetId)));
      void dispatch(fetchVideos(token));
      void dispatch(fetchProfile(token));
      callback?.();
    },
    [dispatch, token],
  );

  const permanentlyDeleteVideos = useCallback(
    async (videos: Video[], callback?: () => void) => {
      await Promise.all(videos.map((video) => permanentlyDeleteByAssetId(token, video.assetId)));
      void dispatch(fetchVideos(token));
      void dispatch(fetchProfile(token));
      callback?.();
    },
    [dispatch, token],
  );

  const restoreVideo = useCallback(
    async (video: Video, callback?: () => void) => {
      await update(token, video.assetId, video.title, null);
      void dispatch(fetchVideos(token));
      void dispatch(fetchProfile(token));
      callback?.();
    },
    [dispatch, token],
  );

  return (
    <Grid container spacing={3} pt={4}>
      <Grid item xs={12}>
        <VideoUpload onUploaded={onUploaded} />
      </Grid>

      <Grid item xs={12}>
        {showDeleted ? (
          <VideoList
            additionalControls={
              <Button variant="contained" onClick={onToggleList} startIcon={<DeleteIcon />}>
                Close Trash
              </Button>
            }
            onDeleteItems={permanentlyDeleteVideos}
            ItemRenderer={({ video, isChecked, onCheck, onDelete }: VideoCardProps) => (
              <VideoCardDeleted
                video={video}
                isChecked={isChecked}
                onCheck={onCheck}
                onDelete={onDelete}
                onRestore={restoreVideo}
              />
            )}
            videos={deletedVideos}
          >
            <Alert severity="warning">
              Videos that have been in Trash more than 7 days will be automatically deleted.
            </Alert>
          </VideoList>
        ) : (
          <VideoList
            additionalControls={
              <Button variant="outlined" onClick={onToggleList} startIcon={<DeleteIcon />}>
                View Trash
              </Button>
            }
            onDeleteItems={deleteVideos}
            ItemRenderer={({ video, isChecked, onCheck, onDelete }: VideoCardProps) => (
              <VideoCard
                video={video}
                isChecked={isChecked}
                onCheck={onCheck}
                onDelete={onDelete}
              />
            )}
            videos={videos}
          />
        )}
      </Grid>
    </Grid>
  );
};

export const Dashboard = memo(DashboardComponent);
