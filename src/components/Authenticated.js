import {Login} from '@mui/icons-material'
import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {SettingsProvider, Settings} from './settings'

export const AuthenticatedApp = () => {
  return (
    <>
      <Routes>
        <Route
          path="/settings"
          element={
            <SettingsProvider>
              <Settings />
            </SettingsProvider>
          }
        />
      </Routes>
    </>
  )
}
