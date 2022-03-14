import React, { memo, SyntheticEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Box, Container, Grid, Link as MuiLink, TextField, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated, setToken } from "../../reducers";
import { login } from "../../services";
import { LoadingButton } from "../../components/loading-button";

const styles = {
  box: { marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" },
  button: { mt: 3, mb: 2 },
  form: { mt: 1 },
};

const LoginComponent: React.FC = () => {
  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setToken(""));
      setMessage("You were signed out. Please log in again.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    void login({ email, password })
      .then(({ data }) => {
        dispatch(setToken(data.token));
        navigate("/", { replace: true });
      })
      .catch(() => {
        setError("User does not exist or email/password combination is wrong.");
        setIsLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={styles.box}>
        <Typography component="h1" variant="h3">
          Login
        </Typography>
      </Box>
      <Box component="form" onSubmit={onSubmit} noValidate sx={styles.form}>
        {message && <Alert severity="info">{message}</Alert>}
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
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
        {error && <Alert severity="error">{error}</Alert>}
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={styles.button}
          isLoading={isLoading}
          label="Sign In"
          disabled={!email || !password}
        />
        <Grid container>
          <Grid item>
            <MuiLink component={Link} to="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </MuiLink>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export const Login = memo(LoginComponent);
