import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {Feed} from './Feed'
import {Friends} from './Friends'
import {SettingsProvider, Settings} from './Settings'

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
      <Route path="/friends" element={<Friends />}></Route>
    </Routes>
  )
}
