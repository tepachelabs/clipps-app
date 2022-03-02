import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import { bytesToSize } from "../../app/utils";
import { useAppSelector } from "../../app/hooks";
import { create } from "../../services";
import { selectToken } from "../../reducers";
import { Box, Container, Dropzone, Subtitle, Title } from "./video-upload.styles";
import { Button } from "../button";
import { VideoPreviewCard } from "./video-preview-card.component";

interface VideoUploadProps {
  onUploaded?: () => void;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({ onUploaded }: VideoUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { open, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
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
    <VideoPreviewCard
      key={file.name}
      title={file.name}
      size={bytesToSize(file.size)}
      onDiscard={() => onDiscard(file)}
      disabled={uploading}
    />
  ));

  return (
    <Container>
      <Dropzone {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        {uploading ? (
          <>
            <Title onClick={open}>Uploading your clips...</Title>
            <Subtitle>Please wait a few mins</Subtitle>
          </>
        ) : (
          <>
            <Title onClick={open}>
              Drop your clip(s), or <b>browse</b>
            </Title>
            <Subtitle>Supported: MP4. Max file size 100MB</Subtitle>
          </>
        )}

        {!!fileRows.length && (
          <Box className="grid-container">
            <div className="grid-x grid-margin-x">{fileRows}</div>
            <Button
              className="float-right"
              onClick={onUpload}
              disabled={uploading}
              label="Start upload"
            />
          </Box>
        )}
      </Dropzone>
    </Container>
  );
};
