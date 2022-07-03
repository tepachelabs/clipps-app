import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { formatDistance } from "date-fns";
import React from "react";

import type { Video } from "~/models";

interface WidgetMetadataProps {
  video: Video;
}
export const WidgetMetadata: React.FC<WidgetMetadataProps> = ({ video }) => {
  return (
    <Paper variant="outlined">
      <Stack spacing={2} p={2}>
        <Typography variant="h6">Metadata</Typography>
        <TableContainer>
          <Table aria-label="metadata">
            <TableHead>
              <TableRow>
                <TableCell>Property</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {["title", "duration", "bytes"].map((prop) => {
                const property = prop as keyof Video;
                return (
                  <TableRow key={prop} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {prop}
                    </TableCell>
                    <TableCell align="right">{video[property] as string}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  uploaded
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    {formatDistance(new Date(video.createdAt), new Date(), { addSuffix: true })}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  visibility
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                    {video.isPrivate ? (
                      <>
                        <VisibilityOff fontSize="small" />
                        <Typography>Private</Typography>
                      </>
                    ) : (
                      <>
                        <Visibility fontSize="small" />
                        <Typography>Public</Typography>
                      </>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Paper>
  );
};
