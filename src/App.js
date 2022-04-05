import {AuthenticatedApp} from './components/Authenticated'
import {useAuth} from './Auth'
import {UnAuthenticatedApp} from './components/UnAuthenticated'
import {Layout} from './components/layout'

function App() {
  const {user} = useAuth()

  return <Layout>{user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}</Layout>
}

export default App
