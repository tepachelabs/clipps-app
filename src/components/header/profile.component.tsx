import React, { useEffect } from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProfile, selectProfile, selectToken } from "../../reducers";
import { Profile } from "../../models";

export const ProfileCard: React.FC = () => {
  const profile = useAppSelector<Profile | null>(selectProfile);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (profile) return;
    void dispatch(fetchProfile(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!profile) return null;

  const quotaInMb = Math.floor((profile?.bytesUsed || 1) / 1000000);

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box>
        <Typography color="text.secondary" textAlign="right">
          {profile?.username}
        </Typography>
        <Typography color="text.secondary" textAlign="right">
          {quotaInMb}/1000 MB used
        </Typography>
      </Box>
      <Avatar alt={profile?.username} src={profile?.avatar}>
        {profile?.username?.[0]}
      </Avatar>
    </Stack>
  );
};
