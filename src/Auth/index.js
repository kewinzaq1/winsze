import React from 'react'
import {useContext, createContext, useState} from 'react'
import {initializeApp} from 'firebase/app'
import {connectStorageEmulator, getStorage} from 'firebase/storage'
import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore'
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  connectAuthEmulator,
} from 'firebase/auth'
import {useEffect} from 'react'
import {useLocalStorageState} from '../Utils/hooks'
import {useNavigate} from 'react-router-dom'

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  databaseURL: 'https://winsze-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'winsze',
  storageBucket: 'winsze.appspot.com',
  messagingSenderId: '564098727958',
  appId: '1:564098727958:web:3951cf9519225ec0043537',
}
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const AuthContext = createContext()
export const db = getFirestore(app)

// connectAuthEmulator(auth, 'http://localhost:1111')
// connectFirestoreEmulator(db, 'localhost', 1112)
// connectStorageEmulator(storage, 'localhost', 1113)

export const AuthProvider = ({initUser, children} = {}) => {
  const [user, setUser] = useLocalStorageState('user', initUser)
  const [status, setStatus] = useState(user ? 'authenticated' : 'login')
  const [isLoading, setIsLoading] = useState(false)
  const isLogin = status === 'login'
  const isRegister = status === 'register'
  const isAuthenticated = status === 'authenticated'
  const setLogin = () => setStatus('login')
  const setRegister = () => setStatus('register')
  const logout = async () => await signOut(auth)
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
        setStatus('authenticated')
      } else {
        setUser(null)
        console.log(user)
        setStatus('login')
        navigate('/')
      }
    })
  }, [navigate, setUser])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        status,
        setStatus,
        isLogin,
        isRegister,
        isAuthenticated,
        setLogin,
        setRegister,
        logout,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(`useAuth used only within AuthProvider`)
  }
  return context
}
