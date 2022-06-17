import * as React from 'react'
import {Route, Routes} from 'react-router-dom'
import {Feed} from './Feed'
import {Settings} from './Settings/Settings'
import {Friends} from './Users'
import {Progress} from './Layout/Progress'
const SingleUser = React.lazy(() => import('./Users/SingleUser'))

export const AuthenticatedApp = () => (
  <Routes>
    <Route path="/settings" element={<Settings />} />
    <Route path="/" element={<Feed />} />
    <Route path="/users" element={<Friends />} />
    <Route
      path="/users/:id"
      element={
        <React.Suspense fallback={<Progress />}>
          <SingleUser />
        </React.Suspense>
      }
    />
  </Routes>
)
