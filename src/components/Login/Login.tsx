/** @jsxImportSource @emotion/react */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css } from "@emotion/react";
import React from "react";
import { ActionType, initialState, loginReducer } from "./index";
import {
  Alert,
  Button,
  FormGroup,
  FormLabel,
  Input,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { Send } from "@mui/icons-material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db, useAuth } from "../../Auth";
import { baseFlex, mobileBreakpoint, myBlue } from "../Layout";
import { doc, setDoc } from "firebase/firestore";

export const Login = () => {
  const auth = getAuth();
  const { isRegister, status, setIsLoading } = useAuth();
  const [{ nickname, email, password, isError, errorMessage }, dispatch] =
    React.useReducer(loginReducer, initialState);

  const handleRegister = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (setIsLoading) {
      setIsLoading(true);

      createUserWithEmailAndPassword(auth, email, password).then(
        async () => {
          setIsLoading(false);
          if (auth.currentUser) {
            console.log(auth.currentUser);
            await updateProfile(auth.currentUser, { displayName: nickname });
            await addUserToFirestore();
          }
        },
        (error) => {
          dispatch({
            type: ActionType.INPUT_ERROR,
            errorMessage: error.message,
          });
          setIsLoading(false);
        }
      );
    }
  };

  React.useEffect(() => {
    if (isError) {
      setTimeout(() => {
        dispatch({ type: ActionType.OFF_ERROR });
      }, 5000);
    }
  }, [isError]);

  const addUserToFirestore = async () =>
    auth.currentUser &&
    (await setDoc(doc(db, "users", auth.currentUser.uid), {
      nickname:
        auth.currentUser.displayName ?? auth.currentUser.email?.split("@")[0],
      avatar: auth.currentUser.photoURL ?? null,
      email: auth.currentUser.email,
      registerDate: `${new Date().toISOString()}`,
      id: auth.currentUser.uid,
    }));

  const handleLogin = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (setIsLoading) {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password).then(
        () => {
          setIsLoading(false);
        },
        (error) => {
          dispatch({
            type: ActionType.INPUT_ERROR,
            errorMessage: error.message,
          });
          setIsLoading(false);
        }
      );
    }
  };

  return (
    <LoginWrapper>
      <Form onSubmit={isRegister ? handleRegister : handleLogin} method="post">
        <FormGroup>
          <FormGroup>
            <Typography variant="h2" component="h1">
              {status === "register" ? "Nice to Meet You" : "Welcome back"}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {status === "register"
                ? "First time? Create Free Account Now. Its 100% free"
                : "Nice that you are still with us"}
            </Typography>
            {isError && <Alert severity="error">{errorMessage}</Alert>}
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="email">email</FormLabel>
            <Input
              id="email"
              name="email"
              placeholder="eg. kewin@winsze.pl"
              value={email}
              onChange={({ target: { value: email } }) =>
                dispatch({ type: ActionType.INPUT_EMAIL, email })
              }
            />
          </FormGroup>
          {isRegister && (
            <FormGroup>
              <FormLabel htmlFor="nickname">nickname</FormLabel>
              <Input
                type="text"
                id="nickname"
                name="nickname"
                placeholder="Enter your nickname"
                value={nickname}
                onChange={({ target: { value: nickname } }) =>
                  dispatch({ type: ActionType.INPUT_NICKNAME, nickname })
                }
              />
            </FormGroup>
          )}

          <FormGroup>
            <FormLabel htmlFor="password">password</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={({ target: { value: password } }) =>
                dispatch({ type: ActionType.INPUT_PASSWORD, password })
              }
            />
          </FormGroup>
          <FormActions>
            <Button
              type="submit"
              onClick={status === "register" ? handleRegister : handleLogin}
              variant="contained"
              endIcon={
                <Send
                  css={css`
                    fill: white;
                  `}
                />
              }
            >
              {status === "register" ? "register" : "login"}
            </Button>
          </FormActions>
        </FormGroup>
      </Form>
      <FormWallpaper />
    </LoginWrapper>
  );
};

const LoginWrapper = styled.main`
  ${baseFlex};
  margin: 0 auto;
  height: 100vh;
  width: 100%;
  justify-content: center;

  span {
    color: ${myBlue};
  }
`;

const Form = styled.form`
  ${baseFlex};
  flex-direction: column;
  width: 50%;
  height: 100%;
  padding: 2rem;
  align-items: center;
  justify-items: center;

  div:first-of-type {
    gap: 2rem;
    justify-content: center;
    max-width: 700px;
  }

  @media (max-width: ${mobileBreakpoint}) {
    width: 90%;
    padding: 2rem 0;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 100px);
  }
`;

const FormActions = styled(FormGroup)`
  margin-top: 2rem;
  gap: 0.5rem;
`;

const FormWallpaper = styled.div`
  width: 50%;
  min-height: 100vh;
  background-image: url("assets/login.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  @media (max-width: ${mobileBreakpoint}) {
    display: none;
  }
`;
