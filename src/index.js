import React from 'react'
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

ReactDOM.render(
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
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
