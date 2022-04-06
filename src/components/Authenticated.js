import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {Feed} from './Feed'
import {SettingsProvider, Settings} from './settings'

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
    </Routes>
  )
}
