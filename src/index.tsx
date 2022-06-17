import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import {AuthProvider} from './Auth'
import reportWebVitals from './reportWebVitals'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import '@fontsource/poppins'

const container = document.getElementById('root') as HTMLElement
const root = ReactDOMClient.createRoot(container)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
export {Progress} from './Components/Layout/Progress'
export {toastOptions} from './Utils/Layout'
export {styleFlexColumn} from './Utils/Layout'
export {padEl} from './Utils/Layout'
export {mobileBreakpoint} from './Utils/Layout'
export {tabletBreakpoint} from './Utils/Layout'
export {laptopBreakpoint} from './Utils/Layout'
export {desktopBreakpoint} from './Utils/Layout'
export {alertRed} from './Utils/Layout'
export {myBlue} from './Utils/Layout'
export {baseFlex} from './Utils/Layout'
export {maxWidth} from './Utils/Layout'
export {LoginActions} from './Utils/Models/Login/LoginAction.model'
export {AuthProviderModel} from './Utils/Models/Auth/AuthProvider.model'
export {LoginState} from "./Utils/Models/Login/LoginState.model";
export {LoginActionTypes} from "./Utils/Models/Login/LoginActionTypes";
export {UpdatePost} from "./Utils/Models/Feed/UpdatePost.model";
export {UploadPost} from "./Utils/Models/Feed/UploadPost.model";
export {ToggleLike} from "./Utils/Models/Feed/ToggleLike.model";
export {AddComment} from "./Utils/Models/Feed/AddComment.model";
export {RemoveComment} from "./Utils/Models/Feed/RemoveComment.model";
