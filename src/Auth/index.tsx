import * as React from 'react'
import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth'
import {useLocalStorageState} from '../Utils/Hooks'
import {useNavigate} from 'react-router-dom'
import {AuthProps} from '../Utils/Models'
import {AuthProviderModel} from '../Utils/Models/Auth/AuthProvider.model'

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  databaseURL: 'https://winsze-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'winsze',
  storageBucket: 'winsze.appspot.com',
  messagingSenderId: '564098727958',
  appId: '1:564098727958:web:3951cf9519225ec0043537'
}
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const AuthContext = React.createContext<AuthProps | null>(null)
export const db = getFirestore(app)

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
