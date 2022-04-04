import 'normalize.css'
import {Route, Routes} from 'react-router-dom'
import {AuthenticatedApp} from './components/Authenticated'
import {useAuth} from './Auth'
import {Login} from './components/login/Login'
import {Settings} from './components/settings/Settings'
import {SettingsProvider} from './components/settings'
function App() {
  const {user} = useAuth()

  return (
    <Routes>
      <Route path="/" element={user ? <AuthenticatedApp /> : <Login />}></Route>
      <Route
        path="/settings"
        element={
          user ? (
            <SettingsProvider>
              <Settings />
            </SettingsProvider>
          ) : (
            <Login />
          )
        }
      ></Route>
    </Routes>
  )
}

export default App
