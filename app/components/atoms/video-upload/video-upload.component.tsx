import {
  Alert,
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import { uploadVideo } from "~/api/videos.service";
import { LoadingButton } from "~/components/atoms/loading-button";
import { bytesToHumanReadable } from "~/utils/bytes-to-human-readable";

import { Dropzone } from "./video-upload.styles";

interface VideoUploadProps {
  onUploaded?: () => void;
  token: string;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({
  onUploaded,
  token,
}: VideoUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>();
  const { open, getRootProps, getInputProps } = useDropzone({
    accept: { "video/mp4": [".mp4"] },
    onDrop: (acceptedFiles: File[]) => setFiles(acceptedFiles),
    noClick: true,
    noKeyboard: true,
  });
  const [uploading, setUploading] = useState<boolean>();

  const onUpload = async () => {
    setUploading(true);
    try {
      await Promise.all(files.map((file) => uploadVideo(token, file)));
      onUploaded?.();
      setFiles([]);
      setUploading(false);
    } catch (e) {
      const { message } = e as { message: string };
      setError(message);
      setUploading(false);
    }
  };

  const onDiscard = (fileToDiscard: File) => {
    const filteredFiles = files.filter(
      (file: File) => file.name !== fileToDiscard.name
    );
    setFiles(filteredFiles);
  };

  const onDiscardAll = () => {
    setFiles([]);
    setError("");
  };

  const fileRows = files.map((file: File) => (
    <Box key={file.name} display="inline-block" mr={2} mb={2}>
      <Chip
        label={`${file.name} (${bytesToHumanReadable(file.size)})`}
        variant="outlined"
        onDelete={() => onDiscard(file)}
        disabled={uploading}
      />
    </Box>
  ));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Dropzone {...getRootProps()}>
          <input {...getInputProps()} />
          {uploading ? (
            <>
              <Typography variant="h5" color="text.secondary">
                Uploading your clips...
              </Typography>
              <Typography color="text.secondary">
                Please wait a few mins
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h5" onClick={open} color="text.secondary">
                Drop your clip(s), or <b>browse</b>
              </Typography>
              <Typography color="text.secondary">
                Supported: MP4. Max file size 100MB
              </Typography>
            </>
          )}

          {error && (
            <Alert severity="error">Upgrade to get more space now!</Alert>
          )}

          {!!fileRows.length && (
            <Grid item container xs={12} pt={2}>
              <Grid item xs={12}>
                {fileRows}
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                  <LoadingButton
                    variant="outlined"
                    onClick={onUpload}
                    label="Start upload"
                    isLoading={uploading}
                    disabled={uploading || !!error}
                  />
                  <Button onClick={onDiscardAll} disabled={uploading}>
                    Cancel
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          )}
        </Dropzone>
      </Grid>
    </Grid>
  );
};
