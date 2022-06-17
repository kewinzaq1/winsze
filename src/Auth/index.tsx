import * as React from 'react'
import {onAuthStateChanged, signOut} from 'firebase/auth'
import {useLocalStorageState} from '../Utils/Hooks'
import {useNavigate} from 'react-router-dom'
import {AuthProps} from '../Utils/Models'
import {AuthProviderModel} from '../Utils/Models/Auth/AuthProvider.model'
import {auth} from "../Firebase";

export const AuthContext = React.createContext<AuthProps | null>(null)

export const AuthProvider = ({initUser, children}: AuthProviderModel) => {
  const [user, setUser] = useLocalStorageState(
    'user',
    auth.currentUser ?? initUser
  )
  const [status, setStatus] = React.useState<string>(
    user ? 'authenticated' : 'login'
  )
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const isLogin = status === 'login'
  const isRegister = status === 'register'
  const isAuthenticated = status === 'authenticated'
  const setLogin = () => setStatus('login')
  const setRegister = () => setStatus('register')
  const logout = async () => await signOut(auth)
  const navigate = useNavigate()

  React.useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
        setStatus('authenticated')
      } else {
        setUser(null)
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
        isRegister,
        isAuthenticated,
        isLogin,
        isLoading,
        setStatus,
        setLogin,
        setRegister,
        logout,
        setIsLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error(`useAuth() used only within AuthProvider`)
  }
  return context
}
