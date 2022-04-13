import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {Feed} from './Feed'
import {SettingsProvider, Settings} from './Settings'
import {Friends} from './Users'
import {SingleUser} from './Users/SingleUser'

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
      <Route path="/users/:id" element={<SingleUser />}></Route>
    </Routes>
  )
}
