import React, { useEffect, useRef } from "react";
import {
  Avatar,
  ButtonBase,
  ClickAwayListener,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProfile, selectProfile, selectToken } from "../../reducers";
import { Profile } from "../../models";
import { CircularProgressWithLabel } from "../circular-progress-with-label";

const QUOTA_LIMIT_PER_ACCOUNT = 9800000;

const styles = {
  popper: { zIndex: 1101 },
  avatar: { width: 24, height: 24 },
};

export const ProfileCard: React.FC = () => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | EventTarget>(null);
  const profile = useAppSelector<Profile | null>(selectProfile);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (profile) return;
    void dispatch(fetchProfile(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!profile) return null;

  const togglePopper = () => {
    setAnchorEl(anchorEl ? null : cardRef.current);
  };

  const quotaInMb = Math.floor((profile?.bytesUsed || 1) / 1000000);
  const progress = (profile?.bytesUsed || 1) / QUOTA_LIMIT_PER_ACCOUNT;

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <ButtonBase ref={cardRef} onClick={togglePopper}>
        <Paper variant="outlined">
          <Stack direction="row" spacing={1} py={1} px={2}>
            <Typography color="text.secondary" textAlign="right">
              {profile?.username}
            </Typography>
            <Avatar alt={profile?.username} src={profile?.avatar} sx={styles.avatar}>
              {profile?.username?.[0]}
            </Avatar>
          </Stack>
        </Paper>
      </ButtonBase>
      <Popper
        id="profile-popper"
        open={!!anchorEl}
        anchorEl={anchorEl as HTMLElement}
        style={styles.popper}
        placement="bottom-end"
      >
        <ClickAwayListener onClickAway={() => togglePopper()}>
          <Paper variant="outlined">
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} p={3}>
              <CircularProgressWithLabel value={progress} size={72} />
              <Stack direction="column" justifyContent="center" alignItems="center">
                <Typography variant="caption" color="text.secondary" textAlign="right">
                  Your space:
                </Typography>
                <Typography variant="caption" color="text.secondary" textAlign="right">
                  Used {quotaInMb}/1000 MB
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Stack>
  );
};
