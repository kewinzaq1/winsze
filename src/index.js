import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {BrowserRouter} from 'react-router-dom'
import {Navbar} from './components/layout/Navbar'
import {AuthProvider} from './Auth'
import './index.css'
import 'normalize.css'
import {Toaster} from 'react-hot-toast'

// If you want to start measuring performance in your app, pass a function
const container = document.getElementById('root')
const root = ReactDOMClient.createRoot(container)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          toastOptions={{
            style: {
              fontFamily: 'Poppins',
            },
          }}
        />
        <Navbar />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
