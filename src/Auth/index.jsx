import React from 'react'
import {useContext, createContext, useState} from 'react'
import {initializeApp} from 'firebase/app'
import {getAuth, signOut, onAuthStateChanged} from 'firebase/auth'
import {useEffect} from 'react'

const firebaseConfig = {
  apiKey: 'AIzaSyDgPawN4QvQwjjIp5x_D_ktEY1hxzwLsKU',
  authDomain: 'winsze.firebaseapp.com',
  databaseURL: 'https://winsze-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'winsze',
  storageBucket: 'winsze.appspot.com',
  messagingSenderId: '564098727958',
  appId: '1:564098727958:web:3951cf9519225ec0043537',
}
const userLocalKey = 'FANCY_LOCAL_KEY'
const getLocalUser = window.localStorage.getItem(userLocalKey)
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(
    getLocalUser !== 'undefined' ? JSON.parse(getLocalUser) : null,
  )
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
  }, [])

  useEffect(() => {
    window.localStorage.setItem(userLocalKey, JSON.stringify(user))
  }, [user])

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

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(`useAuth used only within AuthProvider`)
  }
  return context
}

export {AuthProvider, useAuth, app, auth}
