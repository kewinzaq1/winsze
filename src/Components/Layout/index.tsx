/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import {Toaster} from 'react-hot-toast'
import {Footer} from './Footer'
import {Navbar} from './Navbar/Navbar'
import 'normalize.css'
import './index.css'
import {toastOptions} from '../../Utils/Layout'

export const Layout = ({children}: {children: React.ReactNode}) => (
  <>
    <Toaster toastOptions={{...toastOptions}} />
    <Navbar />
    {children}
    <Footer />
  </>
)
