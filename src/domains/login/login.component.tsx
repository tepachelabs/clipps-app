import React, { memo, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";

import { useAppDispatch } from "../../app/hooks";
import { setToken } from "../../reducers";
import { login } from "../../services";
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

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    void login({ email, password }).then(({ data }) => {
      dispatch(setToken(data.token));
      navigate("/", { replace: true });
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={styles.box}>
        <Typography component="h1" variant="h3">
          Login
        </Typography>
      </Box>
      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
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
        <Button type="submit" fullWidth variant="contained" sx={styles.button}>
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={styles.copyright} />
    </Container>
  );
};

export const Login = memo(LoginComponent);
