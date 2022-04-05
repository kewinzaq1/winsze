/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {css, jsx} from '@emotion/react'
import React, {useReducer} from 'react'
import unauthData from '../unauth.json'
import {
  loginReducer,
  initialState,
  inputEmail,
  inputLogin,
  inputPassword,
  setError,
} from './index'
import {
  FormGroup,
  Typography,
  FormLabel,
  Input,
  Button,
  Alert,
} from '@mui/material'
import styled from '@emotion/styled'
import {Send} from '@mui/icons-material'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import {useAuth} from '../../Auth'
import {baseFlex, mobileBreakpoint, myBlue} from '../layout'
import {useOverflowHidden} from '../../Utils/hooks'
import {AnimatePresence, motion} from 'framer-motion'

// TODO => username => nickname and merge this logic for /login/index
export const Login = e => {
  const auth = getAuth()
  const {isRegister, status, setIsLoading} = useAuth()
  const [state, dispatch] = useReducer(loginReducer, initialState)
  const {login, email, password, isError, errorMessage} = state
  const {[status]: filedData} = unauthData

  const handleRegister = e => {
    e.preventDefault()
    setIsLoading(true)

    createUserWithEmailAndPassword(auth, email, password).then(
      async success => {
        setIsLoading(false)
        await updateProfile(auth.currentUser, {displayName: login})
      },
      error => {
        setError(dispatch, error.message)
        setIsLoading(false)
      },
    )
  }

  const handleLogin = e => {
    e.preventDefault()
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password).then(
      success => {
        setIsLoading(false)
      },
      error => {
        setError(dispatch, error.message)
        setIsLoading(false)
      },
    )
  }

  useOverflowHidden()

  return (
    <LoginWrapper>
      <Form onSubmit={isRegister ? handleRegister : handleLogin} method="post">
        <AnimatePresence initial={true}>
          <motion.div
            key="modal"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            <FormGroup>
              <FormGroup>
                <Typography variant="h2" component="h1">
                  {filedData?.title}
                </Typography>
                <Typography variant="subtitle1" component="h2">
                  {filedData?.subtitle}
                </Typography>
                {isError && <Alert severity="error">{errorMessage}</Alert>}
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="email">email</FormLabel>
                <Input
                  id="email"
                  name="email"
                  placeholder="example@some.ex"
                  value={email}
                  onChange={({target}) => inputEmail(dispatch, target.value)}
                ></Input>
              </FormGroup>
              {isRegister && (
                <FormGroup>
                  <FormLabel htmlFor="nickname">nickname</FormLabel>
                  <Input
                    type="text"
                    id="nickname"
                    name="nickname"
                    placeholder="eg. fancyplayer1992"
                    value={login}
                    onChange={({target}) => inputLogin(dispatch, target.value)}
                  ></Input>
                </FormGroup>
              )}

              <FormGroup>
                <FormLabel htmlFor="password">password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="eg. i<3React"
                  value={password}
                  onChange={({target}) => inputPassword(dispatch, target.value)}
                ></Input>
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
                  {filedData?.btnText}
                </Button>
              </FormActions>
            </FormGroup>
          </motion.div>
        </AnimatePresence>
      </Form>
      <FormWallpaper />
    </LoginWrapper>
  )
}

const LoginWrapper = styled.main`
  ${baseFlex}
  margin: 0 auto;
  height: 100vh
  width: 100%;
  justify-content: center;
  span {
    color: ${myBlue};
  }
`

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
`

const FormActions = styled(FormGroup)`
  margin-top: 2rem;
  gap: 0.5rem;
`

const FormWallpaper = styled.div`
  width: 50%;
  min-height: 100vh;
  background-image: url('assets/login.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  @media (max-width: ${mobileBreakpoint}) {
    display: none;
  }
`
