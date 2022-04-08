/* eslint-disable no-unused-vars */
import {jsx, css} from '@emotion/react'
import {blue, red} from '@mui/material/colors'
import {Navbar} from './Navbar'
import {Footer} from './Footer'
import 'normalize.css'
import './index.css'
import {Toaster} from 'react-hot-toast'
import styled from '@emotion/styled'
import {CircularProgress, Skeleton} from '@mui/material'

export const baseFlex = css`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const myBlue = blue[700]
export const alertRed = red[500]
export const desktopBreakpoint = '1200px'
export const laptopBreakpoint = '768px'
export const tabletBreakpoint = '768px'
export const mobileBreakpoint = '600px'

export const Layout = ({children}) => {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            fontFamily: 'Poppins',
          },
        }}
      />
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export const Progress = styled(Skeleton)`
  margin: 0 auto;
  width: 90%;
  height: 300px;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
`
