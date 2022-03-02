import React, { useState } from "react";
import { Video } from "../../models";
import { Link } from "react-router-dom";
import { deleteByAssetId } from "../../services";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchVideos, selectToken } from "../../reducers";
import { Button } from "../button";
import {
  Card,
  CardActions,
  CardCheckbox,
  CardContent,
  CardImage,
  CardTitle,
  SelectionActions,
  SelectionLabel,
} from "./video-list.styles";

interface VideoListProps {
  videos: Video[];
}

const getThumbUrl = (videoUrl: string) => videoUrl.replace(/\.(mp4|mov)$/, ".jpg");

export const VideoList: React.FC<VideoListProps> = ({ videos }: VideoListProps) => {
  const [selection, setSelection] = useState<Video[]>([]);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  const onDelete = (video: Video) => {
    if (window.confirm(`Do you really want to delete ${video.title}?`)) {
      void deleteByAssetId(token, video.asset_id).then(() => {
        void dispatch(fetchVideos(token));
      });
    }
  };

  const onSelect = (video: Video, checked: boolean) => {
    if (checked) {
      setSelection([...selection, video]);
    } else {
      const filtered = selection.filter((current) => current.asset_id !== video.asset_id);
      setSelection(filtered);
    }
  };

  const onSelectAll = () => setSelection(videos);

  const onClearSelection = () => setSelection([]);

  const onBulkDelete = async () => {
    if (window.confirm(`Do you really want to delete the selected ${selection.length} videos?`)) {
      await Promise.all(selection.map((video) => deleteByAssetId(token, video.asset_id)));
      void dispatch(fetchVideos(token));
      setSelection([]);
    }
  };

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        {!!selection.length && (
          <Card className="cell callout">
            <SelectionActions className="button-group">
              <SelectionLabel>Selected {selection.length} item(s).</SelectionLabel>
              <Button label="Select all" onClick={onSelectAll} />
              <Button className="warning" label="Clear selection" onClick={onClearSelection} />
              <Button className="alert" label="Delete videos" onClick={onBulkDelete} />
            </SelectionActions>
          </Card>
        )}
        {videos.map((video: Video) => (
          <Card key={video.title} className="cell medium-4 large-3">
            <CardCheckbox
              type="checkbox"
              checked={!!selection.find((current) => current.asset_id === video.asset_id)}
              onChange={({ target }) => onSelect(video, target.checked)}
            />
            <Link to={`/w/${video.asset_id}`}>
              <CardImage
                className="card-img"
                src={getThumbUrl(video.secure_url)}
                alt={video.title}
              />
            </Link>
            <CardContent>
              <Link to={`/w/${video.asset_id}`}>
                <CardTitle>{video.title}</CardTitle>
              </Link>
              <CardActions className="button-group">
                <Button label="Copy Link" />
                <Button className="alert" label="Delete" onClick={() => onDelete(video)} />
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
