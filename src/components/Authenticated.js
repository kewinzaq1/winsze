import React from 'react'
import {lazy} from 'react'
import {Suspense} from 'react'
import {Route, Routes} from 'react-router-dom'
import {Feed} from './Feed'
import {Progress} from './Layout'
import {SettingsProvider, Settings} from './Settings'
import {Friends} from './Users'
const SingleUser = lazy(() => import('./Users/SingleUser'))

export const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route
        path="/settings"
        element={
          <SettingsProvider>
            <Settings />
          </SettingsProvider>
        }
      />
      <Route path="/" element={<Feed />}></Route>
      <Route path="/users" element={<Friends />}></Route>
      <Route
        path="/users/:id"
        element={
          <Suspense fallback={<Progress />}>
            <SingleUser />
          </Suspense>
        }
      ></Route>
    </Routes>
  )
}
