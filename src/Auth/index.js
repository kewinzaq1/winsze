import React from 'react'
import {useContext, createContext, useState} from 'react'
import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'
import {getAuth, signOut, onAuthStateChanged} from 'firebase/auth'
import {useEffect} from 'react'
import {useLocalStorageState} from '../Utils/hooks'
const firebaseConfig = {
  apiKey: 'AIzaSyDgPawN4QvQwjjIp5x_D_ktEY1hxzwLsKU',
  authDomain: 'winsze.firebaseapp.com',
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

export const AuthProvider = ({children}) => {
  const [user, setUser] = useLocalStorageState('user')
  const [status, setStatus] = useState(user ? 'authenticated' : 'login')
  const [isLoading, setIsLoading] = useState(false)
  const isLogin = status === 'login'
  const isRegister = status === 'register'
  const isAuthenticated = status === 'authenticated'
  const setLogin = () => setStatus('login')
  const setRegister = () => setStatus('register')
  const logout = async () => signOut(auth)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
        setStatus('authenticated')
      } else {
        setUser(null)
        setStatus('login')
      }
    })
  }, [setUser])

  console.log('user', user)

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
