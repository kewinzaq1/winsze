import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import {AuthProvider} from './Auth'
import reportWebVitals from './reportWebVitals'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import '@fontsource/poppins'

const container = document.getElementById('root')
const root = ReactDOMClient.createRoot(container)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
