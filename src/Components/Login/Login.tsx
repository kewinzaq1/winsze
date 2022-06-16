/** @jsxImportSource @emotion/react */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {css} from '@emotion/react'
import {
  Alert,
  Button,
  FormGroup,
  FormLabel,
  Input,
  Typography
} from '@mui/material'
import {Send} from '@mui/icons-material'
import {LoginActionTypes} from '../../Utils/Models/Login/Login.model'
import {useLogin} from '../../Utils/Hooks/Login/useLogin'
import {Form, FormActions, FormWallpaper, LoginWrapper} from './LoginStyles'

export const Login = () => {
  const {
    nickname,
    email,
    password,
    isError,
    errorMessage,
    isRegister,
    status,
    dispatch,
    handleRegister,
    handleLogin
  } = useLogin()

  return (
    <LoginWrapper>
      <Form onSubmit={isRegister ? handleRegister : handleLogin} method="post">
        <FormGroup>
          <FormGroup>
            <Typography variant="h2" component="h1">
              {status === 'register' ? 'Nice to Meet You' : 'Welcome back'}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {status === 'register'
                ? 'First time? Create Free Account Now. Its 100% free'
                : 'Nice that you are still with us'}
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
              onChange={({target: {value: email}}) =>
                dispatch({type: LoginActionTypes.INPUT_EMAIL, email})
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
                onChange={({target: {value: nickname}}) =>
                  dispatch({type: LoginActionTypes.INPUT_NICKNAME, nickname})
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
              onChange={({target: {value: password}}) =>
                dispatch({type: LoginActionTypes.INPUT_PASSWORD, password})
              }
            />
          </FormGroup>
          <FormActions>
            <Button
              type="submit"
              onClick={status === 'register' ? handleRegister : handleLogin}
              variant="contained"
              endIcon={
                <Send
                  css={css`
                    fill: white;
                  `}
                />
              }
            >
              {status === 'register' ? 'register' : 'login'}
            </Button>
          </FormActions>
        </FormGroup>
      </Form>
      <FormWallpaper />
    </LoginWrapper>
  )
}
