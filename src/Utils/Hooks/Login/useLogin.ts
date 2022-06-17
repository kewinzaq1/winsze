import * as React from 'react'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import {useAuth} from '../../../Auth'
import {doc, setDoc} from 'firebase/firestore'
import {LoginActionTypes} from '../../Models/Login/LoginActionTypes'
import {db} from '../../../Firebase'
import {
  initialLoginState,
  loginReducer
} from '../../Reducers/Login/LoginReducer'

export const useLogin = () => {
  const auth = getAuth()
  const {isRegister, status, setIsLoading} = useAuth()
  const [{nickname, email, password, isError, errorMessage}, dispatch] =
    React.useReducer(loginReducer, initialLoginState)

  const handleRegister = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password).then(
      async () => {
        setIsLoading(false)
        if (auth.currentUser) {
          console.log(auth.currentUser)
          await updateProfile(auth.currentUser, {displayName: nickname})
          await addUserToFirestore()
        }
      },
      error => {
        dispatch({
          type: LoginActionTypes.INPUT_ERROR,
          errorMessage: error.message
        })
        setIsLoading(false)
      }
    )
  }

  React.useEffect(() => {
    if (isError) {
      setTimeout(() => {
        dispatch({type: LoginActionTypes.OFF_ERROR})
      }, 5000)
    }
  }, [isError])

  const addUserToFirestore = async () =>
    auth.currentUser &&
    (await setDoc(doc(db, 'users', auth.currentUser.uid), {
      nickname:
        auth.currentUser.displayName ?? auth.currentUser.email?.split('@')[0],
      avatar: auth.currentUser.photoURL ?? null,
      email: auth.currentUser.email,
      registerDate: `${new Date().toISOString()}`,
      id: auth.currentUser.uid
    }))

  const handleLogin = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password).then(
      () => {
        setIsLoading(false)
      },
      error => {
        dispatch({
          type: LoginActionTypes.INPUT_ERROR,
          errorMessage: error.message
        })
        setIsLoading(false)
      }
    )
  }

  return {
    nickname,
    email,
    password,
    isError,
    errorMessage,
    isRegister,
    status,
    setIsLoading,
    dispatch,
    handleRegister,
    handleLogin
  }
}
