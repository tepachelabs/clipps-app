import React, { useCallback, useMemo, useState } from "react";
import { Button, Card, Grid, Stack, TextField, Typography } from "@mui/material";

import { Video } from "../../../models";

import { DeleteConfirmation } from "./delete-confirmation.component";
import { Box } from "@mui/material";
import { VideoCardProps } from "../video-card";

interface VideoListProps {
  additionalControls?: JSX.Element;
  children?: JSX.Element;
  ItemRenderer: (props: VideoCardProps) => JSX.Element;
  onDeleteItems?: (videos: Video[], callback?: () => void) => Promise<void>;
  videos: Video[];
}

const getFiltered = (videos: Video[], searchQuery: string): Video[] =>
  videos.filter((video) => video.title.toLowerCase().includes(searchQuery.toLowerCase()));

const styles = {
  additionalControls: { alignSelf: "flex-end" },
};

export const VideoList: React.FC<VideoListProps> = ({
  additionalControls,
  children,
  ItemRenderer,
  onDeleteItems,
  videos,
}: VideoListProps) => {
  const [selection, setSelection] = useState<Video[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [confirmationOpen, setConfirmationOpen] = React.useState<boolean>(false);

  const onSelect = useCallback(
    ({ video, checked }: { video: Video; checked: boolean }) => {
      if (checked) {
        setSelection([...selection, video]);
      } else {
        const filtered = selection.filter((current) => current.assetId !== video.assetId);
        setSelection(filtered);
      }
    },
    [selection],
  );

  const onSelectAll = useCallback(() => setSelection(videos), [videos]);

  const onDelete = useCallback((video: Video) => {
    setSelection([video]);
    setConfirmationOpen(true);
  }, []);

  const onBulkDelete = useCallback(() => {
    setConfirmationOpen(true);
  }, []);

  const onDeleteCancel = useCallback(() => {
    setConfirmationOpen(false);
    setSelection([]);
  }, []);

  const onDeleteAccept = useCallback(async () => {
    await onDeleteItems?.(selection);
    setConfirmationOpen(false);
    setSelection([]);
  }, [onDeleteItems, selection]);

  const onClearSelection = useCallback(() => setSelection([]), []);

  const selectionLabel = useMemo(
    () => (selection.length === 1 ? "Selected 1 item." : `Selected ${selection.length} items.`),
    [selection.length],
  );

  return (
    <Grid container spacing={3}>
      <DeleteConfirmation
        isOpen={confirmationOpen}
        items={selection}
        onAccept={onDeleteAccept}
        onCancel={onDeleteCancel}
      />
      <Grid item xs={12}>
        <Card variant="outlined">
          {selection.length ? (
            <Stack direction="row" spacing={2} alignItems="center" p={1} pl={2} height={56}>
              <Typography gutterBottom={false}>{selectionLabel}</Typography>
              <Button variant="outlined" onClick={onSelectAll}>
                Select all
              </Button>
              <Button variant="outlined" onClick={onClearSelection}>
                Clear selection
              </Button>
              <Button variant="outlined" onClick={onBulkDelete}>
                Delete selected
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2} justifyContent="space-between" p={1}>
              <TextField
                label="Search..."
                variant="outlined"
                size="small"
                onChange={({ target }) => setSearchQuery(target.value)}
              />
              <Box sx={styles.additionalControls}>{additionalControls}</Box>
            </Stack>
          )}
        </Card>
      </Grid>
      {children && (
        <Grid item xs={12}>
          {children}
        </Grid>
      )}
      {getFiltered(videos, searchQuery).map((video: Video) => (
        <ItemRenderer
          key={video.assetId}
          video={video}
          isChecked={!!selection.find((current) => current.assetId === video.assetId)}
          onCheck={onSelect}
          onDelete={() => onDelete(video)}
        />
      ))}
    </Grid>
  );
};
