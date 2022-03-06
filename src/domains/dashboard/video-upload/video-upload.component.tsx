import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";

import { bytesToSize } from "../../../app/utils";
import { useAppSelector } from "../../../app/hooks";
import { create } from "../../../services";
import { selectToken } from "../../../reducers";

import { Dropzone } from "./video-upload.styles";

interface VideoUploadProps {
  onUploaded?: () => void;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({ onUploaded }: VideoUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { open, getRootProps, getInputProps } = useDropzone({
    accept: "video/mp4",
    onDrop: (acceptedFiles: File[]) => setFiles(acceptedFiles),
    noClick: true,
    noKeyboard: true,
  });
  const [uploading, setUploading] = useState<boolean>();
  const token = useAppSelector(selectToken);

  const onUpload = async () => {
    setUploading(true);
    await Promise.all(files.map((file) => create(token, file)));
    onUploaded?.();
    setFiles([]);
    setUploading(false);
  };

  const onDiscard = (fileToDiscard: File) => {
    const filteredFiles = files.filter((file: File) => file.name !== fileToDiscard.name);
    setFiles(filteredFiles);
  };

  const fileRows = files.map((file: File) => (
    <Box key={file.name} display="inline-block" mr={2} mb={2}>
      <Chip
        label={`${file.name} (${bytesToSize(file.size)})`}
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
              <Typography color="text.secondary">Please wait a few mins</Typography>
            </>
          ) : (
            <>
              <Typography variant="h5" onClick={open} color="text.secondary">
                Drop your clip(s), or <b>browse</b>
              </Typography>
              <Typography color="text.secondary">Supported: MP4. Max file size 100MB</Typography>
            </>
          )}

          {!!fileRows.length && (
            <Grid item container xs={12} pt={2}>
              <Grid item xs={12}>
                {fileRows}
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" onClick={onUpload} disabled={uploading}>
                  Start upload
                </Button>
              </Grid>
            </Grid>
          )}
        </Dropzone>
      </Grid>
    </Grid>
  );
};
