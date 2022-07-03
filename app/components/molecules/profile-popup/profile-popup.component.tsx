import { Avatar, ButtonBase, Paper, Stack, Typography } from "@mui/material";
import React from "react";

import { CircularProgressWithLabel } from "~/components/atoms/circular-progress-with-label";
import { Popup } from "~/components/atoms/popup";
import type { Profile } from "~/models";

interface ProfilePopupProps {
  profile: Profile;
}

const QUOTA_LIMIT_PER_ACCOUNT = 9800000;

const styles = {
  avatar: { width: 24, height: 24 },
};

export const ProfilePopup: React.FC<ProfilePopupProps> = ({ profile }) => {
  const quotaInMb = Math.floor((profile.bytesUsed || 1) / 1000000);
  const progress = (profile.bytesUsed || 1) / QUOTA_LIMIT_PER_ACCOUNT;

  return (
    <Popup
      trigger={(togglePopup) => (
        <ButtonBase onClick={togglePopup}>
          <Paper variant="outlined">
            <Stack direction="row" spacing={1} py={1} px={2}>
              <Typography color="text.secondary" textAlign="right">
                {profile.username}
              </Typography>
              <Avatar alt={profile.username} src={profile.avatar} sx={styles.avatar}>
                {profile.username?.[0]}
              </Avatar>
            </Stack>
          </Paper>
        </ButtonBase>
      )}
    >
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
    </Popup>
  );
};
