import React, { memo, SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";

import { useAppDispatch } from "../../app/hooks";
import { setToken } from "../../reducers";
import { login, register } from "../../services";
import { Copyright } from "../../components";

const styles = {
  box: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: { mt: 3, mb: 2 },
  copyright: { mt: 8, mb: 4 },
};

const RegisterComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) return;

    void register({ email, password, confirmPassword }).then(({ data }) => {
      dispatch(setToken(data.token));
      navigate("/", { replace: true });
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={styles.box}>
        <Typography component="h1" variant="h3">
          Register
        </Typography>
      </Box>
      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={({ target }) => setEmail(target.value)}
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
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm password"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
        />
        <Button type="submit" fullWidth variant="contained" sx={styles.button}>
          Sign Up
        </Button>
        <Grid container>
          <Grid item>
            <MuiLink component={Link} to="/login" variant="body2">
              Return to login
            </MuiLink>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={styles.copyright} />
    </Container>
  );
};

export const Register = memo(RegisterComponent);
