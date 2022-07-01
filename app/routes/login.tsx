import {
  Alert,
  Box,
  Button,
  Container,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { ActionFunction } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";

import { login } from "~/api/auth.service";
import { PATHS } from "~/constants";
import { createUserSession } from "~/utils/session.server";

type ActionData = {
  error?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  const response = await login({ email, password });

  if (response.error) {
    return { error: response.error };
  }

  return createUserSession(response.token as string, PATHS.DASHBOARD);
};

export const meta: MetaFunction = () => ({
  title: "Login - Clipps",
  description:
    "Share your Clipps, without the hassle. Clipps is the easiest way to share short videos. Join the community for free now!",
  "og:title": "Clipps",
  "og:type": "video.movie",
  "og:url": "https://clipps.io/",
  // "og:image": data.video.posterUrl,
  // "og:image:width": "1280",
  // "og:image:height": "720",
  "twitter:title": "Clipps",
  "twitter:description":
    "Share your Clipps, without the hassle. Clipps is the easiest way to share short videos. Join the community for free now!",
  // "twitter:image": data.video.posterUrl,
  // "twitter:card": data.video.posterUrl,
});

const styles = {
  box: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: { mt: 3, mb: 2 },
  form: { mt: 1 },
};

export default function Index() {
  const actionData = useActionData<ActionData>();

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={styles.box}>
        <Typography component="h1" variant="h3">
          Login
        </Typography>
      </Box>

      <Box component={Form} sx={styles.form} method="post">
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button type="submit" fullWidth variant="contained" sx={styles.button}>
          Sign In
        </Button>

        {actionData?.error && <Alert severity="error">{actionData?.error}</Alert>}
      </Box>

      <Stack>
        <MuiLink component={Link} to={PATHS.REGISTER} variant="body2">
          {"Don't have an account? Sign up"}
        </MuiLink>
        <MuiLink component={Link} to={PATHS.HOME} variant="body2">
          Go back to home
        </MuiLink>
      </Stack>
    </Container>
  );
}
