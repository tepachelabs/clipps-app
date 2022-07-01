import {
  Avatar,
  ButtonBase,
  ClickAwayListener,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";

import type { Profile } from "~/models/profile.model";

import { CircularProgressWithLabel } from "../circular-progress-with-label";

interface ProfileCardProps {
  profile: Profile;
}

const QUOTA_LIMIT_PER_ACCOUNT = 9800000;

const styles = {
  popper: { zIndex: 1101 },
  avatar: { width: 24, height: 24 },
};

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | EventTarget>(null);

  const togglePopper = () => {
    setAnchorEl(anchorEl ? null : cardRef.current);
  };

  const quotaInMb = Math.floor((profile.bytesUsed || 1) / 1000000);
  const progress = (profile.bytesUsed || 1) / QUOTA_LIMIT_PER_ACCOUNT;

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <ButtonBase ref={cardRef} onClick={togglePopper}>
        <Paper variant="outlined">
          <Stack direction="row" spacing={1} py={1} px={2}>
            <Typography color="text.secondary" textAlign="right">
              {profile.username}
            </Typography>
            <Avatar
              alt={profile.username}
              src={profile.avatar}
              sx={styles.avatar}
            >
              {profile.username?.[0]}
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
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              p={3}
            >
              <CircularProgressWithLabel value={progress} size={72} />
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  textAlign="right"
                >
                  Your space:
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  textAlign="right"
                >
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
