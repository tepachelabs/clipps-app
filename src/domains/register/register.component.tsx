import React, { memo, SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Box, Container, Grid, Link as MuiLink, TextField, Typography } from "@mui/material";

import { useAppDispatch } from "../../app/hooks";
import { setToken } from "../../reducers";
import { register } from "../../services";
import { LoadingButton } from "../../components/loading-button";

const styles = {
  box: { marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" },
  button: { mt: 3, mb: 2 },
  form: { mt: 1 },
};

const RegisterComponent: React.FC = () => {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Password and password confirmation does not match");
      setIsLoading(false);
      return;
    }

    void register({ email, password, confirmPassword })
      .then(({ data }) => {
        dispatch(setToken(data.token));
        navigate("/", { replace: true });
      })
      .catch(() => {
        setError("Can't register user, already exists?");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={styles.box}>
        <Typography component="h1" variant="h3">
          Register
        </Typography>
      </Box>
      <Box component="form" onSubmit={onSubmit} noValidate sx={styles.form}>
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
        {error && <Alert severity="error">{error}</Alert>}
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={styles.button}
          isLoading={isLoading}
          label="Sign Up"
          disabled={!email || !password || !confirmPassword}
        />
        <Grid container>
          <Grid item>
            <MuiLink component={Link} to="/login" variant="body2">
              Return to login
            </MuiLink>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export const Register = memo(RegisterComponent);
