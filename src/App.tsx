import * as React from 'react'
import {AuthenticatedApp} from './Components/Authenticated'
import {useAuth} from './Auth'
import {UnAuthenticatedApp} from './Components/UnAuthenticated'
import {Layout} from './Components/Layout'

function App() {
  const {user} = useAuth()

  return <Layout>{user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}</Layout>
}

export default App
