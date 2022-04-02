/** @jsxImportSource @emotion/react */
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
// eslint-disable-next-line no-unused-vars
import {css, jsx} from '@emotion/react'
import {Send} from '@mui/icons-material'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'

import {useAuth} from '../../Auth'
import {baseFlex, myBlue} from '../layout'
import {useOverflowHidden} from '../../Utils/hooks'
import {AnimatePresence, motion} from 'framer-motion'

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
        await updateProfile(auth.currentUser, {displayName: login})
        setIsLoading(false)
      },
      error => {
        setError(dispatch, error.message)
        setIsLoading(false)
      },
    )
  }

  // const auth = getAuth()
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
      <Form onSubmit={isRegister ? handleRegister : handleLogin}>
        <AnimatePresence initial={true}>
          <motion.div
            key="modal"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            <FormGroup>
              <FormGroup>
                <Typography variant="h2">{filedData?.title}</Typography>
                <Typography variant="subtitle1">
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
  max-height: calc(100vh - 100px);
  width: 100%;
  height: 100vh;
  justify-content: center;
  span {
    color: ${myBlue};
  }
`

const Form = styled.form`
  width: 50%;
  align-items: flex-start;
  ${baseFlex};
  flex-direction: column;
  height: 100%;
  align-items: flex-start;
  padding: 2rem;
  align-items: center;
  justify-items: center;

  div:first-of-type {
    gap: 2rem;
  }

  @media (max-width: 992px) {
    padding: 2rem 0;
    justify-content: center;
    align-items: center;
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
  @media (max-width: 992px) {
    display: none;
  }
`
