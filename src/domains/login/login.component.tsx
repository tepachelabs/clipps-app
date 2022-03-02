import React, { memo, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../app/hooks";
import { setToken } from "../../reducers";
import { login } from "../../services";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 5em;
`;

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
    <Container className="grid-container">
      <div className="grid-x grid-margin-x">
        <div className="cell small-4 small-offset-4">
          <h1>Login</h1>
          <p>Enter your email/password, or create a new account.</p>
          <form onSubmit={onSubmit}>
            <label>
              E-mail
              <input
                type="email"
                value={email}
                placeholder="alex@clipps.io"
                onChange={({ target }) => setEmail(target.value)}
                autoFocus
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                placeholder="ꞏꞏꞏꞏꞏꞏꞏꞏꞏꞏ"
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
            <input type="submit" className="button" value="Log in" />
          </form>
        </div>
      </div>
    </Container>
  );
};

export const Login = memo(LoginComponent);
